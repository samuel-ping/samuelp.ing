// Adapted from https://dev.to/alexandprivate/build-your-own-react-tooltip-component-25bd
import React, { useState } from 'react';

// import {
//   useFloating,
//   offset,
// } from '@floating-ui/react-dom';

// import {useHover} from '@floating-ui/react-dom-interactions'

import {
  useFloating,
  offset,
  useHover
} from '@floating-ui/react';

const Tooltip = React.forwardRef(({ children, text }, ref) => {
  const [showingTooltip, setShowingTooltip] = useState(false);

  const { x, y, reference, floating, strategy, context } = useFloating({
    open: showingTooltip,
    onOpenChange: setShowingTooltip,
    placement: "top",
    middleware: [offset(5)]
  });

  useHover(context);

  // console.log("x: ", x, "y: ", y)
  console.log(context)
  ref = reference;

  return (
    <div
      className="relative flex items-center justify-center"
      // onMouseEnter={() => setShowingTooltip(true)}
      // onMouseLeave={() => setShowingTooltip(false)}
      // ref={floating}
    >
      <div
        className={`absolute ${`top-${y}`} ${`left-${x}`} px-3 py-1.5 rounded whitespace-nowrap bg-green-500 text-green-50 font-sans text-sm font-normal transition-all duration-150 ${
          showingTooltip
            ? 'opacity-100 visible scale-100'
            : 'opacity-0 invisible scale-0'
        }`}
        ref={floating}
      >
        {text}
      </div>
      {children}
    </div>
  );
})

export default Tooltip;