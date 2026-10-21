'use client';

import { useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';

import { MoonIcon, SunIcon } from '@/components/icons';

const emptySubscribe = () => () => {};

export const ThemeToggle = () => {
  // Hydration guard: false on the server and first client render, true after.
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const { theme, setTheme } = useTheme();

  if (!mounted) {
    return null;
  }

  const isLight = theme === 'light';
  const nextTheme = isLight ? 'dark' : 'light';

  return (
    <button
      type="button"
      aria-label={`Switch to ${nextTheme} theme`}
      // The icon is small, so the `before` pseudo-element pads the hit area out
      // to 44x44 without shifting the icon's position in the nav.
      //
      // The hover colour comes from the shared `hover-tint` rather than its own
      // per-theme `hover:text-*`: it sits in the nav next to links that use the
      // utility, and spelling the dark value out here is how it drifted to the
      // washed-out green-50. `transition-[transform,color]` because the toggle
      // lifts as well as tints, unlike the plain nav links.
      className="relative flex items-center hover-tint transition-[transform,color] before:absolute before:-inset-3 before:content-[''] hover:-translate-y-1"
      onClick={() => {
        setTheme(nextTheme);
        if (window.umami) window.umami.track(`theme toggled to ${nextTheme}`);
      }}
    >
      {isLight ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};
