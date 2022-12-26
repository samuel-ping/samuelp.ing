// const Tooltip = ({ children, text }) => {
//     return (<span className="group relative">
//       {/* <span className="pointer-events-none absolute -top-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-green-500 px-2 py-1 text-green-50 opacity-0 transition before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-black before:content-[''] group-hover:opacity-100"> */}
//       <span className="pointer-events-none absolute -top-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-green-500 px-2 py-1 text-green-50 opacity-0 transition group-hover:opacity-100">
//       {/* <span className="pointer-events-none absolute -top-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-green-500 px-2 py-1 text-green-50 opacity-0 transition group-hover:opacity-100"> */}
//         {text}
//       </span>
//       {children}
//     </span>)
// }

// export default Tooltip;

// Adapted from https://dev.to/alexandprivate/build-your-own-react-tooltip-component-25bd
import React, { useState } from 'react';

export default function Tooltip({ children, text }) {
  const [showingTooltip, setShowingTooltip] = useState(false);
  const tooltipRef = React.createRef(null);

  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setShowingTooltip(true)}
      onMouseLeave={() => setShowingTooltip(false)}
    >
      <div
        className={`absolute whitespace-nowrap bg-green-500 text-green-50 px-2 py-1 rounded transition-all duration-200 ${
          showingTooltip
            ? 'bottom-10 opacity-100 visible scale-100'
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
