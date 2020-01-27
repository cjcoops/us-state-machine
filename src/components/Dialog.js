import React from 'react';

function Dialog({ value, context }) {
  let message = '';

  switch (value) {
    case 'guessing':
      message = `Where is ${context.province}?`;
      break;

    case 'correct':
      message = `Correct! 🤠🤠🤠Click anywhere to Play Again`;
      break;

    case 'incorrect':
      message = ` Unlucky 😕Click anywhere to Try Again`;
      break;

    default:
      throw new Error('Unhandled game state');
  }

  return <div className="dialog">{message}</div>;
}

export default Dialog;
