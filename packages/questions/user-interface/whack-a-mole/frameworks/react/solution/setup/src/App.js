import { useEffect, useRef, useState } from 'react';

// Fisher-Yates shuffle.
function shuffle(array) {
  for (let i = 0; i < array.length; i++) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function generateMolePositions(molesAtOnce, totalCount) {
  // Generate an array containing values [0, totalCount].
  const indices = Array.from({ length: totalCount }).map(
    (_, index) => index,
  );
  shuffle(indices);
  // Take the first `totalCount` items
  // from the shuffled array.
  const shuffledIndices = indices.slice(0, molesAtOnce);

  return new Set(shuffledIndices);
}

function WhackAMole({
  rows = 3,
  cols = 3,
  roundDuration = 30,
  molesAtOnce = 1,
  molesAppearingInterval = 1500,
}) {
  const totalCount = rows * cols;

  // Set of indices for currently visible moles.
  const [visible, setVisible] = useState(new Set());
  // Current player score.
  const [score, setScore] = useState(null);
  // Whether the game is in progress.
  const [running, setRunning] = useState(false);
  // Time left for the current round.
  const [timeLeft, setTimeLeft] = useState(roundDuration);
  const countdownTimerId = useRef(null);

  useEffect(() => {
    let timerId;

    if (running) {
      // Generate moles at fixed intervals.
      timerId = setInterval(() => {
        setVisible(
          generateMolePositions(molesAtOnce, totalCount),
        );
      }, molesAppearingInterval);
    }

    return () => {
      clearInterval(timerId);
      setVisible(new Set());
    };
  }, [
    running,
    molesAtOnce,
    molesAppearingInterval,
    totalCount,
  ]);

  function startGame() {
    // Reset variables to default values.
    setRunning(true);
    setTimeLeft(roundDuration);
    setScore(0);

    // Interval to decrement the timer to 0.
    countdownTimerId.current = setInterval(() => {
      setTimeLeft((currTimeLeft) => {
        if (currTimeLeft <= 0) {
          clearInterval(countdownTimerId.current);
          setRunning(false);
          return 0;
        }

        return currTimeLeft - 1;
      });
    }, 1000);
  }

  useEffect(() => {
    return () => {
      // Clear countdown timer on unmount if it's running.
      clearInterval(countdownTimerId.current);
    };
  }, []);

  function whackMole(index) {
    // Whacking on an empty cell, no-op.
    if (!visible.has(index)) {
      return;
    }

    const newVisible = new Set(visible);
    newVisible.delete(index);
    setVisible(newVisible);
    setScore((score ?? 0) + 1);
  }

  return (
    <div className="app">
      <div className="header">
        {score == null ? (
          <button
            className="start-button"
            type="button"
            onClick={startGame}>
            Start Game
          </button>
        ) : (
          <div className="round-information">
            <p>Score: {score}</p>
            {!running && (
              <button
                className="start-button"
                type="button"
                onClick={startGame}>
                Play again
              </button>
            )}
            <p>Time Left: {timeLeft}</p>
          </div>
        )}
      </div>
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${rows}, 1fr)`,
          gridTemplateRows: `repeat(${cols}, 1fr)`,
        }}>
        {Array(totalCount)
          .fill(null)
          .map((_, index) => {
            return (
              <button
                className="grid__cell"
                key={index}
                onClick={() => whackMole(index)}>
                <img
                  src="https://www.greatfrontend.com/img/questions/whack-a-mole/mole-head.png"
                  alt="Mole head"
                  className={[
                    'grid__cell-contents',
                    'mole-head',
                    visible.has(index) &&
                      'mole-head--visible',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                />
                <img
                  src="https://www.greatfrontend.com/img/questions/whack-a-mole/mole-hill.png"
                  alt="Mole hill"
                  className="grid__cell-contents mole-hill"
                />
              </button>
            );
          })}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <WhackAMole
      rows={3}
      cols={3}
      roundDuration={15}
      molesAtOnce={2}
      molesAppearingInterval={1500}
    />
  );
}
