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
    // Must enable suppressHydrationWarning at this time to use next-themes.
    // See: https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app
    // and: https://github.com/pacocoursey/next-themes/issues/152
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen max-w-screen-lg flex flex-col gap-y-32 px-5 lg:px-0 py-12 mx-auto transition-colors bg-beige-100 dark:bg-green-600 text-black dark:text-beige-200">
        <ThemeProvider>
          <Navbar navbarButtons={NavbarButtons} />
          <main className="flex flex-col flex-grow gap-y-14">{children}</main>
          <Footer navbarButtons={NavbarButtons} />
        </ThemeProvider>
        <GoatCounter />
      </body>
    </html>
  );
}
