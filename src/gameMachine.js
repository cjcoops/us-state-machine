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
      on: {
        RESTART: {
          target: 'guessing',
          actions: [
            assign({
              currentState: (context, event) => getRandomState()
            })
          ]
        }
      }
    },
    incorrect: {
      on: {
        RESTART: {
          target: 'guessing',
          actions: [
            assign({
              currentState: (context, event) => getRandomState()
            })
          ]
        }
      }
    },
    guessing: {
      on: {
        GUESS: [
          {
            target: 'correct',
            cond: (context, event) => {
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
