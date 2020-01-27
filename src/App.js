import React, { useState, useEffect } from 'react';
import './App.css';
import State from './State';
import Map from './Map';
import Dialog from './Dialog';
import STATE_SVG_PATHS from './state-svg-paths.js';
import { useMachine } from '@xstate/react';
import gameMachine from './gameMachine';

function App() {
  const [current, send] = useMachine(gameMachine);

  // const handleGuess = stateName => {
  //   send({ type: 'GUESS', data: stateName });
  // };

  useEffect(() => {
    window.addEventListener('keydown', event => {
      if (event.code === 'Space') {
        console.log(event);
        event.preventDefault();
        send({ type: 'RESTART' });
      }
    });
  }, [send]);

  const getStateClass = (stateName, { value, context }) => {
    if (value === 'guessing') {
      return '';
    }

    const isIncorrectGuess =
      value === 'incorrect' && context.guess === stateName;

    if (isIncorrectGuess) {
      return 'incorrect';
    }

    const isCorrectAnswer = context.currentState.name === stateName;

    if (isCorrectAnswer) {
      return 'answer';
    }

    return '';
  };

  const mapStates = Object.keys(STATE_SVG_PATHS).map(stateCode => {
    const state = STATE_SVG_PATHS[stateCode];

    const classes = getStateClass(state.name, current);

    return (
      <State
        key={stateCode}
        path={state.path}
        classes={classes}
        onClick={() => send({ type: 'GUESS', data: state.name })}
      />
    );
  });

  return (
    <div className="app">
      <Dialog {...current} />
      <Map>{mapStates}</Map>;
    </div>
  );
}

export default App;
