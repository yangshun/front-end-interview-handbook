'use client';

import clsx from 'clsx';
import * as React from 'react';

import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import { themeBackgroundColor, themeDivideColor } from '~/components/ui/theme';

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
  onFocusConsole: () => void;
  onShowTestCase: (index: number, displayPath: Array<string>) => void;
  openSpec: (name: string) => void;
  runStatus: TestsRunStatus;
  showSpecFile?: boolean;
  specs: Array<Spec>;
}>;

export default function SpecsInline({
  onFocusConsole,
  onShowTestCase,
  openSpec,
  runStatus,
  showSpecFile = false,
  specs,
}: Props) {
  const intl = useIntl();

  return (
    <div className="flex flex-col gap-y-6">
      {specs
        .filter((spec) => !isEmpty(spec))
        .map((spec) => {
          if (spec.error) {
            return (
              <Text
                key={spec.name}
                className="flex flex-col gap-3 gap-y-2 p-3"
                size="body3">
                <div className="flex items-center">
                  <SpecLabel
                    className={clsx('rounded', failBackgroundClassName)}>
                    {intl.formatMessage({
                      defaultMessage: 'Error',
                      description: 'Workspace test spec error label',
                      id: 'PRsCOw',
                    })}
                  </SpecLabel>
                  <FilePath
                    path={spec.name}
                    onClick={(): void => openSpec(spec.name)}
                  />
                </div>
                <FormattedError error={spec.error} path={spec.name} />
                <div>
                  <Button
                    label={intl.formatMessage({
                      defaultMessage: 'Check the console for more information',
                      description: 'Workspace test spec error button label',
                      id: 'A3ftCj',
                    })}
                    size="xs"
                    variant="secondary"
                    onClick={() => onFocusConsole()}
                  />
                </div>
              </Text>
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
                        {intl.formatMessage({
                          defaultMessage: 'Fail',
                          description: 'Workspace test spec fail label',
                          id: 'zRCowZ',
                        })}
                      </SpecLabel>
                    ) : (
                      <SpecLabel className={clsx(passBackgroundClassName)}>
                        {intl.formatMessage({
                          defaultMessage: 'Pass',
                          description: 'Workspace test spec pass label',
                          id: '4YniIl',
                        })}
                      </SpecLabel>
                    )
                  ) : (
                    <SpecLabel className={clsx(runBackgroundClassName)}>
                      {intl.formatMessage({
                        defaultMessage: 'Run',
                        description: 'Workspace test spec run label',
                        id: 'lOmxE1',
                      })}
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
                  const nameSegments = [...test.blocks, test.name];
                  const fullTestName = nameSegments.join(' › ');
                  const testErrors = test.errors.filter(
                    (error) => error.name != null,
                  );

                  return (
                    <div
                      key={fullTestName}
                      className={clsx(
                        'flex w-full flex-col transition-colors',
                      )}>
                      <div
                        className={clsx(
                          'sticky top-0 flex justify-between gap-2 p-3',
                          themeBackgroundColor,
                        )}>
                        <Text className="flex items-center gap-3" size="body3">
                          <TestStatusIcon status={test.status} />{' '}
                          <code className="text-xs">
                            {nameSegments.map((nameSegment, index) => (
                              <React.Fragment key={nameSegment}>
                                {index > 0 && <span> › </span>}
                                <button
                                  className="hover:underline"
                                  type="button"
                                  onClick={() => {
                                    onShowTestCase(index, nameSegments);
                                  }}>
                                  {nameSegment}
                                </button>
                              </React.Fragment>
                            ))}
                          </code>
                        </Text>
                        <TestDuration duration={test.duration} />
                      </div>
                      {testErrors.length > 0 && (
                        <div className="pb-3">
                          {testErrors.map((error) => (
                            <div
                              key={error.name}
                              className="w-full overflow-x-auto px-3">
                              <FormattedError error={error} path={test.path} />
                            </div>
                          ))}
                        </div>
                      )}
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

function FilePath({ path }: Readonly<{ onClick: () => void; path: string }>) {
  const parts = path.split('/');
  const basePath = parts.slice(0, parts.length - 1).join('/') + '/';
  const fileName = parts[parts.length - 1];

  return (
    <div className={clsx('font-mono')}>
      <span>{basePath}</span>
      <span className={clsx('font-bold')}>{fileName}</span>
    </div>
  );
}
