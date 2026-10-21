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
      className={`relative flex items-center transition-transform before:absolute before:-inset-3 before:content-[''] hover:-translate-y-1 ${
        isLight ? 'hover:text-green-400' : 'hover:text-green-50'
      }`}
      onClick={() => {
        setTheme(nextTheme);
        if (window.umami) window.umami.track(`theme toggled to ${nextTheme}`);
      }}
    >
      {isLight ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};
