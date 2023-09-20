import clsx from 'clsx';
import * as React from 'react';

import { themeDivideColor, themeLineColor } from '~/components/ui/theme';

import FormattedError from './FormattedError';
import {
  failBackgroundClassName,
  passBackgroundClassName,
  runBackgroundClassName,
} from './style';
import TestDuration from './TestDuration';
import type { TestsRunStatus } from './TestsRunStatusBadge';
import TestStatusIcon from './TestStatusIcon';
import type { Spec } from './types';
import { getSpecTestResults, getTests, isEmpty } from './utils';

type Props = Readonly<{
  openSpec: (name: string) => void;
  runStatus: TestsRunStatus;
  showSpecFile?: boolean;
  specs: Array<Spec>;
}>;

export default function SpecsInline({
  specs,
  showSpecFile = false,
  openSpec,
  runStatus,
}: Props) {
  return (
    <div className="flex flex-col gap-y-6">
      {specs
        .filter((spec) => !isEmpty(spec))
        .map((spec) => {
          if (spec.error) {
            return (
              <div key={spec.name}>
                <SpecLabel
                  className={clsx('rounded-sm', failBackgroundClassName)}>
                  Error
                </SpecLabel>
                <FilePath
                  path={spec.name}
                  onClick={(): void => openSpec(spec.name)}
                />
                <FormattedError error={spec.error} path={spec.name} />
              </div>
            );
          }

          const allTests = getTests(spec);
          const stats = getSpecTestResults(spec);

          return (
            <div
              key={spec.name}
              className={clsx('flex w-full flex-col gap-y-6')}>
              {showSpecFile && (
                <div className="flex items-center">
                  {runStatus === 'complete' ? (
                    stats.fail > 0 ? (
                      <SpecLabel className={clsx(failBackgroundClassName)}>
                        Fail
                      </SpecLabel>
                    ) : (
                      <SpecLabel className={clsx(passBackgroundClassName)}>
                        Pass
                      </SpecLabel>
                    )
                  ) : (
                    <SpecLabel className={clsx(runBackgroundClassName)}>
                      Run
                    </SpecLabel>
                  )}
                  <FilePath
                    path={spec.name}
                    onClick={(): void => {
                      openSpec(spec.name);
                    }}
                  />
                </div>
              )}
              <div
                className={clsx('flex flex-col overflow-clip', [
                  'divide-y',
                  themeDivideColor,
                ])}>
                {allTests.map((test) => {
                  const fullTestName = [...test.blocks, test.name].join(' › ');

                  return (
                    <div
                      key={fullTestName}
                      className={clsx(
                        'flex w-full flex-col gap-y-2 p-3 transition-colors',
                      )}>
                      <div className={clsx('flex justify-between gap-2')}>
                        <div className="flex items-center gap-3">
                          <TestStatusIcon status={test.status} />{' '}
                          <code className="text-xs">{fullTestName}</code>
                        </div>
                        <TestDuration duration={test.duration} />
                      </div>
                      {test.errors
                        .filter((error) => error.name != null)
                        .map((error) => (
                          <div
                            key={error.name}
                            className="w-full overflow-x-auto">
                            <FormattedError error={error} path={test.path} />
                          </div>
                        ))}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
    </div>
  );
}

function SpecLabel({
  children,
  className,
}: Readonly<{ children: React.ReactNode; className: string }>) {
  return (
    <span
      className={clsx(
        'mr-2 rounded-sm px-2 py-1 font-mono uppercase',
        className,
      )}>
      {children}
    </span>
  );
}

function FilePath({
  onClick,
  path,
}: Readonly<{ onClick: () => void; path: string }>) {
  const parts = path.split('/');
  const basePath = parts.slice(0, parts.length - 1).join('/') + '/';
  const fileName = parts[parts.length - 1];

  return (
    <button
      className={clsx('pointer inline-block font-mono')}
      type="button"
      onClick={onClick}>
      <span className={clsx('text-white underline decoration-dotted')}>
        {basePath}
      </span>
      <span
        className={clsx('font-bold text-white underline decoration-dotted')}>
        {fileName}
      </span>
    </button>
  );
}
