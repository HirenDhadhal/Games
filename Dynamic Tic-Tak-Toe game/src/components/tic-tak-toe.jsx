import React, { useState } from 'react';
import useTicTakToe from '../hooks/useTicTakToe';

function TicTakToe() {
  const { board, resetGame, getStatusMessage, handleClick } = useTicTakToe();
  return (
    <div className='game'>
      <div className='status'>
        {getStatusMessage()}
        <button className='reset-btn' onClick={resetGame}>
          Reset Game
        </button>
      </div>
      <div className='board'>
        {board.map((val, idx) => {
          return (
            <button
              className='cell'
              key={idx}
              onClick={() => handleClick(idx)}
              disabled={val !== null}
            >
              {val}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TicTakToe;
