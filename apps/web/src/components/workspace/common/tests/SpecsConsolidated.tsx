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
import type { Status } from './TestsSection';
import type { Spec } from './types';
import { getFailingTests, getSpecTestResults, isEmpty } from './utils';

type Props = Readonly<{
  openSpec: (name: string) => void;
  showSpecFile?: boolean;
  specs: Array<Spec>;
  status: Status;
}>;

export default function Specs({
  specs,
  showSpecFile = false,
  openSpec,
  status,
}: Props) {
  return (
    <div className="flex flex-col gap-y-6 p-4">
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
              className={clsx('w-full font-mono flex flex-col gap-y-6')}>
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
                      className={clsx('w-full flex flex-col gap-2')}>
                      <div className={clsx('font-bold', failTextClassName)}>
                        ● {test.blocks.join(' › ')} › {test.name}
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
}: Readonly<{ children: React.ReactNode, className: string; }>) {
  return (
    <span
      className={clsx(
        'py-1 px-2 font-mono uppercase mr-2 rounded-sm',
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
      className={clsx('font-mono pointer inline-block')}
      type="button"
      onClick={onClick}>
      <span className={clsx('text-white decoration-dotted underline')}>
        {basePath}
      </span>
      <span
        className={clsx('text-white font-bold decoration-dotted underline')}>
        {fileName}
      </span>
    </button>
  );
}
