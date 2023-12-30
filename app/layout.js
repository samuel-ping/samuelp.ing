import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

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
    <html lang="en">
      <body className="min-h-screen max-w-screen-lg flex flex-col gap-y-32 px-5 py-12 mx-auto bg-green-50">
        <Navbar navbarButtons={NavbarButtons} />
        <main className="flex flex-col flex-grow gap-y-14">{children}</main>
        <Footer navbarButtons={NavbarButtons} />
      </body>
    </html>
  );
}
