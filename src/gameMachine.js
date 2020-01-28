import { Machine, assign } from 'xstate';
import PROVINCES from './provinceData.js';

const gameMachine = Machine(
  {
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
            actions: 'restart'
          }
        }
      },
      incorrect: {
        on: {
          RESTART: {
            target: 'guessing',
            actions: 'restart'
          }
        }
      },
      guessing: {
        on: {
          GUESS: [
            {
              target: 'correct',
              cond: 'isCorrectAnswer',
              actions: 'guess'
            },
            {
              target: 'incorrect',
              actions: 'guess'
            }
          ]
        }
      }
    }
  },
  {
    actions: {
      restart: assign({
        province: (context, event) => getRandomProvince()
      }),
      guess: assign({
        guess: (context, event) => event.data
      })
    },
    guards: {
      isCorrectAnswer: (context, event) => context.province === event.data
    }
  }
);

function getRandomProvince() {
  const provinces = Object.values(PROVINCES).map(province => province.name);
  return provinces[Math.floor(Math.random() * provinces.length)];
}

export default gameMachine;
