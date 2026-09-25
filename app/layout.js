import { Karla } from 'next/font/google';

import GoatCounter from '@/components/layout/goatCounter';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import ThemeProvider from '@/components/layout/themeProvider';
import Umami from '@/components/layout/umami';

import NavbarButtons from '@/config/navbarButtons.config';

import './styles/globals.css';

const karla = Karla({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-karla',
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
    <html lang="en" className={karla.variable} suppressHydrationWarning>
      <body className="bg-beige-100 text-black transition-colors dark:bg-green-700 dark:text-beige-200">
        {/* Need this div so clicking outside navbar popover on small screens will close it. See: https://github.com/tailwindlabs/headlessui/issues/2752#issuecomment-1724096430 */}
        <div className="flex min-h-screen flex-col gap-y-10 md:gap-y-18">
          <ThemeProvider>
            <Navbar navbarButtons={NavbarButtons} />
            <main className="flex w-full justify-center">{children}</main>
            <Footer navbarButtons={NavbarButtons} />
          </ThemeProvider>
          <GoatCounter />
          <Umami />
        </div>
      </body>
    </html>
  );
}
