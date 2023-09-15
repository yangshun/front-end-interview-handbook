import clsx from 'clsx';
import * as React from 'react';

import {
  failTextClassName,
  passTextClassName,
  skipTextClassName,
} from './style';
import type { SuiteResults, TestResults } from './types';

type Props = Readonly<{
  duration: number;
  suites: SuiteResults;
  tests: TestResults;
}>;

const labelClassName = 'font-bold whitespace-pre-wrap';

export default function Summary({ suites, tests, duration }: Props) {
  const widestLabel = 'Test suites: ';

  const withMargin = (label: string): string => {
    const difference = widestLabel.length - label.length;
    const margin = Array.from({ length: difference }, () => ' ').join('');

    return label + margin;
  };

  return (
    <div className={clsx('font-mono font-bold')}>
      {suites.total > 1 && (
        <div className={clsx('mb-2')}>
          <span className={clsx('font-bold whitespace-pre-wrap')}>
            {widestLabel}
          </span>
          {suites.fail > 0 && (
            <span className={clsx(failTextClassName)}>
              {suites.fail} failed,{' '}
            </span>
          )}
          {suites.pass > 0 && (
            <span className={clsx(passTextClassName)}>
              {suites.pass} passed,{' '}
            </span>
          )}
          <span>{suites.total} total</span>
        </div>
      )}
      <div className={clsx('mb-2')}>
        <span className={clsx(labelClassName)}>{withMargin('Tests:')}</span>
        {tests.fail > 0 && (
          <span className={clsx(failTextClassName)}>{tests.fail} failed, </span>
        )}
        {tests.skip > 0 && (
          <span className={clsx(skipTextClassName)}>
            {tests.skip} skipped,{' '}
          </span>
        )}
        {tests.pass > 0 && (
          <span className={clsx(passTextClassName)}>{tests.pass} passed, </span>
        )}
        <span>{tests.total} total</span>
      </div>
      <div className={clsx(labelClassName)}>
        {withMargin('Time:')}
        {duration / 1000}s
      </div>
    </div>
  );
}
