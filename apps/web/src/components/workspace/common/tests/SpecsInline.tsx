import clsx from 'clsx';
import * as React from 'react';

import FormattedError from './FormattedError';
import {
  failBackgroundClassName,
  passBackgroundClassName,
  runBackgroundClassName,
} from './style';
import TestDuration from './TestDuration';
import type { Status } from './TestsSection';
import TestStatusIcon from './TestStatusIcon';
import type { Spec } from './types';
import { getSpecTestResults, getTests, isEmpty } from './utils';

type Props = Readonly<{
  openSpec: (name: string) => void;
  showSpecFile?: boolean;
  specs: Array<Spec>;
  status: Status;
}>;

export default function SpecsInline({
  specs,
  showSpecFile = false,
  openSpec,
  status,
}: Props) {
  return (
    <div className="flex flex-col gap-y-6 p-3">
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
                  {status === 'complete' ? (
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
              <div className="flex flex-col divide-y divide-neutral-800 overflow-clip rounded-md border border-neutral-800">
                {allTests.map((test) => {
                  const fullTestName = [...test.blocks, test.name].join(' › ');

                  return (
                    <div
                      key={fullTestName}
                      className={clsx(
                        'flex w-full flex-col gap-y-2 p-3 transition-colors hover:bg-neutral-900',
                      )}>
                      <div className={clsx('flex justify-between gap-2')}>
                        <div className="flex gap-2">
                          <TestStatusIcon status={test.status} /> {fullTestName}
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
