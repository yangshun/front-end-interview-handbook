import { useState } from 'react';

// List of cell indices that are 3-in-a-row.
const CELLS_IN_A_LINE = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Determine if there's a winner for the board.
function determineWinner(board) {
  for (let i = 0; i < CELLS_IN_A_LINE.length; i++) {
    const [x, y, z] = CELLS_IN_A_LINE[i];
    // Determine if the cells in a line have the same mark.
    if (
      board[x] != null &&
      board[x] === board[y] &&
      board[y] === board[z]
    ) {
      return board[x];
    }
  }

  // No winner yet.
  return null;
}

function Cell({ index, disabled, mark, turn, onClick }) {
  return (
    <button
      aria-label={
        mark == null
          ? `Mark cell ${index} as ${turn}`
          : undefined
      }
      className="cell"
      disabled={disabled}
      onClick={onClick}>
      <span aria-hidden={true}>{mark}</span>
    </button>
  );
}

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsPlaying, setIsXPlaying] = useState(true);

  const winner = determineWinner(board);

  function onReset() {
    setBoard(Array(9).fill(null));
    setIsXPlaying(true);
  }

  function getStatusMessage() {
    if (winner != null) {
      return `Player ${winner} wins!`;
    }

    // All cells have been filled up.
    if (!board.includes(null)) {
      return `It's a draw!`;
    }

    return `Player ${xIsPlaying ? 'X' : 'O'} turn`;
  }

  return (
    <div className="app">
      <div aria-live="polite">{getStatusMessage()}</div>
      <div className="board">
        {Array(9)
          .fill(null)
          .map((_, index) => index)
          .map((cellIndex) => {
            const turn = xIsPlaying ? 'X' : 'O';
            return (
              <Cell
                key={cellIndex}
                disabled={
                  board[cellIndex] != null || winner != null
                }
                index={cellIndex}
                mark={board[cellIndex]}
                turn={turn}
                onClick={() => {
                  const newBoard = board.slice();
                  newBoard[cellIndex] = turn;
                  setBoard(newBoard);
                  setIsXPlaying(!xIsPlaying);
                }}
              />
            );
          })}
      </div>
      <button
        onClick={() => {
          if (winner == null) {
            // Confirm whether to reset the game.
            const confirm = window.confirm(
              'Are you sure you want to reset the game?',
            );
            if (!confirm) {
              return;
            }
          }

          onReset();
        }}>
        Reset
      </button>
    </div>
  );
}
