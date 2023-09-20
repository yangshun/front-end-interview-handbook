import clsx from 'clsx';

import Describes from './Describes';
import FormattedError from './FormattedError';
import {
  failBackgroundClassName,
  failTextClassName,
  passBackgroundClassName,
  runBackgroundClassName,
} from './style';
import Tests from './Tests';
import type { TestsRunStatus } from './TestsRunStatusBadge';
import TestStatusIcon from './TestStatusIcon';
import type { Spec } from './types';
import { getFailingTests, getSpecTestResults, isEmpty } from './utils';

type Props = Readonly<{
  openSpec: (name: string) => void;
  runStatus: TestsRunStatus;
  showSpecFile?: boolean;
  specs: Array<Spec>;
}>;

export default function Specs({
  runStatus,
  specs,
  showSpecFile = false,
  openSpec,
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

          const tests = Object.values(spec.tests ?? {});
          const describes = Object.values(spec.describes ?? {});
          const stats = getSpecTestResults(spec);

          return (
            <div
              key={spec.name}
              className={clsx('flex w-full flex-col gap-y-6 font-mono')}>
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
              {(tests.length > 0 || describes.length > 0) && (
                <div className="flex flex-col gap-y-2">
                  {tests.length > 0 && <Tests tests={tests} />}
                  {describes.length > 0 && <Describes describes={describes} />}
                </div>
              )}
              <div className="flex flex-col gap-y-4">
                {getFailingTests(spec).map((test) => {
                  return (
                    <div
                      key={`failing-${test.name}`}
                      className={clsx('flex w-full flex-col gap-2')}>
                      <div
                        className={clsx(
                          'flex items-center gap-x-2 font-bold',
                          failTextClassName,
                        )}>
                        <TestStatusIcon status={test.status} />
                        <div>
                          {test.blocks.join(' › ')} › {test.name}
                        </div>
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
