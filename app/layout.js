import Navbar from '@components/navbar';
import Footer from '@components/footer';

import NavbarButtons from '@config/navbarButtons.config';

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
      <body className="max-w-screen-lg flex flex-col space-y-12 px-5 py-12 m-auto bg-green-100">
        <Navbar navbarButtons={NavbarButtons} />
        <main className="flex flex-col space-y-14">{children}</main>
        <Footer navbarButtons={NavbarButtons} />
      </body>
    </html>
  );
}
