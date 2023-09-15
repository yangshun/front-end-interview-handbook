import { useCallback, useEffect, useState } from 'react';

import SpecsConsolidated from './SpecsConsolidated';
import SpecsInline from './SpecsInline';
import Summary from './Summary';
import type { Spec, Test } from './types';
import {
  flatMap,
  getAllSuiteResults,
  getAllTestResults,
  getDuration,
  set,
  splitTail,
} from './utils';
import { useCodingWorkspaceContext } from '../../CodingWorkspaceContext';

import { useSandpackClient } from '@codesandbox/sandpack-react';

export type Status = 'complete' | 'idle' | 'initializing' | 'running';
type SpecsLayout = 'consolidated' | 'inline';
type SpecMode = 'run' | 'submit';

type State = Readonly<{
  currentSpecPath: string | null;
  layout: SpecsLayout;
  pendingTestRun: string | null;
  specs: Record<string, Spec>;
  specsCount: number;
  status: Status;
}>;

const INITIAL_STATE: State = {
  currentSpecPath: null,
  layout: 'inline',
  pendingTestRun: null,
  specs: {},
  specsCount: 0,
  status: 'initializing',
};

export type Props = Readonly<{
  onComplete?: (specs: Record<string, Spec>) => void;
  onShowTestsCases: (type: SpecMode) => void;
  specMode: SpecMode;
  specPath: string;
}>;

export default function TestsSection({
  specMode,
  specPath,
  onComplete,
  onShowTestsCases,
}: Props) {
  const { status, executionComplete } = useCodingWorkspaceContext();
  const { getClient, iframe, listen, sandpack } = useSandpackClient();

  const [state, setState] = useState<State>(INITIAL_STATE);

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
      console.log({ data });
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

      if (data.type === 'test') {
        if (data.event === 'initialize_tests') {
          currentDescribeBlocks = [];
          currentSpec = '';

          // There's a pending test run to be executed after the bundler starts up (probably a restart).
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
            status: 'running',
          }));
        }

        if (data.event === 'total_test_end') {
          executionComplete();

          return setState((prevState) => {
            if (onComplete !== undefined) {
              onComplete(prevState.specs);
            }

            return {
              ...prevState,
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
  const duration = getDuration(specs);
  const testResults = getAllTestResults(specs);
  const suiteResults = getAllSuiteResults(specs);

  return (
    <div className="relative flex h-full w-full bg-neutral-900">
      <iframe ref={iframe} style={{ display: 'none' }} title="Sandpack Tests" />
      <div className="flex w-full flex-col">
        <div className="flex grow overflow-y-auto">
          {(() => {
            if (state.status === 'initializing') {
              return (
                <div className="flex grow items-center justify-center">
                  Loading
                </div>
              );
            }

            return (
              <div className="flex w-full grow flex-col">
                {specs.length === 0 && state.status === 'complete' ? (
                  <div>
                    <p>No test files found.</p>
                  </div>
                ) : state.layout === 'inline' ? (
                  <SpecsInline
                    openSpec={openSpec}
                    specs={specs}
                    status={state.status}
                  />
                ) : (
                  <SpecsConsolidated
                    openSpec={openSpec}
                    specs={specs}
                    status={state.status}
                  />
                )}
              </div>
            );
          })()}
        </div>
        <div className="border-t border-neutral-800">
          {state.status === 'complete' && testResults.total > 0 && (
            <div className="shrink-0 px-4 pt-4">
              <div className="w-full rounded bg-neutral-800 p-3">
                <Summary
                  duration={duration}
                  suites={suiteResults}
                  tests={testResults}
                />
              </div>
            </div>
          )}
          <div className="flex h-10 shrink-0 items-center justify-between px-2">
            <div className="flex grow items-center gap-6">
              <span>Tests: {state.status}</span>
              <span>Sandpack: {sandpack.status}</span>
              <button
                className="p-2"
                onClick={() =>
                  setState({
                    ...state,
                    layout:
                      state.layout === 'inline' ? 'consolidated' : 'inline',
                  })
                }>
                Layout
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="p-2"
                onClick={() => onShowTestsCases?.(specMode)}>
                {specMode === 'run' ? (
                  <>Edit test cases</>
                ) : (
                  <>View test cases</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
