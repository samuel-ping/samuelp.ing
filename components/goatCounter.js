'use client';

import { useEffect } from 'react';

import Script from 'next/script';
import { usePathname } from 'next/navigation';

const GoatCounter = () => {
  let path = usePathname();

  useEffect(() => {
    if (window.goatcounter === undefined) return;

    window.goatcounter.count({ path });
  }, [path]);

  return (
    <Script
      data-goatcounter="https://stats.samuelp.ing/count"
      async={true}
      src="//gc.zgo.at/count.js"
    />
  );
};

export default GoatCounter;
