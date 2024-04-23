import React, { useState } from 'react';

const initialBoard = () => Array(9).fill(null);

const useTicTakToe = () => {
  const [board, setBoard] = useState(initialBoard);
  const [isXNext, setIsXNext] = useState(true);

  const WINNING_PATTERNS = [];

  const calculateWinner = (board) => {
    //iterate on all rows
    for (let i = 0; i < 3 * 3; i += 3) {
      let x1 = board[i * 3];
      let matching = true;
      for (let j = i; j < i + 3; j++) {
        if (board[j] != board[i]) matching = false;
      }

      if (matching) return x1;
    }

    //iterate on all columns
    for (let i = 0; i < 3; i++) {
      let x2 = board[i];
      let matching = true;
      for (let j = i; j < 3 * 3; j += 3) {
        if (board[j] != board[i]) matching = false;
      }

      if (matching) return x2;
    }

    //iterate on 1st diagonal
    let x3 = board[0];
    let matched = true;
    for (let i = 0; i < 3 * 3; i += 4) {
      if (board[i] != x3) matched = false;
    }
    if (matched) return x3;

    //iterate on 2nd diagonal
    let x4 = board[2];
    matched = true;
    for (let i = 0; i < 3 * 3; i += 2) {
      if (board[i] != x4) matched = false;
    }
    if (matched) return x4;

    return null;
  };

  const handleClick = (idx) => {
    const winner = calculateWinner(board);

    if (winner || board[idx]) return;

    const newBoard = [...board];
    newBoard[idx] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const getStatusMessage = () => {
    const winner = calculateWinner(board);

    if (!winner) return isXNext ? 'Player X turn' : 'Player O turn';

    return `Player ${winner} wins`;
  };

  const resetGame = () => {
    setBoard(initialBoard);
  };

  return { board, handleClick, getStatusMessage, resetGame };
};

export default useTicTakToe;
