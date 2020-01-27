import React, { useState } from 'react';
import './App.css';
import State from './State';
import Map from './Map';
import STATE_SVG_PATHS from './state-svg-paths.js';
import { useMachine } from '@xstate/react';
import gameMachine from './gameMachine';

function App() {
  const [current, send] = useMachine(gameMachine);

  console.log(current);

  // const [stateToGuess, setStateToGuess] = useState(getRandomState());

  const handleGuess = stateName => {
    send({ type: 'GUESS', data: stateName });
  };

  const restart = () => send({ type: 'RESTART' });

  // const getStateClass = (stateName, {value, context}) => {
  //   if (value === 'guessing') {
  //     return ''
  //   }
  //   if (value === 'correct') {
  //     if (context.currentState.name === stateName) {
  //       return 'correct'
  //     } else if ()
  //   }
  // }

  const mapStates = Object.keys(STATE_SVG_PATHS).map(stateCode => {
    const state = STATE_SVG_PATHS[stateCode];

    const classes =
      current.context.currentState.name === state.name ? current.value : '';

    return (
      <State
        key={stateCode}
        path={state.path}
        stateCode={stateCode}
        classes={classes}
        onClick={() => send({ type: 'GUESS', data: state.name })}
      />
    );
  });

  return (
    <div>
      {current.value === 'guessing' ? (
        <div>Where is {current.context.currentState.name}?</div>
      ) : null}
      {current.value === 'correct' ? (
        <div>
          You are correct!{' '}
          <span onClick={() => send({ type: 'RESTART' })}>
            Click to play again
          </span>
        </div>
      ) : null}
      {current.value === 'incorrect' ? (
        <div>
          You are incorrect!{' '}
          <span onClick={() => send({ type: 'RESTART' })}>
            Click to play again
          </span>
        </div>
      ) : null}
      <Map>{mapStates}</Map>;
    </div>
  );
}

export default App;
