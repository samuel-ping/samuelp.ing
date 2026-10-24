import fs from 'node:fs/promises';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

import { chromium } from 'playwright';
import sharp from 'sharp';

import { MAP_CONFIG } from '../config/mapConfig.mjs';
import { MAP_PALETTE } from '../config/mapPalette.mjs';
import { createMapStyle } from '../utils/mapStyle.mjs';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const MIME_TYPES = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.mjs', 'text/javascript; charset=utf-8'],
  ['.png', 'image/png'],
]);

function contentType(filePath) {
  return MIME_TYPES.get(path.extname(filePath)) ?? 'application/octet-stream';
}

async function copyRendererAssets(directory) {
  const maplibreDirectory = path.dirname(
    require.resolve('maplibre-gl/package.json'),
  );
  const distDirectory = path.join(maplibreDirectory, 'dist');
  const targetDirectory = path.join(directory, 'maplibre');

  await fs.mkdir(targetDirectory, { recursive: true });

  await Promise.all([
    fs.copyFile(
      path.join(distDirectory, 'maplibre-gl.mjs'),
      path.join(targetDirectory, 'maplibre-gl.mjs'),
    ),
    fs.copyFile(
      path.join(distDirectory, 'maplibre-gl-worker.mjs'),
      path.join(targetDirectory, 'maplibre-gl-worker.mjs'),
    ),
    fs.copyFile(
      path.join(distDirectory, 'maplibre-gl.css'),
      path.join(targetDirectory, 'maplibre-gl.css'),
    ),
    fs.copyFile(
      path.join(__dirname, 'map-render-entry.js'),
      path.join(directory, 'map-render-entry.js'),
    ),
  ]);
}

function renderHtml(data) {
  const serializedData = JSON.stringify(data).replaceAll('<', '\\u003c');
  const background = data.backgroundColor;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="/maplibre/maplibre-gl.css" />
    <style>
      html,
      body {
        margin: 0;
        padding: 0;
        background: ${background};
      }
      #map {
        width: ${MAP_CONFIG.dimensions.displayWidth}px;
        height: ${MAP_CONFIG.dimensions.displayHeight}px;
        overflow: hidden;
      }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script>window.__MAP_RENDER_DATA__ = ${serializedData};</script>
    <script type="module">
      try {
        const maplibre = await import('/maplibre/maplibre-gl.mjs');
        window.maplibregl = maplibre.default ?? maplibre;
        await import('/map-render-entry.js');
      } catch (error) {
        window.__MAP_RENDER_ERROR__ = String(error?.stack ?? error);
      }
    </script>
  </body>
</html>`;
}

async function startStaticServer(directory) {
  const server = http.createServer(async (request, response) => {
    try {
      const requestUrl = new URL(request.url ?? '/', 'http://127.0.0.1');
      const pathname = decodeURIComponent(requestUrl.pathname);
      const relativePath = pathname === '/' ? 'index.html' : `.${pathname}`;
      const filePath = path.resolve(directory, relativePath);

      if (!filePath.startsWith(`${directory}${path.sep}`)) {
        response.writeHead(403);
        response.end('Forbidden');
        return;
      }

      const contents = await fs.readFile(filePath);
      response.writeHead(200, { 'Content-Type': contentType(filePath) });
      response.end(contents);
    } catch {
      response.writeHead(404);
      response.end('Not found');
    }
  });

  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });

  return server;
}

async function closeServer(server) {
  if (!server) {
    return;
  }

  await new Promise((resolve) => {
    server.close(() => resolve());
  });
}

export async function renderStaticMap({
  route,
  bounds,
  theme,
  timeoutMs = MAP_CONFIG.renderTimeoutMs,
}) {
  if (!route || !bounds) {
    throw new Error('A route and bounds are required to render a map.');
  }

  const directory = await fs.mkdtemp(
    path.join(os.tmpdir(), 'samuelp-last-run-map-'),
  );
  let server;
  let browser;

  try {
    await copyRendererAssets(directory);
    await fs.writeFile(
      path.join(directory, 'index.html'),
      renderHtml({
        style: createMapStyle({ theme, labels: false, route }),
        bounds,
        padding: MAP_CONFIG.fitPadding,
        maxZoom: MAP_CONFIG.maxFitZoom,
        backgroundColor: MAP_PALETTE[theme].background,
      }),
    );

    server = await startStaticServer(directory);
    const address = server.address();
    if (!address || typeof address === 'string') {
      throw new Error('Could not determine the render server port.');
    }

    browser = await chromium.launch({
      headless: true,
      args: [
        '--enable-unsafe-swiftshader',
        '--use-angle=swiftshader',
        '--ignore-gpu-blocklist',
        '--enable-webgl',
        '--disable-dev-shm-usage',
      ],
    });

    const context = await browser.newContext({
      viewport: {
        width: MAP_CONFIG.dimensions.displayWidth,
        height: MAP_CONFIG.dimensions.displayHeight,
      },
      deviceScaleFactor: MAP_CONFIG.dimensions.pixelRatio,
    });
    const page = await context.newPage();
    page.setDefaultTimeout(timeoutMs);

    let pageError = null;
    page.on('pageerror', (error) => {
      pageError = error;
    });

    await page.goto(`http://127.0.0.1:${address.port}/`, {
      waitUntil: 'load',
      timeout: timeoutMs,
    });

    await page.waitForFunction(
      () =>
        window.__MAP_RENDER_READY__ === true ||
        typeof window.__MAP_RENDER_ERROR__ === 'string',
      undefined,
      { timeout: timeoutMs },
    );

    const renderError = await page.evaluate(
      () => window.__MAP_RENDER_ERROR__ ?? null,
    );
    if (renderError) {
      throw new Error(`Map render failed: ${renderError}`);
    }
    if (pageError) {
      throw pageError;
    }

    await page.waitForTimeout(120);

    const screenshot = await page.locator('#map').screenshot({ type: 'png' });
    const webp = await sharp(screenshot)
      .webp({ quality: 82, effort: 6 })
      .toBuffer();
    const metadata = await sharp(webp).metadata();

    if (
      metadata.width !== MAP_CONFIG.dimensions.width ||
      metadata.height !== MAP_CONFIG.dimensions.height
    ) {
      throw new Error(
        `Rendered image is ${metadata.width}x${metadata.height}, expected ` +
          `${MAP_CONFIG.dimensions.width}x${MAP_CONFIG.dimensions.height}.`,
      );
    }

    return webp;
  } finally {
    await browser?.close().catch(() => {});
    await closeServer(server);
    await fs.rm(directory, { recursive: true, force: true });
  }
}

export async function renderMapPair({ route, bounds, timeoutMs }) {
  return {
    light: await renderStaticMap({
      route,
      bounds,
      theme: 'light',
      timeoutMs,
    }),
    dark: await renderStaticMap({
      route,
      bounds,
      theme: 'dark',
      timeoutMs,
    }),
  };
}
