'use client';

import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button type="button" onClick={() => setCount((n) => n - 1)}>
        <FormattedMessage
          defaultMessage="Decrement"
          description="Decrease"
          id="ADeXOi"
        />
      </button>{' '}
      {count}{' '}
      <button type="button" onClick={() => setCount((n) => n + 1)}>
        <FormattedMessage
          defaultMessage="Increment"
          description="Increase"
          id="MCH3lP"
        />
      </button>
    </div>
  );
}
