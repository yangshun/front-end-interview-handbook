import { useState } from 'react';

const NUMBER_OF_FACES = 6;
const MIN_NUMBER_OF_DICE = 1;
const MAX_NUMBER_OF_DICE = 12;

const DICE_FACE_DOT_POSITIONS = {
  1: ['dot--center'],
  2: ['dot--top-right', 'dot--bottom-left'],
  3: ['dot--top-right', 'dot--center', 'dot--bottom-left'],
  4: [
    'dot--top-left',
    'dot--top-right',
    'dot--bottom-left',
    'dot--bottom-right',
  ],
  5: [
    'dot--top-left',
    'dot--top-right',
    'dot--center',
    'dot--bottom-left',
    'dot--bottom-right',
  ],
  6: [
    'dot--top-left',
    'dot--top-right',
    'dot--center-left',
    'dot--center-right',
    'dot--bottom-left',
    'dot--bottom-right',
  ],
};

function rollDice(numberOfDice) {
  return Array.from({ length: numberOfDice }, () =>
    Math.max(Math.ceil(Math.random() * NUMBER_OF_FACES), 1),
  );
}

export default function App() {
  const [rolledDice, setRolledDice] = useState([]);

  return (
    <div className="wrapper">
      <form
        className="dice-form"
        onSubmit={(event) => {
          // To prevent a page reload.
          event.preventDefault();

          const data = new FormData(event.target);
          // Convert the input value to a number.
          const numberOfDice = +data.get('dice-count');
          setRolledDice(rollDice(numberOfDice));
        }}>
        <div>
          <label htmlFor="dice-input">Number of dice</label>
          <input
            id="dice-input"
            name="dice-count"
            required
            type="number"
            min={MIN_NUMBER_OF_DICE}
            max={MAX_NUMBER_OF_DICE}
          />
        </div>
        <button type="submit">Roll</button>
      </form>
      {rolledDice.length > 0 && (
        <div
          className="dice-list"
          role="status"
          aria-live="polite">
          {rolledDice.map((value, index) => (
            // Using index as key is acceptable here
            // as the Dice component is stateless.
            <Dice key={index} value={value} />
          ))}
          {/* Announced by screen readers. */}
          <div className="sr-only">
            Roll results: {rolledDice.join(', ')}
          </div>
        </div>
      )}
    </div>
  );
}

function Dice({ value }) {
  return (
    <div className="dice">
      <div className="dots">
        {DICE_FACE_DOT_POSITIONS[value].map(
          (dotPosition) => (
            <div
              key={dotPosition}
              className={['dot', dotPosition].join(' ')}
            />
          ),
        )}
      </div>
    </div>
  );
}
