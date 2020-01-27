import { Machine, assign } from 'xstate';
import STATE_SVG_PATHS from './state-svg-paths.js';

const gameMachine = Machine({
  id: 'game',
  initial: 'guessing',
  context: {
    currentState: getRandomState(),
    guess: undefined
  },
  states: {
    correct: {
      on: { RESTART: 'guessing' }
    },
    incorrect: {
      on: { RESTART: 'guessing' }
    },
    guessing: {
      on: {
        GUESS: [
          {
            target: 'correct',
            // Only transition to 'searching' if the guard (cond) evaluates to true
            // cond: searchValid, // or { type: 'searchValid' }
            cond: (context, event) => {
              //   console.log(context);
              //   console.log(event);

              return context.currentState.name === event.data;
            },
            actions: [
              assign({
                guess: (context, event) => event.data
              })
            ]
          },
          {
            target: 'incorrect',
            actions: [
              assign({
                guess: (context, event) => event.data
              })
            ]
          }
        ]
      }
    }
  }
});

function getRandomState() {
  const states = Object.values(STATE_SVG_PATHS);
  return states[Math.floor(Math.random() * states.length)];
}

export default gameMachine;
