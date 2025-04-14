import { useState } from 'react';

function format(number) {
  // Show 4 d.p. if number has more than 4 decimal places.
  return /\.\d{5}/.test(number)
    ? Number(number).toFixed(4)
    : number;
}

export default function App() {
  const [celsius, setCelsius] = useState('');
  const [fahrenheit, setFahrenheit] = useState('');

  function convert(value, setDestination, calculateValue) {
    const numericValue = Number(value);
    const isValid =
      !Number.isNaN(numericValue) && Boolean(value);
    setDestination(
      isValid ? format(calculateValue(numericValue)) : '',
    );
  }

  return (
    <div>
      <div className="temperature-converter">
        {/* Use a label for better a11y. */}
        <label className="temperature-converter-column">
          <input
            className="temperature-converter-column-top-row"
            type="number"
            value={celsius}
            onChange={(event) => {
              const newValue = event.target.value;
              setCelsius(newValue);
              convert(
                newValue,
                setFahrenheit,
                (value) => (value * 9) / 5 + 32,
              );
            }}
          />
          <div className="temperature-converter-column-bottom-row">
            Celsius
          </div>
        </label>
        <div className="temperature-converter-column">
          <div className="temperature-converter-column-top-row">
            =
          </div>
        </div>
        {/* Use a label for better a11y. */}
        <label className="temperature-converter-column">
          <input
            className="temperature-converter-column-top-row"
            type="number"
            value={fahrenheit}
            onChange={(event) => {
              const newValue = event.target.value;
              setFahrenheit(newValue);
              convert(
                newValue,
                setCelsius,
                (value) => ((value - 32) * 5) / 9,
              );
            }}
          />
          <div className="temperature-converter-column-bottom-row">
            Fahrenheit
          </div>
        </label>
      </div>
    </div>
  );
}
