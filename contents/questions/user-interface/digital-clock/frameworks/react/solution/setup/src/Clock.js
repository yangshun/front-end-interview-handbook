import { useEffect, useState } from 'react';

const ALL_SIDES = [
  'digit-square-border-top',
  'digit-square-border-left',
  'digit-square-border-right',
  'digit-square-border-bottom',
];

const NUMBER_TO_CLASSES = {
  0: {
    top: [
      'digit-square-border-top',
      'digit-square-border-left',
      'digit-square-border-right',
    ],
    bottom: [
      'digit-square-border-bottom',
      'digit-square-border-left',
      'digit-square-border-right',
    ],
  },
  1: {
    top: ['digit-square-border-right'],
    bottom: ['digit-square-border-right'],
  },
  2: {
    top: [
      'digit-square-border-top',
      'digit-square-border-right',
      'digit-square-border-bottom',
    ],
    bottom: [
      'digit-square-border-top',
      'digit-square-border-left',
      'digit-square-border-bottom',
    ],
  },
  3: {
    top: [
      'digit-square-border-top',
      'digit-square-border-right',
      'digit-square-border-bottom',
    ],
    bottom: [
      'digit-square-border-top',
      'digit-square-border-right',
      'digit-square-border-bottom',
    ],
  },
  4: {
    top: [
      'digit-square-border-left',
      'digit-square-border-right',
      'digit-square-border-bottom',
    ],
    bottom: [
      'digit-square-border-right',
      'digit-square-border-top',
    ],
  },
  5: {
    top: [
      'digit-square-border-top',
      'digit-square-border-left',
      'digit-square-border-bottom',
    ],
    bottom: [
      'digit-square-border-top',
      'digit-square-border-right',
      'digit-square-border-bottom',
    ],
  },
  6: {
    top: [
      'digit-square-border-top',
      'digit-square-border-left',
      'digit-square-border-bottom',
    ],
    bottom: ALL_SIDES,
  },
  7: {
    top: [
      'digit-square-border-top',
      'digit-square-border-right',
    ],
    bottom: ['digit-square-border-right'],
  },
  8: {
    top: ALL_SIDES,
    bottom: ALL_SIDES,
  },
  9: {
    top: ALL_SIDES,
    bottom: [
      'digit-square-border-top',
      'digit-square-border-right',
      'digit-square-border-bottom',
    ],
  },
};

function Digit({ number }) {
  const { top, bottom } = NUMBER_TO_CLASSES[number];
  return (
    <div>
      <div
        className={[
          'digit-square',
          'digit-square-top',
          ...top,
        ].join(' ')}
      />
      <div
        className={[
          'digit-square',
          'digit-square-bottom',
          ...bottom,
        ].join(' ')}
      />
    </div>
  );
}

function Separator() {
  return (
    <div className="separator">
      <div className="separator-dot" />
      <div className="separator-dot" />
    </div>
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

export default function App() {
  const date = useCurrentDate();

  let hours = date.getHours() % 12;
  hours = hours === 0 ? 12 : hours;
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const dateTimeDisplay = `${padTwoDigit(
    date.getHours(),
  )}:${padTwoDigit(minutes)}:${padTwoDigit(seconds)}`;

  // Use a <time> element with `datetime` attribute set
  // to the current time in 24-hour format so that
  // screen readers can read this component.
  return (
    <time className="clock" dateTime={dateTimeDisplay}>
      <Digit number={parseInt(hours / 10, 10)} />
      <Digit number={hours % 10} />
      <Separator />
      <Digit number={parseInt(minutes / 10, 10)} />
      <Digit number={minutes % 10} />
      <Separator />
      <Digit number={parseInt(seconds / 10, 10)} />
      <Digit number={seconds % 10} />
    </time>
  );
}
