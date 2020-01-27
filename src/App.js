import React, { useEffect } from 'react';
import './App.css';

import { useMachine } from '@xstate/react';

import gameMachine from './gameMachine';

import Province from './components/Province';
import Map from './components/Map';
import Dialog from './components/Dialog';

import PROVINCES from './provinceData';

function App() {
  const [current, send] = useMachine(gameMachine);

  console.log(current.history);

  useEffect(() => {
    window.addEventListener('keydown', event => {
      if (event.code === 'Space') {
        event.preventDefault();
        send({ type: 'RESTART' });
      }
    });
  }, [send]);

  const getProvinceClass = (province, { value, context }) => {
    if (value === 'guessing') {
      return '';
    }

    const isIncorrectGuess =
      value === 'incorrect' && context.guess === province;

    if (isIncorrectGuess) {
      return 'incorrect';
    }

    const isCorrectAnswer = context.province === province;

    if (isCorrectAnswer) {
      return 'answer';
    }

    return '';
  };

  const provinces = Object.keys(PROVINCES).map(provinceCode => {
    const province = PROVINCES[provinceCode];

    const provinceClass = getProvinceClass(province.name, current);

    return (
      <Province
        key={provinceCode}
        path={province.path}
        provinceClass={provinceClass}
        onClick={() => send({ type: 'GUESS', data: province.name })}
      />
    );
  });

  return (
    <div className="app">
      <Dialog {...current} />
      <Map>{provinces}</Map>;
    </div>
  );
}

export default App;
