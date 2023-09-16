import { useEffect, useState } from 'react';

function Light({ backgroundColor }) {
  return (
    <div
      aria-hidden={true}
      className="traffic-light"
      style={{ backgroundColor }}
    />
  );
}

export default function TrafficLight({
  initialColor = 'green',
  config,
  layout = 'vertical',
}) {
  const [currentColor, setCurrentColor] =
    useState(initialColor);

  useEffect(() => {
    const { duration, next } = config[currentColor];

    const timerId = setTimeout(() => {
      setCurrentColor(next);
    }, duration);

    return () => {
      clearTimeout(timerId);
    };
  }, [currentColor]);

  return (
    <div
      aria-live="polite"
      aria-label={`Current light: ${currentColor}`}
      className={[
        'traffic-light-container',
        layout === 'vertical' &&
          'traffic-light-container--vertical',
      ]
        .filter((cls) => !!cls)
        .join(' ')}>
      {Object.keys(config).map((color) => (
        <Light
          key={color}
          backgroundColor={
            color === currentColor
              ? config[color].backgroundColor
              : undefined
          }
        />
      ))}
    </div>
  );
}
