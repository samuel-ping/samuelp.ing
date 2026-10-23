'use client';

import { Component } from 'react';

class GlobeErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-80 w-full items-center justify-center rounded-xl bg-green-800 px-6 text-center text-sm text-beige-200/80 shadow-card ring-1 ring-green-700/60 sm:h-105 lg:h-120 dark:bg-green-700 dark:shadow-none dark:ring-green-600/60">
          Map unavailable.
        </div>
      );
    }

    return this.props.children;
  }
}

export default GlobeErrorBoundary;
