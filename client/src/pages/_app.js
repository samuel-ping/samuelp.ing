import Head from 'next/head';
import { useRouter } from 'next/router';

import SiteLayout from '../components/SiteLayout';

import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const capitalizeRoute = (aRoute) => {
    return aRoute.charAt(1).toLocaleUpperCase() + aRoute.substring(1).slice(1);
  };

  return (
    <>
      {/* Substring removes the forward slash from pathname */}
      <SiteLayout title={capitalizeRoute(router.pathname)}>
        <Component {...pageProps} />
      </SiteLayout>
    </>
  );
}

export default MyApp;
