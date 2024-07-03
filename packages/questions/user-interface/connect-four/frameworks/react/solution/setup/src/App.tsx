import React, { useState } from 'react';

const ROWS = 6;
const COLS = 7;
const COUNT_TO_WIN = 4;

const PLAYERS = ['red', 'yellow'] as const;
type Player = (typeof PLAYERS)[number];
type CurrentPlayerIndex = number;

const EMPTY_CELL = '#fff';

const PLAYER_TOKENS: Record<Player, string> = {
  red: '#d9313d',
  yellow: '#fdc601',
};

// Direction deltas for horizontal, vertical and diagonal
// directions.
// The first value is the row delta, second value is the column delta.
// These will be used to check if there are N consecutive tokens
// in each direction for winning condition.
const DIRECTION_DELTAS = [
  [0, 1], // Horizontal
  [1, 0], // Vertical
  [1, -1], // Diagonal (bottom left to top right)
  [1, 1], // Diagonal (top left to bottom right)
];

// Game grid data structure.
type GameGridCellValue = Player | null;
type GameGridType = Array<Array<GameGridCellValue>>;

// Generate initial game grid.
function getInitialGrid(): GameGridType {
  return Array(ROWS)
    .fill(null)
    .map(() => Array(COLS).fill(null));
}

// Check if a player has won.
function checkIfPlayerWon(
  grid: GameGridType,
  row: number,
  col: number,
  player: Player,
): boolean {
  return DIRECTION_DELTAS.some(([deltaRow, deltaCol]) => {
    // Count the maximum consecutive discs for the
    // player in the 4 different directions.
    let consecutiveDiscs = 0;
    let maxConsecutiveDiscs = 0;

    for (
      let i = -COUNT_TO_WIN + 1;
      i <= COUNT_TO_WIN - 1;
      i++
    ) {
      const currRow = row + deltaRow * i;
      const currCol = col + deltaCol * i;

      if (grid?.[currRow]?.[currCol] === player) {
        consecutiveDiscs += 1;
        maxConsecutiveDiscs = Math.max(
          consecutiveDiscs,
          maxConsecutiveDiscs,
        );
      } else {
        consecutiveDiscs = 0;
      }
    }

    return maxConsecutiveDiscs >= COUNT_TO_WIN;
  });
}

// Player section component where player can
// select a column to drop their piece.
function PlayerMoveSection({
  availableColumns,
  currentColumn,
  currentPlayer,
  gameHasEnded,
  onColumnHover,
  onPlayerMove,
}: {
  availableColumns: Set<number>;
  currentColumn: number | null;
  currentPlayer: Player;
  gameHasEnded: boolean;
  onColumnHover: (column: number) => void;
  onPlayerMove: (column: number) => void;
}): React.ReactElement {
  return (
    <div className="player-move-section">
      {Array.from({ length: COLS }).map((_, index) => (
        <button
          aria-label={`Column ${index + 1}`}
          disabled={
            !availableColumns.has(index) || gameHasEnded
          }
          key={index}
          style={{
            backgroundColor:
              currentColumn === index && !gameHasEnded
                ? PLAYER_TOKENS[currentPlayer]
                : undefined,
          }}
          className="player-move-column"
          onMouseEnter={() => onColumnHover(index)}
          onClick={() => onPlayerMove(index)}
        />
      ))}
    </div>
  );
}

function GameGrid({
  grid,
}: {
  grid: GameGridType;
}): React.ReactElement {
  return (
    <div
      className="grid"
      style={{
        gridTemplateRows: `repeat(${ROWS}, var(--grid-item-size))`,
        gridTemplateColumns: `repeat(${COLS}, var(--grid-item-size)`,
      }}>
      {grid.map((rows, rowIndex) =>
        rows.map((cellValue, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            style={{
              backgroundColor:
                cellValue != null
                  ? PLAYER_TOKENS[cellValue]
                  : EMPTY_CELL,
            }}
            className="grid-item"
          />
        )),
      )}
    </div>
  );
}

// Winner details component.
function WinnerSection({
  winner,
}: {
  winner: Player;
}): React.ReactElement {
  return (
    <div
      className="winner-token"
      style={{ backgroundColor: PLAYER_TOKENS[winner] }}>
      WON
    </div>
  );
}

export default function App() {
  // State to handle game grid state.
  const [grid, setGrid] = useState<GameGridType>(() =>
    getInitialGrid(),
  );
  // Current player index.
  const [currentPlayerIndex, setCurrentPlayerIndex] =
    useState<CurrentPlayerIndex>(0);
  // Winner state. It will be player's index if there's a winner.
  const [winner, setWinner] = useState<Player | null>(null);

  // State to handle current column selected by the current player.
  const [currentColumn, setCurrentColumn] = useState<
    number | null
  >(null);

  function onPlayerMove(column: number) {
    // Make a deep clone of the grid.
    const newGrid = grid.map((row) => [...row]);

    let rowToPlace = ROWS - 1;
    // Find lowest row in current column that is empty.
    while (newGrid[rowToPlace][column] != null) {
      rowToPlace--;
    }

    const player = PLAYERS[currentPlayerIndex];
    newGrid[rowToPlace][column] = player;
    if (
      checkIfPlayerWon(newGrid, rowToPlace, column, player)
    ) {
      setWinner(player);
    }

    // Go to the next player.
    setCurrentPlayerIndex(
      (currentPlayerIndex + 1) % PLAYERS.length,
    );
    setGrid(newGrid);
  }

  function onColumnHover(index: number) {
    setCurrentColumn(index);
  }

  function onRestart() {
    setGrid(getInitialGrid());
    setCurrentColumn(null);
    setCurrentPlayerIndex(0);
    setWinner(null);
  }

  const movesSoFar = grid.reduce(
    (count, row) => count + row.filter(Boolean).length,
    0,
  );
  const isDraw =
    movesSoFar === ROWS * COLS && winner == null;
  const gameHasEnded = isDraw || winner != null;
  const availableColumns = new Set(
    grid[0]
      .map((piece, index) => (piece == null ? index : -1))
      .filter((item) => item !== -1),
  );

  return (
    <div className="app">
      <PlayerMoveSection
        availableColumns={availableColumns}
        currentColumn={currentColumn}
        currentPlayer={PLAYERS[currentPlayerIndex]}
        gameHasEnded={gameHasEnded}
        onColumnHover={onColumnHover}
        onPlayerMove={onPlayerMove}
      />
      <GameGrid grid={grid} />
      <button onClick={onRestart} className="reset-button">
        Reset
      </button>
      {isDraw && <h2>DRAW</h2>}
      {winner != null && <WinnerSection winner={winner} />}
    </div>
  );
}
