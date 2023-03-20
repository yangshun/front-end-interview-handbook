import { useRef, useState } from 'react';

const MS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const MS_IN_HOUR =
  MINUTES_IN_HOUR * SECONDS_IN_MINUTE * MS_IN_SECOND;
const MS_IN_MINUTE = SECONDS_IN_MINUTE * MS_IN_SECOND;

function formatTime(timeParam) {
  let time = timeParam;
  const parts = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    ms: 0,
  };
  if (time > MS_IN_HOUR) {
    parts.hours = Math.floor(time / MS_IN_HOUR);
    time %= MS_IN_HOUR;
  }

  if (time > MS_IN_MINUTE) {
    parts.minutes = Math.floor(time / MS_IN_MINUTE);
    time %= MS_IN_MINUTE;
  }

  if (time > MS_IN_SECOND) {
    parts.seconds = Math.floor(time / MS_IN_SECOND);
    time %= MS_IN_SECOND;
  }

  parts.ms = time;

  return parts;
}

function padTwoDigit(number) {
  return number >= 10 ? String(number) : `0${number}`;
}

export default function Stopwatch() {
  const lastTickTiming = useRef(null);
  const [totalDuration, setTotalDuration] = useState(0);
  // Timer ID of the active interval, if one is running.
  const [timerId, setTimerId] = useState(null);

  // Derived state to determine if there's a timer running.
  const isRunning = timerId != null;

  function startTimer() {
    lastTickTiming.current = Date.now();
    setTimerId(
      window.setInterval(() => {
        const now = Date.now();
        const timePassed = now - lastTickTiming.current;
        setTotalDuration(
          (duration) =>
            // Use the callback form of setState to ensure
            // we are using the latest value of duration.
            duration + timePassed,
        );
        lastTickTiming.current = now;
      }, 1),
    );
  }

  function stopInterval() {
    window.clearInterval(timerId);
    setTimerId(null);
  }

  function resetTimer() {
    stopInterval();
    setTotalDuration(0);
  }

  function toggleTimer() {
    if (isRunning) {
      stopInterval();
    } else {
      startTimer();
    }
  }

  const formattedTime = formatTime(totalDuration);

  return (
    <div>
      <button
        className="time"
        onClick={() => {
          toggleTimer();
        }}>
        {formattedTime.hours > 0 && (
          <span>
            <span className="time-number">
              {formattedTime.hours}
            </span>
            <span className="time-unit">h</span>
          </span>
        )}{' '}
        {formattedTime.minutes > 0 && (
          <span>
            <span className="time-number">
              {formattedTime.minutes}
            </span>
            <span className="time-unit">m</span>
          </span>
        )}{' '}
        <span>
          <span className="time-number">
            {formattedTime.seconds}
          </span>
          <span className="time-unit">s</span>
        </span>{' '}
        <span className="time-number time-number--small">
          {padTwoDigit(Math.floor(formattedTime.ms / 10))}
        </span>
      </button>
      <div>
        <button
          onClick={() => {
            toggleTimer();
          }}>
          {isRunning ? 'Stop' : 'Start'}
        </button>{' '}
        <button
          onClick={() => {
            resetTimer();
          }}>
          Reset
        </button>
      </div>
    </div>
  );
}
