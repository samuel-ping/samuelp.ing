import Head from 'next/head';

import Navbar from './Navbar';
import NavbarButtons from '../config/NavbarButtons.config';
import Footer from './Footer';

export default function Layout({ children, title }) {
  return (
    <>
      <Head>
        <title>Samuel Ping{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col h-screen items-center justify-between bg-green-50">
        <Navbar navbarButtons={NavbarButtons} />

        <div>{children}</div>

        <Footer />
      </div>
    </>
  );
}
