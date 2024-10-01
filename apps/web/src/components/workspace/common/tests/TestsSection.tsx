import clsx from 'clsx';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  RiCheckboxLine,
  RiFlaskLine,
  RiListCheck3,
  RiPencilLine,
  RiPlayLine,
} from 'react-icons/ri';

import { FormattedMessage } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import EmptyState from '~/components/ui/EmptyState';
import { themeBorderColor } from '~/components/ui/theme';

import SpecsInline from './SpecsInline';
import type { TestsOutcome } from './TestsOutcomeBadge';
import TestsOutcomeBadge from './TestsOutcomeBadge';
import type { TestsRunStatus } from './TestsRunStatusBadge';
import TestsRunStatusBadge from './TestsRunStatusBadge';
import type { Spec, Test } from './types';
import { flatMap, getAllTestResults, set, splitTail } from './utils';
import { useCodingWorkspaceContext } from '../CodingWorkspaceContext';

import { useSandpackClient } from '@codesandbox/sandpack-react';

type SpecMode = 'run' | 'submit';

type State = Readonly<{
  currentSpecPath: string | null;
  outcome: TestsOutcome;
  pendingTestRun: string | null;
  specs: Record<string, Spec>;
  specsCount: number;
  status: TestsRunStatus;
}>;

const INITIAL_STATE: State = {
  currentSpecPath: null,
  outcome: 'none',
  pendingTestRun: null,
  specs: {},
  specsCount: 0,
  status: 'initializing',
};

export type Props = Readonly<{
  onComplete?: (outcome: TestsOutcome) => void;
  onFocusConsole: () => void;
  onShowTestCase: (
    type: SpecMode,
    index: number,
    specParts: Array<string>,
  ) => void;
  onShowTestsCases: (type: SpecMode) => void;
  specMode: SpecMode;
  specPath: string;
}>;

