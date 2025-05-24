'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

import { MoonIcon, SunIcon } from '@/components/icons';

export const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (theme === 'light') {
    return (
      <div
        className="flex items-center hover:text-green-300 transition-transform hover:-translate-y-1"
        role="button"
        onClick={() => setTheme('dark')}
      >
        <SunIcon />
      </div>
    );
  } else {
    return (
      <div
        className="flex items-center hover:text-green-50 transition-transform hover:-translate-y-1"
        role="button"
        onClick={() => setTheme('light')}
      >
        <MoonIcon />
      </div>
    );
  }
};
