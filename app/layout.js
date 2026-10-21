import { Karla, Newsreader } from 'next/font/google';

import GoatCounter from '@/components/goatCounter';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import ThemeProvider from '@/components/themeProvider';
import Umami from '@/components/umami';

import NavbarButtons from '@/config/navbarButtons.config';

import './styles/globals.css';

const karla = Karla({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-karla',
});

// Display face for headings. `opsz` is the optical-size axis — it sharpens the
// serif at hero sizes and keeps it readable at section-heading sizes.
const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  variable: '--font-newsreader',
});

export const metadata = {
  title: {
    default: 'Samuel Ping',
    template: '%s | Sam Ping',
  },
  description: "Samuel Ping's personal portfolio website",
  applicationName: 'Samuel Ping',
  authors: [{ name: 'Samuel Ping' }],
  creator: 'Samuel Ping',
  metadataBase: new URL('https://samuelp.ing'),
  openGraph: {
    title: 'Samuel Ping',
    description: "Samuel Ping's personal portfolio website",
    url: 'https://samuelp.ing',
    siteName: 'Samuel Ping',
    locale: 'en-US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/icons/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    // Must enable suppressHydrationWarning to use next-themes.
    <html
      lang="en"
      className={`${karla.variable} ${newsreader.variable}`}
      suppressHydrationWarning
    >
      {/* The page canvas (background colour, grain and vignette) lives in
          globals.css on `body`, so it has a single source of truth. */}
      <body className="text-black transition-colors dark:text-beige-200">
        {/* Need this div so clicking outside navbar popover on small screens will close it. See: https://github.com/tailwindlabs/headlessui/issues/2752#issuecomment-1724096430 */}
        <div className="flex min-h-screen flex-col gap-y-8 md:gap-y-12">
          <ThemeProvider>
            <Navbar navbarButtons={NavbarButtons} />
            {/* `gutter-x` (globals.css) is the site-wide side gutter. Every page inherits it here, so pages should not add their own horizontal margins.
                The single max-width lives here too, so every page shares one content column and the same left edge. items-start (not items-center) keeps short pages near the top instead of floating in dead space. */}
            <main className="flex w-full flex-1 items-start justify-center gutter-x pt-4 md:pt-8">
              {/* `self-stretch` lets the column fill <main>, which is inert for
                  every page whose content is taller than the viewport (that is
                  all of them but the home page) and gives a page that wants to
                  centre itself a definite height to centre within. */}
              <div className="w-full max-w-5xl self-stretch">{children}</div>
            </main>
            <Footer />
          </ThemeProvider>
          <GoatCounter />
          <Umami />
        </div>
      </body>
    </html>
  );
}
