'use client';

import { useEffect } from 'react';

/**
 * Adds a class to <body> for as long as the component is mounted. Used for
 * per-page theme overrides, e.g. the /spotted street's off-white theme.
 */
const BodyClassName = ({ className }) => {
  useEffect(() => {
    document.body.classList.add(className);
    return () => document.body.classList.remove(className);
  }, [className]);

  return null;
};

export default BodyClassName;
