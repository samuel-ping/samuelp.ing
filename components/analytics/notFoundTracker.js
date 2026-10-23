'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Umami's script loads after hydration, so `window.umami` is often undefined on
// the first paint. Poll briefly for it instead of dropping the event.
const MAX_ATTEMPTS = 20;
const RETRY_MS = 250;

const NotFoundTracker = () => {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    let attempts = 0;

    const track = () => {
      if (cancelled) return;
      if (window.umami?.track) {
        window.umami.track('404', { path: pathname });
        return;
      }
      if (attempts++ < MAX_ATTEMPTS) setTimeout(track, RETRY_MS);
    };

    track();
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return null;
};

export default NotFoundTracker;
