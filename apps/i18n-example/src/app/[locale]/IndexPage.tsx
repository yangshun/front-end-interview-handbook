'use client';

import { FormattedMessage } from 'react-intl';

import Counter from './components/Counter';

export default function IndexPage() {
  return (
    <div>
      <h1>
        <FormattedMessage
          defaultMessage="Welcome"
          description="Welcome message"
          id="iyaPkC"
        />
      </h1>
      <Counter />
    </div>
  );
}
