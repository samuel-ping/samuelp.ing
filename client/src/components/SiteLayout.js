import Head from 'next/head';

import Navbar from '@components/Navbar';
import NavbarButtons from '@config/NavbarButtons.config';
import Footer from '@components/Footer';

export default function Layout({ children, title }) {
  return (
    <>
      <Head>
        <title>
          Samuel Ping
          {title}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col min-h-screen items-center justify-between bg-green-50">
        <Navbar navbarButtons={NavbarButtons} />

        <div>{children}</div>

        <Footer />
      </div>
    </>
  );
}
