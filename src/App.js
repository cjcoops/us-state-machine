import React from 'react';
import './App.css';

import { useMachine } from '@xstate/react';

import gameMachine from './gameMachine';

import Province from './components/Province';
import Map from './components/Map';
import Dialog from './components/Dialog';

import PROVINCES from './provinceData';

function App() {
  const [current, send] = useMachine(gameMachine);

  const handlePageClick = () => {
    if (current.value !== 'guessing') {
      send({ type: 'RESTART' });
    }
  };

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
    <div className="app" onClick={handlePageClick}>
      <div className="container">
        <Dialog {...current} />
        <Map>{provinces}</Map>;
      </div>
    </div>
  );
}

export default App;
