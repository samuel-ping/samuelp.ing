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

  if (theme === 'light') {
    return (
      <div
        className="flex items-center transition-transform hover:-translate-y-1 hover:text-green-400"
        role="button"
        onClick={() => {
          setTheme('dark');
          if (window.umami) window.umami.track('theme toggled to dark');
        }}
      >
        <SunIcon />
      </div>
    );
  } else {
    return (
      <div
        className="flex items-center transition-transform hover:-translate-y-1 hover:text-green-50"
        role="button"
        onClick={() => {
          setTheme('light');
          if (window.umami) window.umami.track('theme toggled to light');
        }}
      >
        <MoonIcon />
      </div>
    );
  }
};