export default function TestsSection({
  specMode,
  specPath,
  onComplete,
  onFocusConsole,
  onShowTestsCases,
  onShowTestCase,
}: Props) {
  const { status, executionComplete, runTests, submit } =
    useCodingWorkspaceContext();
  const { getClient, iframe, listen, sandpack } = useSandpackClient();

  const [state, setState] = useState<State>(INITIAL_STATE);

  // HACK: Callbacks used within the sandpack events effect are stale so
  // we use a ref to obtain the latest values.
  const onCompleteRef = useRef<(outcome: TestsOutcome) => void>();

  onCompleteRef.current = onComplete;

  const runSpec = useCallback((): void => {
    if (sandpack.status === 'idle') {
      sandpack.runSandpack();
      setState((prevState) => ({
        ...prevState,
        pendingTestRun: specPath,
      }));

      return;
    }

    setState((prevState) => ({
      ...prevState,
      currentSpecPath: specPath,
      specs: {},
      status: 'running',
    }));

    const client = getClient();

    if (client) {
      client.dispatch({ path: specPath, type: 'run-tests' });
    }
  }, [getClient, sandpack, specPath]);

  useEffect(() => {
    if (
      (state.status === 'idle' || state.status === 'complete') &&
      ((status === 'running_tests' && specMode === 'run') ||
        (status === 'submitting' && specMode === 'submit'))
    ) {
      runSpec();
    }
  }, [runSpec, specMode, state.status, status]);

  useEffect(() => {
    let currentDescribeBlocks: Array<string> = [];
    let currentSpec = '';

    const unsubscribe = listen((data): void => {
      // Ignore if message isn't for the current spec.
      if (
        ('path' in data && data.path !== state.currentSpecPath) ||
        ('test' in data &&
          'path' in data.test &&
          data.test.path !== state.currentSpecPath)
      ) {
        return;
      }

      if (
        data.type === 'action' &&
        data.action === 'clear-errors' &&
        data.source === 'jest'
      ) {
        currentSpec = data.path;

        return;
      }

      if (data.type === 'action' && data.action === 'show-error') {
        executionComplete();

        return setState((prevState) => ({
          ...prevState,
          status: 'error',
        }));
      }

      if (data.type === 'test') {
        if (data.event === 'initialize_tests') {
          currentDescribeBlocks = [];
          currentSpec = '';

          // There's a pending test run to be executed after the bundler
          // starts up (probably a restart).
          // Execute the pending test run and remove it...
          if (state.pendingTestRun) {
            const client = getClient();

            if (client) {
              client.dispatch({
                path: state.pendingTestRun,
                type: 'run-tests',
              });
            }
          }

          return setState((prevState) => ({
            ...prevState,
            pendingTestRun: null,
            specs: {},
            status: 'idle',
          }));
        }

        if (data.event === 'test_count') {
          return setState((prevState) => ({
            ...prevState,
            specsCount: data.count,
          }));
        }

        if (data.event === 'total_test_start') {
          currentDescribeBlocks = [];

          return setState((prevState) => ({
            ...prevState,
            outcome: 'none',
            status: 'running',
          }));
        }

        if (data.event === 'total_test_end') {
          executionComplete();

          return setState((prevState) => {
            const specs = Object.values(prevState.specs).filter(
              (spec) => !!spec.name,
            );
            const testResults = getAllTestResults(specs);
            const outcome: TestsOutcome = (() => {
              if (testResults.total === 0) {
                return 'none';
              }

              if (testResults.skip > 0) {
                return 'indeterminate';
              }

              if (testResults.pass === testResults.total) {
                return 'correct';
              }

              return 'wrong';
            })();

            if (onCompleteRef.current !== undefined) {
              // Call in next tick as React still updating this component.
              setTimeout(() => {
                onCompleteRef.current?.(outcome);
              }, 0);
            }

            return {
              ...prevState,
              outcome,
              status: 'complete',
            };
          });
        }

        if (data.event === 'add_file') {
          return setState(
            set(['specs', data.path], {
              describes: {},
              name: data.path,
              tests: {},
            }),
          );
        }

        if (data.event === 'remove_file') {
          return setState((prevState) => {
            const specs = { ...prevState.specs };

            delete specs[data.path];

            return { ...prevState, specs };
          });
        }

        if (data.event === 'file_error') {
          return setState(set(['specs', data.path, 'error'], data.error));
        }

        if (data.event === 'describe_start') {
          currentDescribeBlocks.push(data.blockName);

          const [describePath, currentDescribe] = splitTail(
            currentDescribeBlocks,
          );
          const spec = currentSpec;

          if (currentDescribe === undefined) {
            return;
          }

          return setState(
            set(
              [
                'specs',
                spec,
                'describes',
                ...flatMap(describePath, (name) => [name, 'describes']),
                currentDescribe,
              ],
              {
                describes: {},
                name: data.blockName,
                tests: {},
              },
            ),
          );
        }

        if (data.event === 'describe_end') {
          currentDescribeBlocks.pop();

          return;
        }

        if (data.event === 'add_test') {
          const [describePath, currentDescribe] = splitTail(
            currentDescribeBlocks,
          );
          const test: Test = {
            blocks: [...currentDescribeBlocks],
            errors: [],
            name: data.testName,
            path: data.path,
            status: 'idle',
          };

          if (currentDescribe === undefined) {
            return setState(
              set(['specs', data.path, 'tests', data.testName], test),
            );
          }

          return setState(
            set(
              [
                'specs',
                data.path,
                'describes',
                ...flatMap(describePath, (name) => [name, 'describes']),
                currentDescribe,
                'tests',
                data.testName,
              ],
              test,
            ),
          );
        }

        if (data.event === 'test_start') {
          const { test } = data;
          const [describePath, currentDescribe] = splitTail(test.blocks);

          const startedTest: Test = {
            blocks: test.blocks,
            errors: [],
            name: test.name,
            path: test.path,
            status: 'running',
          };

          if (currentDescribe === undefined) {
            return setState(
              set(['specs', test.path, 'tests', test.name], startedTest),
            );
          }

          return setState(
            set(
              [
                'specs',
                test.path,
                'describes',
                ...flatMap(describePath, (name) => [name, 'describes']),
                currentDescribe,
                'tests',
                test.name,
              ],
              startedTest,
            ),
          );
        }

        if (data.event === 'test_end') {
          const { test } = data;
          const [describePath, currentDescribe] = splitTail(test.blocks);
          const endedTest = {
            blocks: test.blocks,
            duration: test.duration,
            errors: test.errors,
            name: test.name,
            path: test.path,
            status: test.status,
          };

          if (currentDescribe === undefined) {
            return setState(
              set(['specs', test.path, 'tests', test.name], endedTest),
            );
          }

          return setState(
            set(
              [
                'specs',
                test.path,
                'describes',
                ...flatMap(describePath, (name) => [name, 'describes']),
                currentDescribe,
                'tests',
                test.name,
              ],
              endedTest,
            ),
          );
        }
      }
    });

    return unsubscribe;
    // Intentionally missing some deps.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentSpecPath, sandpack.status]);

  const openSpec = (file: string): void => {
    sandpack.setActiveFile(file);
  };

  const specs = Object.values(state.specs).filter((spec) => !!spec.name);
  const testResults = getAllTestResults(specs);

  return (
    <div className="size-full relative flex">
      <iframe ref={iframe} style={{ display: 'none' }} title="Sandpack Tests" />
      <div className="flex w-full flex-col">
        <div className="flex grow overflow-y-auto">
          {(() => {
            if (state.status === 'initializing') {
              return (
                <div className="flex grow items-center justify-center">
                  <EmptyState
                    iconClassName="animate-bounce"
                    size="sm"
                    title="Loading tests"
                    variant="tests_loading"
                  />
                </div>
              );
            }

            return (
              <div className="flex w-full grow flex-col">
                {(() => {
                  if (state.status === 'idle') {
                    return (
                      <div className="flex grow items-center justify-center">
                        {(() => {
                          switch (specMode) {
                            case 'run':
                              return (
                                <div className="flex flex-col items-center">
                                  <EmptyState
                                    action={
                                      <Button
                                        addonPosition="start"
                                        icon={RiPlayLine}
                                        isDisabled={status !== 'idle'}
                                        label="Run"
                                        variant="secondary"
                                        onClick={runTests}
                                      />
                                    }
                                    icon={RiFlaskLine}
                                    size="sm"
                                    subtitle={
                                      <FormattedMessage
                                        defaultMessage="Run your code with <button>custom test cases</button> before submitting."
                                        description="Text that appears in the DevTool under the Tests tab before the user has submitted their code"
                                        id="t2Ll2e"
                                        values={{
                                          button: (chunks) => (
                                            <Anchor
                                              href="#"
                                              onClick={(event) => {
                                                event.preventDefault();

                                                return onShowTestsCases?.(
                                                  specMode,
                                                );
                                              }}>
                                              {chunks}
                                            </Anchor>
                                          ),
                                        }}
                                      />
                                    }
                                    title={
                                      <FormattedMessage
                                        defaultMessage="Test your code"
                                        description="Title of test panel for coding workspace"
                                        id="HdWLAV"
                                      />
                                    }
                                  />
                                </div>
                              );
                            case 'submit':
                              return (
                                <div className="flex flex-col items-center">
                                  <EmptyState
                                    action={
                                      <Button
                                        isDisabled={status !== 'idle'}
                                        label="Submit"
                                        variant="primary"
                                        onClick={submit}
                                      />
                                    }
                                    icon={RiCheckboxLine}
                                    size="sm"
                                    subtitle={
                                      <FormattedMessage
                                        defaultMessage="Submit your code to check against <button>all test cases</button>."
                                        description="Text that appears in the DevTool under the Tests tab before the user has submitted their code"
                                        id="ZJQ+uw"
                                        values={{
                                          button: (chunks) => (
                                            <Anchor
                                              href="#"
                                              onClick={(event) => {
                                                event.preventDefault();

                                                return onShowTestsCases?.(
                                                  specMode,
                                                );
                                              }}>
                                              {chunks}
                                            </Anchor>
                                          ),
                                        }}
                                      />
                                    }
                                    title={
                                      <FormattedMessage
                                        defaultMessage="Submit your code"
                                        description="Title of test panel for coding workspace"
                                        id="as1hw8"
                                      />
                                    }
                                  />
                                </div>
                              );
                          }
                        })()}
                      </div>
                    );
                  }

                  if (state.status === 'complete' && specs.length === 0) {
                    return (
                      <div className="flex grow items-center justify-center">
                        <p>No test files found.</p>
                      </div>
                    );
                  }

                  return (
                    <SpecsInline
                      openSpec={openSpec}
                      runStatus={state.status}
                      specs={specs}
                      onFocusConsole={onFocusConsole}
                      onShowTestCase={(index, displayPath) => {
                        onShowTestCase(specMode, index, displayPath);
                      }}
                    />
                  );
                })()}
              </div>
            );
          })()}
        </div>
        <div
          className={clsx(
            'flex shrink-0 items-center justify-between border-t px-3 py-1.5',
            themeBorderColor,
          )}>
          <div className="flex grow items-center">
            {state.outcome === 'none' && (
              <TestsRunStatusBadge status={state.status} />
            )}
            {state.status === 'complete' && testResults.total > 0 && (
              <TestsOutcomeBadge
                outcome={state.outcome}
                results={testResults}
              />
            )}
          </div>
          {state.status === 'complete' && (
            <div className="flex items-center gap-2">
              {specMode === 'run' ? (
                <Button
                  addonPosition="start"
                  className="-mr-1"
                  icon={RiPencilLine}
                  label="Edit test cases"
                  size="xs"
                  variant="tertiary"
                  onClick={() => onShowTestsCases?.(specMode)}
                />
              ) : (
                <Button
                  addonPosition="start"
                  className="-mr-1"
                  icon={RiListCheck3}
                  label="View test cases"
                  size="xs"
                  variant="tertiary"
                  onClick={() => onShowTestsCases?.(specMode)}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
