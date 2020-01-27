import { Machine, assign } from 'xstate';
import STATE_SVG_PATHS from './state-svg-paths.js';

const restart = assign({
  currentState: (context, event) => getRandomState()
});

const guess = assign({
  guess: (context, event) => event.data
});

const isCorrectAnswer = (context, event) => {
  return context.currentState.name === event.data;
};

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
          actions: [restart]
        }
      }
    },
    incorrect: {
      on: {
        RESTART: {
          target: 'guessing',
          actions: [restart]
        }
      }
    },
    guessing: {
      on: {
        GUESS: [
          {
            target: 'correct',
            cond: isCorrectAnswer,
            actions: [guess]
          },
          {
            target: 'incorrect',
            actions: [guess]
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
