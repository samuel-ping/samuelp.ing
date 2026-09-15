import fs from 'fs';
import path from 'path';

import { bundleMDX } from 'mdx-bundler';
import { imageSizeFromFile } from 'image-size/fromFile';
import remarkGfm from 'remark-gfm';

import { DateSorter, FormatDateStr, FoundDateSorter } from '@/utils/dateUtils';
import imageMetadata from '@/utils/imageUtils';

const PATH = 'content';
const PROJECTS = 'projects';
const SPOTTED = 'spotted';

/**
 * Returns the FrontMatter for the projects. If n is specified, returns the n most recent projects.
 * @param {*} n Number of projects to return
 * @returns
 */
export async function GetProjectDetails(n) {
  const projectsDirectory = path.join(process.cwd(), PATH, PROJECTS);
  const filenames = fs.readdirSync(projectsDirectory);

  const projectDetails = filenames.map(async (filename) => {
    const filePath = path.join(projectsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');

    const { frontmatter } = await bundleMDX({ source: fileContents });

    return {
      details: {
        ...frontmatter,
        slug: filename.split('.mdx')[0],
        dates: FormatDateStr(frontmatter.start, frontmatter.end),
      },
    };
  });

  const unsortedProjects = await Promise.all(projectDetails);
  const sortedProjects = unsortedProjects.sort(DateSorter);

  return {
    props: {
      projects: n === undefined ? sortedProjects : sortedProjects.slice(0, n),
    },
  };
}

export async function GetProject(slug) {
  const projectFilePath = path.join(process.cwd(), PATH, `${slug}.mdx`);
  const projectFileContents = fs.readFileSync(projectFilePath, 'utf8');

  const { code, frontmatter } = await bundleMDX({
    source: projectFileContents,
    mdxOptions: (options) => {
      // Configure the custom image metadata rehype plugin.
      options.rehypePlugins = [...(options.rehypePlugins ?? []), imageMetadata];
      options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkGfm];

      return options;
    },
    esbuildOptions: (options) => {
      options.loader = {
        ...options.loader,
        '.svg': 'dataurl',
      };

      return options;
    },
  });

  return {
    code,
    details: {
      ...frontmatter,
      dates: FormatDateStr(frontmatter.start, frontmatter.end),
    },
  };
}

/**
 * Returns the code and details (frontmatter, slug, and intrinsic dimensions of the cutout)
 * for each spotted item, sorted newest-first.
 * @returns
 */
export async function GetSpottedItems() {
  const spottedDirectory = path.join(process.cwd(), PATH, SPOTTED);
  const filenames = fs.readdirSync(spottedDirectory);

  const spottedItems = filenames.map(async (filename) => {
    const filePath = path.join(spottedDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');

    const { code, frontmatter } = await bundleMDX({
      source: fileContents,
      mdxOptions: (options) => {
        // Configure the custom image metadata rehype plugin.
        options.rehypePlugins = [
          ...(options.rehypePlugins ?? []),
          imageMetadata,
        ];
        options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkGfm];

        return options;
      },
      esbuildOptions: (options) => {
        options.loader = {
          ...options.loader,
          '.svg': 'dataurl',
        };

        return options;
      },
    });

    const { width, height } = await imageSizeFromFile(
      path.join(process.cwd(), 'public', frontmatter.image),
    );

    return {
      code,
      details: {
        ...frontmatter,
        slug: filename.split('.mdx')[0],
        width,
        height,
      },
    };
  });

  const unsortedItems = await Promise.all(spottedItems);
  const sortedItems = unsortedItems.sort(FoundDateSorter);

  return sortedItems;
}

export async function GetAboutMDX() {
  const aboutFilePath = path.join(process.cwd(), PATH, 'about.mdx');
  const aboutFileContents = fs.readFileSync(aboutFilePath, 'utf8');

  const { code } = await bundleMDX({
    source: aboutFileContents,
  });

  return { code };
}
