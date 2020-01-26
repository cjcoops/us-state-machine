import React, { useState } from 'react';
import './App.css';
import State from './State';
import Map from './Map';
import STATE_SVG_PATHS from './state-svg-paths.js';

function App() {
  // const [hoveredState, setHoveredState] = useState();

  const getRandomState = () => {
    const states = Object.values(STATE_SVG_PATHS).map(state => state.name);
    return states[Math.floor(Math.random() * states.length)];
  };

  const [stateToGuess, setStateToGuess] = useState(getRandomState());

  const mapStates = Object.keys(STATE_SVG_PATHS).map((stateCode, index) => {
    const state = STATE_SVG_PATHS[stateCode];
    return (
      <State
        key={stateCode}
        path={state.path}
        stateCode={stateCode}
        // onClick={() => setHoveredState(state)}
        fillIndex={state.fillIndex}
      />
    );
  });

  return (
    <div>
      <div>Where is {stateToGuess}?</div>
      <Map>{mapStates}</Map>;
    </div>
  );
}

export default App;
