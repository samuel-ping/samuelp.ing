// Adapted from https://dev.to/alexandprivate/build-your-own-react-tooltip-component-25bd
import React, { useState } from 'react';

export default function Tooltip({ children, text }) {
  const [showingTooltip, setShowingTooltip] = useState(false);
  const tooltipRef = React.createRef(null);

  return (
    <div
      id="tooltip"
      className="relative flex items-center justify-center"
      onMouseEnter={() => setShowingTooltip(true)}
      onMouseLeave={() => setShowingTooltip(false)}
    >
      <div
        className={`absolute px-3 py-1.5 rounded whitespace-nowrap bg-green-500 text-green-50 font-sans text-sm font-normal transition-all duration-150 ${
          showingTooltip
            ? 'bottom-9 opacity-100 visible scale-100'
            : 'opacity-0 invisible scale-0 bottom-3.5'
        }`}
        ref={tooltipRef}
      >
        {text}
      </div>
      {children}
    </div>
  );
}
