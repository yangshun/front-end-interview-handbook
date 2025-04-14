import { useState } from 'react';

function ProgressBar({ progress }) {
  return (
    <div className="bar">
      <div
        className="bar-contents"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  );
}

const INITIAL_PROGRESSION = [0];
const CONCURRENCY_LIMIT = 3;

export default function App() {
  const [progression, setProgression] = useState(
    INITIAL_PROGRESSION,
  );
  const [timerId, setTimerId] = useState(null);

  function start() {
    const timer = window.setInterval(() => {
      setProgression((currProgression) => {
        // Find the bars which aren't full.
        const nonFullBars = currProgression
          .map((value, index) => ({ value, index }))
          .filter(({ value }) => value < 100);
        // All bars are full, none to increment.
        if (nonFullBars.length === 0) {
          return currProgression;
        }

        // Get the first LIMIT non-full bars and increment them.
        const barsToIncrement = nonFullBars.slice(
          0,
          CONCURRENCY_LIMIT,
        );
        const newProgression = currProgression.slice();
        for (const { index } of barsToIncrement) {
          newProgression[index] += 0.5;
        }
        return newProgression;
      });
    }, 10);

    setTimerId(timer);
  }

  function stop() {
    window.clearInterval(timerId);
    setTimerId(null);
  }

  function appendBar() {
    setProgression(progression.concat(0));
  }

  function reset() {
    stop();
    setProgression(INITIAL_PROGRESSION);
  }

  // Derived state to determine if the bars are progressing.
  const isProgressing = timerId != null;

  return (
    <div className="wrapper">
      <div className="buttons">
        <button
          onClick={() => {
            appendBar();
          }}>
          Add
        </button>
        <button
          onClick={() => {
            isProgressing ? stop() : start();
          }}>
          {isProgressing ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={() => {
            reset();
          }}>
          Reset
        </button>
      </div>
      <div className="bars">
        {progression.map((progress, index) => (
          <ProgressBar key={index} progress={progress} />
        ))}
      </div>
      <pre>
        {JSON.stringify(
          { isProgressing, progression },
          null,
          2,
        )}
      </pre>
    </div>
  );
}
