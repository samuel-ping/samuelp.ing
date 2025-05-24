import GoatCounter from '@/components/goatCounter';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import ThemeProvider from '@/components/themeProvider';

import NavbarButtons from '@/config/navbarButtons.config';

import './styles/globals.css';

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
    <html lang="en" suppressHydrationWarning>
      <body className="transition-colors bg-beige-100 dark:bg-green-600 text-black dark:text-beige-200">
        {/* Need this div so clicking outside navbar popover on small screens will close it. See: https://github.com/tailwindlabs/headlessui/issues/2752#issuecomment-1724096430 */}
        <div className="min-h-screen flex flex-col gap-y-10 md:gap-y-18">
          <ThemeProvider>
            <Navbar navbarButtons={NavbarButtons} />
            <main className="flex w-full justify-center">{children}</main>
            <Footer navbarButtons={NavbarButtons} />
          </ThemeProvider>
          <GoatCounter />
        </div>
      </body>
    </html>
  );
}
