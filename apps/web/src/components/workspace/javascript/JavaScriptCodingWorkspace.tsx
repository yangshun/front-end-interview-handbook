import clsx from 'clsx';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { RiArrowGoBackLine, RiPlayLine } from 'react-icons/ri';

import QuestionReportIssueButton from '~/components/questions/common/QuestionReportIssueButton';
import type { QuestionMetadata } from '~/components/questions/common/QuestionsTypes';
import QuestionContentProse from '~/components/questions/content/QuestionContentProse';
import QuestionContentsJavaScriptTestsCode from '~/components/questions/content/QuestionContentsJavaScriptTestsCode';
import CodingWorkspaceEditorShortcutsButton from '~/components/questions/editor/CodingWorkspaceEditorShortcutsButton';
import CodingWorkspaceResetButton from '~/components/questions/editor/CodingWorkspaceResetButton';
import QuestionMetadataSection from '~/components/questions/metadata/QuestionMetadataSection';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import { themeBackgroundLayerEmphasized } from '~/components/ui/theme';
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
import CodingWorkspaceQuestionListSlideOutButton from '../common/CodingWorkspaceQuestionListSlideOutButton';
import CodingWorkspaceTimer from '../common/CodingWorkspaceTimer';
import CodingWorkspaceConsole from '../common/console/CodingWorkspaceConsole';
import useMonacoEditorModels from '../common/editor/useMonacoEditorModels';
import useMonacoLanguagesFetchTypeDeclarations from '../common/editor/useMonacoLanguagesFetchTypeDeclarations';
import useMonacoLanguagesLoadTSConfig from '../common/editor/useMonacoLanguagesLoadTSConfig';
import useMonacoLanguagesTypeScriptRunDiagnostics from '../common/editor/useMonacoLanguagesTypeScriptRunDiagnostics';
import useRestartSandpack from '../useRestartSandpack';

import { useSandpack } from '@codesandbox/sandpack-react';
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
      <div className="flex justify-end gap-x-1.5 px-1 py-1.5">
        <CodingWorkspaceEditorShortcutsButton />
        <CodingWorkspaceResetButton
          onClick={() => {
            if (!confirm('Reset code to original? Changes will be lost!')) {
              return;
            }
            resetFile(filePath);
          }}
        />
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

  return (
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
  description,
  metadata,
  solution,
}: Readonly<{
  defaultLanguage: JavaScriptCodingLanguage;
  description: string | null;
  metadata: QuestionMetadata;
  solution: string | null;
}>) {
  const isQuestionLocked = false;
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
        <div className="flex w-full flex-col">
          <div className="flex flex-col">
            <div className="flex items-center gap-x-4 p-4">
              <Heading level="heading5">{metadata.title}</Heading>
            </div>
            <div
              className={clsx(
                'flex items-center gap-x-4 p-4',
                themeBackgroundLayerEmphasized,
              )}>
              <QuestionMetadataSection metadata={metadata} />
            </div>
          </div>
          <div className="p-4">
            <QuestionContentProse
              contents={description}
              isContentsHidden={isQuestionLocked}
            />
          </div>
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
        <div className="w-full">
          <div className="p-4">
            <QuestionContentProse
              contents={solution}
              isContentsHidden={isQuestionLocked}
            />
          </div>
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
        <div className="w-full">
          <div className="p-4">
            <QuestionContentsJavaScriptTestsCode
              contents={files[workspace.submit].code}
              isContentsHidden={isQuestionLocked}
            />
          </div>
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
      <div className="flex items-center justify-between px-3 py-3">
        <div></div>
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
      <div className="flex w-full grow px-3">
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
      <div className="flex items-center justify-between px-3 py-3">
        <div className="flex items-center gap-x-2">
          <CodingWorkspaceQuestionListSlideOutButton />
          <QuestionReportIssueButton
            format="javascript"
            title={metadata.title}
          />
        </div>
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
            addonPosition="start"
            icon={RiPlayLine}
            isDisabled={status !== 'idle'}
            label="Run"
            size="xs"
            variant="secondary"
            onClick={runTests}
          />
          <Button
            addonPosition="start"
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
  description,
  metadata,
  skeleton,
  solution,
  workspace,
}: Readonly<{
  defaultFiles: Record<string, string>;
  defaultLanguage: JavaScriptCodingLanguage;
  description: string | null;
  metadata: QuestionMetadata;
  skeleton: JavaScriptCodingSkeleton;
  solution: string | null;
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
            description={description}
            metadata={metadata}
            solution={solution}
          />
        </JavaScriptCodingWorkspaceContextProvider>
      </CodingWorkspaceProvider>
    </TilesProvider>
  );
}
