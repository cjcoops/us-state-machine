import React from 'react';

export function Map({ children }) {
  return (
    <div className="map">
      <svg xmlns="http://www.w3.org/2000/svg" width="70%" viewBox="0 0 959 593">
        <defs></defs>
        <g className="states">{children}</g>
        <path
          id="frames"
          fill="none"
          stroke="#A9A9A9"
          strokeWidth="2"
          d="M215 493v55l36 45M0 425h147l68 68h85l54 54v46"
        />
      </svg>
    </div>
  );
}

export default Map;
