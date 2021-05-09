import Head from 'next/head';
import Link from 'next/link';

import Navbar from './Navbar';

export default function Layout({ children, title }) {
  return (
    <>
      <Head>
        <title>Samuel Ping{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col h-screen items-center bg-green-50">
        <Navbar />

        <div>{children}</div>

        <Link href="/">
          <footer className="cursor-pointer">Return to home</footer>
        </Link>
      </div>
    </>
  );
}
