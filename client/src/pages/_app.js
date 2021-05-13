import React, { useEffect } from 'react';
import App from 'next/app';
import { useRouter } from 'next/router';

import { init } from '@socialgouv/matomo-next';

import SiteLayout from '@components/SiteLayout';
import { MATOMO_URL, MATOMO_SITE_ID } from '@lib/matomo';

import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    init({ url: MATOMO_URL, siteId: MATOMO_SITE_ID });
  }, []);

  /**
   * Formats a pathname to be shown in head title.
   * @param {String} aRoute
   * @returns String
   */
  const normalizeRoute = (aRoute) => {
    return (
      (aRoute === '/' ? '' : ' | ') +
      aRoute.charAt(1).toLocaleUpperCase() +
      aRoute.substring(1).slice(1)
    );
  };

  return (
    <>
      <SiteLayout title={normalizeRoute(router.pathname)}>
        <Component {...pageProps} />
      </SiteLayout>
    </>
  );
}

export default MyApp;
