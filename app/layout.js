import Navbar from '@components/navbar';
import Footer from '@components/Footer';

import NavbarButtons from '@config/NavbarButtons.config';

import './styles/globals.css';

export const metadata = {
  title: {
    default: 'Samuel Ping',
    template: '%s | Sam Ping',
  },
  description: 'Welcome to Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="max-w-screen-lg px-5 py-8 m-auto bg-green-100">
        <Navbar navbarButtons={NavbarButtons} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
