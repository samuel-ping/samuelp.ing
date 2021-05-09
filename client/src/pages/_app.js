import Head from 'next/head';

import SiteLayout from '../components/SiteLayout';

import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <SiteLayout>
        <Component {...pageProps} />
      </SiteLayout>
    </>
  );
}

export default MyApp;
