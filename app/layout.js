import { Karla, Newsreader } from 'next/font/google';

import GoatCounter from '@/components/analytics/goatCounter';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import ThemeProvider from '@/components/layout/themeProvider';
import Umami from '@/components/analytics/umami';

import NavbarButtons from '@/config/navbarButtons.config';

import './styles/globals.css';

const karla = Karla({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-karla',
});

// `opsz` is the optical-size axis, it sharpens the serif at hero sizes and keeps it readable at section-heading sizes.
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
      <body className="text-black transition-colors dark:text-beige-200">
        {/* Need this div so clicking outside navbar popover on small screens will close it. See: https://github.com/tailwindlabs/headlessui/issues/2752#issuecomment-1724096430 */}
        <div className="flex min-h-screen flex-col gap-y-8 md:gap-y-12">
          <ThemeProvider>
            <Navbar navbarButtons={NavbarButtons} />
            <main className="flex w-full flex-1 items-start justify-center gutter-x pt-4 md:pt-8">
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
