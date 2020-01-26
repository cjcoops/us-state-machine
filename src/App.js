import React, { useState } from 'react';
import './App.css';
import State from './State';
import STATE_SVG_PATHS from './state-svg-paths.js';

function App() {
  const [hoveredState, setHoveredState] = useState();

  const states = Object.keys(STATE_SVG_PATHS).map((state, index) => (
    <State
      key={state}
      path={STATE_SVG_PATHS[state]}
      state={state}
      onHover={() => setHoveredState(state)}
      fillIndex={index % 5}
    />
  ));

  states.push(
    states.splice(
      states.indexOf(state => state === hoveredState),
      1
    )[0]
  );

  return (
    <div className="map">
      <svg xmlns="http://www.w3.org/2000/svg" width="959" height="593">
        <defs></defs>
        <g className="state">{states}</g>
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

export default App;
