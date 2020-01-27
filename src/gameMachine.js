import { Machine, assign } from 'xstate';
import PROVINCES from './provinceData.js';

const restart = assign({
  province: (context, event) => getRandomProvince()
});

const guess = assign({
  guess: (context, event) => event.data
});

const isCorrectAnswer = (context, event) => {
  return context.province === event.data;
};

const gameMachine = Machine({
  id: 'game',
  initial: 'guessing',
  context: {
    province: getRandomProvince(),
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

function getRandomProvince() {
  const provinces = Object.values(PROVINCES).map(province => province.name);
  return provinces[Math.floor(Math.random() * provinces.length)];
}

export default gameMachine;
