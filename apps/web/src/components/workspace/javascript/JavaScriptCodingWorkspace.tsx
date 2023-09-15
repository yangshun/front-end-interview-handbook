import clsx from 'clsx';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { RiArrowGoBackLine } from 'react-icons/ri';

import Button from '~/components/ui/Button';
import MonacoCodeEditor from '~/components/workspace/common/editor/MonacoCodeEditor';
import TestsSection from '~/components/workspace/common/tests/TestsSection';

import { TilesPanelRoot } from '~/react-tiling/components/TilesPanelRoot';
import { TilesProvider } from '~/react-tiling/state/TilesProvider';
import { useTilesContext } from '~/react-tiling/state/useTilesContext';

import type {
  JavaScriptCodingLanguage,
  JavaScriptCodingSkeleton,
  JavaScriptCodingWorkspaceConfig,
} from './JavaScriptCodingWorkspaceContext';
import {
  JavaScriptCodingWorkspaceContextProvider,
  useJavaScriptCodingWorkspaceContext,
} from './JavaScriptCodingWorkspaceContext';
import {
  getJavaScriptCodingWorkspaceLayout,
  getJavaScriptCodingWorkspaceLayoutAdvanced,
} from './JavaScriptCodingWorkspaceLayouts';
import { codingFilesShouldUseTypeScript } from '../codingFilesShouldUseTypeScript';
import {
  CodingWorkspaceProvider,
  useCodingWorkspaceContext,
} from '../CodingWorkspaceContext';
import CodingWorkspaceTimer from '../common/CodingWorkspaceTimer';
import CodingWorkspaceConsole from '../common/console/CodingWorkspaceConsole';
import useMonacoEditorModels from '../common/editor/useMonacoEditorModels';
import useMonacoLanguagesFetchTypeDeclarations from '../common/editor/useMonacoLanguagesFetchTypeDeclarations';
import useMonacoLanguagesLoadTSConfig from '../common/editor/useMonacoLanguagesLoadTSConfig';
import useMonacoLanguagesTypeScriptRunDiagnostics from '../common/editor/useMonacoLanguagesTypeScriptRunDiagnostics';
import useRestartSandpack from '../useRestartSandpack';

import {
  SandpackConsole,
  SandpackTests,
  useSandpack,
} from '@codesandbox/sandpack-react';
import { useMonaco } from '@monaco-editor/react';

type TabsType =
  | 'console'
  | 'description'
  | 'run_tests'
  | 'solution'
  | 'submit'
  | 'test_cases';

export type PredefinedTabsContents = Record<
  TabsType,
  Readonly<{ contents: ReactNode; label: string }>
>;

