import React from 'react';
import { useRouter } from 'next/router';

import SiteLayout from '@components/SiteLayout';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  /**
   * Formats a pathname to be shown in head title.
   * @param {String} aRoute
   * @returns String
   */
  const normalizeRoute = (aRoute) =>
    (aRoute === '/' ? '' : ' | ') +
    aRoute.charAt(1).toLocaleUpperCase() +
    aRoute.substring(1).slice(1);

  return (
    <>
      <SiteLayout title={normalizeRoute(router.pathname)}>
        <Component {...pageProps} />
      </SiteLayout>
    </>
  );
}

export default MyApp;
