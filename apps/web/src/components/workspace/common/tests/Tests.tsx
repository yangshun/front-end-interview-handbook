import clsx from 'clsx';
import React from 'react';

import TestStatusIcon from './TestStatusIcon';
import type { Test } from './types';

type Props = Readonly<{
  tests: Array<Test>;
}>;

export default function Tests({ tests }: Props) {
  return (
    <div className="flex flex-col gap-2">
      {tests.map((test) => (
        <div key={test.name} className={clsx('flex gap-2')}>
          <TestStatusIcon status={test.status} />
          <div>
            {test.name}
            {test.duration && test.duration > 0 ? (
              <span className={clsx('ml-2')}>({test.duration} ms)</span>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
