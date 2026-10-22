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
