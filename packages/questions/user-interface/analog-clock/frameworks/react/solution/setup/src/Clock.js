import { useEffect, useState } from 'react';

function Hand({ height = 1, width = 1, angle }) {
  return (
    <div
      aria-hidden={true}
      className="clock-hand"
      style={{
        transform: `rotate(${angle}deg) scaleY(${height}) scaleX(${width})`,
      }}
    />
  );
}

function useCurrentDate() {
  const [date, setDate] = useState(new Date());

  // Kick off the timer.
  useEffect(() => {
    const timer = window.setInterval(() => {
      setDate(new Date());
    }, 100);

    // Clear the timer upon unmount.
    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return date;
}

function padTwoDigit(number) {
  return number >= 10 ? String(number) : `0${number}`;
}

export default function Clock() {
  const date = useCurrentDate();
  const hours = date.getHours() % 12;
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return (
    <ClockImpl
      hours={hours}
      minutes={minutes}
      seconds={seconds}
      size={300}
    />
  );
}

const FULL_ROTATION_DEGREES = 360;

// Separate out into a component that takes the time as a prop,
// so as to make it easy to test the rendering for specific times.
function ClockImpl({ hours, minutes, seconds, size }) {
  const secondsPercentage = seconds / 60;
  // To have second-level precision in the minute hand angle.
  const minutesPercentage =
    (minutes + secondsPercentage) / 60;
  // To have minute-level precision in the hour hand angle.
  const hoursPercentage =
    ((hours % 12) + minutesPercentage) / 12;

  const hourAngle = hoursPercentage * FULL_ROTATION_DEGREES;
  const minutesAngle =
    minutesPercentage * FULL_ROTATION_DEGREES;
  const secondsAngle =
    secondsPercentage * FULL_ROTATION_DEGREES;

  const dateTimeDisplay = `${padTwoDigit(
    hours,
  )}:${padTwoDigit(minutes)}:${padTwoDigit(seconds)}`;

  return (
    <time
      className="clock"
      dateTime={dateTimeDisplay}
      style={{
        '--size': `${size}px`,
      }}>
      <Hand height={0.5} angle={hourAngle} width={3} />
      <Hand height={0.9} angle={minutesAngle} width={2} />
      <Hand height={0.8} angle={secondsAngle} />
    </time>
  );
}