function NewTabContents({
  predefinedTabs,
  onSelectTabType,
}: Readonly<{
  onSelectTabType: (tabType: TabsType) => void;
  predefinedTabs: PredefinedTabsContents;
}>) {
  return (
    <div className="flex flex-col gap-2 p-4">
      <p className="text-sm font-medium">Tools</p>
      <div className="flex flex-wrap gap-2">
        {Object.entries(predefinedTabs).map(([tabType, tabDetails]) => (
          <button
            key={tabType}
            className="rounded-full border border-neutral-700 px-3 py-1.5 text-xs transition-colors hover:bg-neutral-700"
            type="button"
            onClick={() => {
              onSelectTabType(tabType as TabsType);
            }}>
            {tabDetails.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function JavaScriptCodingCodeEditor({
  filePath,
}: Readonly<{
  filePath: string;
}>) {
  const { resetFile } = useJavaScriptCodingWorkspaceContext();
  const { sandpack } = useSandpack();
  const { files, updateFile } = sandpack;

  return (
    <div className="flex w-full flex-col">
      <div className="flex justify-end p-2">
        <button
          className="text-neutral-500"
          title="Reset code"
          type="button"
          onClick={() => {
            if (!confirm('Reset code to original? Changes will be lost!')) {
              return;
            }
            resetFile(filePath);
          }}>
          <RiArrowGoBackLine className="h-4 w-4 shrink-0" />
        </button>
      </div>
      <MonacoCodeEditor
        filePath={filePath}
        value={files[filePath].code}
        onChange={(val) => {
          updateFile(filePath, val ?? '');
        }}
      />
    </div>
  );
}

function JavaScriptCodingWorkspaceTestsRunSection({
  specPath,
}: Readonly<{
  specPath: string;
}>) {
  const { dispatch } = useTilesContext();
  const { status } = useCodingWorkspaceContext();

  useEffect(() => {
    if (status === 'running_tests') {
      dispatch({
        payload: {
          tabId: 'run_tests',
        },
        type: 'tab-set-active',
      });
    }
  }, [dispatch, status]);

  const test = false;

  return test ? (
    <SandpackTests watchMode={false} />
  ) : (
    <TestsSection
      specMode="run"
      specPath={specPath}
      onShowTestsCases={() => {
        dispatch({
          payload: {
            tabId: specPath,
          },
          type: 'tab-set-active',
        });
      }}
    />
  );
}

function JavaScriptCodingWorkspaceTestsSubmitSection({
  specPath,
}: Readonly<{
  specPath: string;
}>) {
  const { dispatch } = useTilesContext();
  const { status } = useCodingWorkspaceContext();

  useEffect(() => {
    if (status === 'submitting') {
      dispatch({
        payload: {
          tabId: 'submit',
        },
        type: 'tab-set-active',
      });
    }
  }, [dispatch, status]);

  return (
    <TestsSection
      specMode="submit"
      specPath={specPath}
      onShowTestsCases={() => {
        dispatch({
          payload: {
            tabId: 'test_cases',
          },
          type: 'tab-set-active',
        });
      }}
    />
  );
}

function JavaScriptCodingWorkspaceImpl({
  defaultLanguage,
  solution,
}: Readonly<{
  defaultLanguage: JavaScriptCodingLanguage;
  solution: string;
}>) {
  const { dispatch } = useTilesContext();
  const { status, runTests, submit } = useCodingWorkspaceContext();
  const { language, setLanguage, resetAllFiles } =
    useJavaScriptCodingWorkspaceContext();

  const { sandpack } = useSandpack();
  const { activeFile, visibleFiles, files, updateFile } = sandpack;

  useRestartSandpack();

  const shouldUseTypeScript = codingFilesShouldUseTypeScript(
    Object.keys(files),
  );
  const { workspace, skeleton } = useJavaScriptCodingWorkspaceContext();

  const monaco = useMonaco();

  useMonacoLanguagesLoadTSConfig(
    monaco,
    shouldUseTypeScript,
    files['/tsconfig.json']?.code,
  );
  useMonacoLanguagesFetchTypeDeclarations(
    monaco,
    shouldUseTypeScript,
    files['/package.json']?.code,
  );
  useMonacoLanguagesTypeScriptRunDiagnostics(
    monaco,
    shouldUseTypeScript,
    language === 'ts',
  );

  useMonacoEditorModels(monaco, files);

  const predefinedTabs: PredefinedTabsContents = {
    console: { contents: <CodingWorkspaceConsole />, label: 'Console' },
    description: {
      contents: (
        <div className="space-y-4 p-4">
          <h2 className="text-lg font-semibold">Description</h2>
          <p className="text-sm">
            One morning, when Gregor Samsa woke from troubled dreams, he found
            himself transformed in his bed into a horrible vermin. He lay on his
            armour-like back, and if he lifted his head a little he could see
            his brown belly, slightly domed and divided by arches into stiff
            sections.
          </p>
        </div>
      ),
      label: 'Description',
    },
    run_tests: {
      contents: (
        <JavaScriptCodingWorkspaceTestsRunSection specPath={workspace.run} />
      ),
      label: 'Run Tests',
    },
    solution: {
      contents: (
        <div className="space-y-4 p-4">
          <h2 className="text-lg font-semibold">Solution</h2>
          <pre>{solution}</pre>
        </div>
      ),
      label: 'Solution',
    },
    submit: {
      contents: (
        <JavaScriptCodingWorkspaceTestsSubmitSection
          specPath={workspace.submit}
        />
      ),
      label: 'Submit',
    },
    test_cases: {
      contents: (
        <div className="space-y-4 p-4">
          <h2 className="text-lg font-semibold">Test Cases</h2>
          <pre>{files[workspace.submit].code}</pre>
        </div>
      ),
      label: 'All Test Cases',
    },
  };

  const [tabContents, setTabContents] = useState<
    Record<string, Readonly<{ contents: ReactNode; label: string }>>
  >({
    ...predefinedTabs,
    ...Object.fromEntries(
      visibleFiles.map((file) => [
        file,
        {
          contents: <JavaScriptCodingCodeEditor filePath={file} />,
          label: {
            [workspace.main]: 'Code',
            [workspace.run]: 'Test Cases',
          }[file],
        },
      ]),
    ),
  });

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex items-center justify-between px-2 py-3">
        <div>Sandpack: {sandpack.status}</div>
        <div className="flex gap-x-2">
          <button
            type="button"
            onClick={() => {
              dispatch({
                payload: {
                  panels: getJavaScriptCodingWorkspaceLayout(
                    activeFile,
                    visibleFiles,
                  ),
                },
                type: 'layout-change',
              });
            }}>
            Basic Layout
          </button>
          <button
            type="button"
            onClick={() => {
              dispatch({
                payload: {
                  panels: getJavaScriptCodingWorkspaceLayoutAdvanced(
                    activeFile,
                    visibleFiles,
                  ),
                },
                type: 'layout-change',
              });
            }}>
            Advanced Layout
          </button>
          <button
            type="button"
            onClick={() => {
              const newLanguage = language === 'js' ? 'ts' : 'js';

              setLanguage(newLanguage);
              updateFile(workspace.main, skeleton[newLanguage]);
            }}>
            {language}
          </button>
        </div>
      </div>
      <div className="flex w-full grow px-2">
        <TilesPanelRoot
          disablePointerEventsDuringResize={true}
          getResizeHandlerProps={(direction) => ({
            children: (
              <div
                className={clsx(
                  'transition-color absolute rounded-full ease-in-out group-hover:bg-indigo-400',
                  direction === 'horizontal' && 'inset-x-0 inset-y-0.5',
                  direction === 'vertical' && 'inset-x-0.5 inset-y-0',
                )}
              />
            ),
            className: clsx(
              'relative bg-transparent group',
              direction === 'horizontal' && 'h-2',
              direction === 'vertical' && 'w-2',
            ),
          })}
          getTabLabel={(tabId) => tabContents[tabId]?.label ?? `New tab`}
          renderTab={(tabId) =>
            tabContents[tabId] != null ? (
              <div className="flex h-full w-full">
                {tabContents[tabId].contents}
              </div>
            ) : (
              <NewTabContents
                predefinedTabs={predefinedTabs}
                onSelectTabType={(tabType) => {
                  setTabContents({
                    ...tabContents,
                    [tabId]: { ...tabContents[tabType] },
                  });
                }}
              />
            )
          }
        />
      </div>
      <div className="flex items-center justify-between px-2 py-3">
        <div>Sandpack: {sandpack.status}</div>
        <div className="flex items-center gap-x-2">
          <CodingWorkspaceTimer />
          <Button
            isDisabled={status !== 'idle'}
            label="Reset Code"
            size="xs"
            variant="tertiary"
            onClick={() => {
              if (confirm('Reset all files?')) {
                resetAllFiles();
              }
            }}
          />
          <Button
            isDisabled={status !== 'idle'}
            label="Run"
            size="xs"
            variant="secondary"
            onClick={runTests}
          />
          <Button
            isDisabled={status !== 'idle'}
            label="Submit"
            size="xs"
            variant="primary"
            onClick={submit}
          />
        </div>
      </div>
    </div>
  );
}

export default function JavaScriptCodingWorkspace({
  defaultFiles,
  defaultLanguage,
  skeleton,
  solution,
  workspace,
}: Readonly<{
  defaultFiles: Record<string, string>;
  defaultLanguage: JavaScriptCodingLanguage;
  skeleton: JavaScriptCodingSkeleton;
  solution: string;
  workspace: JavaScriptCodingWorkspaceConfig;
}>) {
  const { sandpack } = useSandpack();

  const { activeFile, visibleFiles } = sandpack;

  const defaultLayout = getJavaScriptCodingWorkspaceLayout(
    activeFile,
    visibleFiles,
  );

  return (
    <TilesProvider defaultValue={defaultLayout}>
      <CodingWorkspaceProvider
        value={{
          defaultFiles,
        }}>
        <JavaScriptCodingWorkspaceContextProvider
          skeleton={skeleton}
          workspace={workspace}>
          <JavaScriptCodingWorkspaceImpl
            defaultLanguage={defaultLanguage}
            solution={solution}
          />
        </JavaScriptCodingWorkspaceContextProvider>
      </CodingWorkspaceProvider>
    </TilesProvider>
  );
}
