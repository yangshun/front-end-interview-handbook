import clsx from 'clsx';
import type { editor } from 'monaco-editor';
import { Range } from 'monaco-editor';
import { useCallback, useEffect, useState } from 'react';
import { RiCodeLine } from 'react-icons/ri';

import type {
  QuestionCodingWorkingLanguage,
  QuestionJavaScript,
  QuestionJavaScriptSkeleton,
  QuestionJavaScriptWorkspace,
  QuestionMetadata,
} from '~/components/questions/common/QuestionsTypes';
import useQuestionLogEventCopyContents from '~/components/questions/common/useQuestionLogEventCopyContents';
import JavaScriptSelfTestCodesEmitter from '~/components/questions/content/JavaScriptSelfTestCodesEmitter';
import QuestionContentProse from '~/components/questions/content/QuestionContentProse';
import QuestionContentsJavaScriptTestsCode from '~/components/questions/content/QuestionContentsJavaScriptTestsCode';
import { deleteLocalJavaScriptQuestionCode } from '~/components/questions/editor/JavaScriptQuestionCodeStorage';

import { TilesPanelRoot } from '~/react-tiling/components/TilesPanelRoot';
import { TilesProvider } from '~/react-tiling/state/TilesProvider';

import JavaScriptCodingWorkspaceBottomBar from './JavaScriptCodingWorkspaceBottomBar';
import JavaScriptCodingWorkspaceCodeEditor from './JavaScriptCodingWorkspaceCodeEditor';
import { JavaScriptCodingWorkspaceContextProvider } from './JavaScriptCodingWorkspaceContext';
import JavaScriptCodingWorkspaceDescription from './JavaScriptCodingWorkspaceDescription';
import { getJavaScriptCodingWorkspaceLayoutTwoColumns } from './JavaScriptCodingWorkspaceLayouts';
import JavaScriptCodingWorkspaceNewTab from './JavaScriptCodingWorkspaceNewTab';
import JavaScriptCodingWorkspaceTestsRunTab from './JavaScriptCodingWorkspaceRunTab';
import JavaScriptCodingWorkspaceSubmissionList from './JavaScriptCodingWorkspaceSubmissionList';
import JavaScriptCodingWorkspaceSubmissionTab from './JavaScriptCodingWorkspaceSubmissionTab';
import JavaScriptCodingWorkspaceTestsSubmitTab from './JavaScriptCodingWorkspaceSubmitTab';
import type {
  JavaScriptCodingWorkspacePredefinedTabsContents,
  JavaScriptCodingWorkspaceTabsType,
} from './JavaScriptCodingWorkspaceTypes';
import useJavaScriptCodingWorkspaceTilesContext from './useJavaScriptCodingWorkspaceTilesContext';
import { codingFilesShouldUseTypeScript } from '../codingFilesShouldUseTypeScript';
import type { CodingWorkspaceTabContents } from '../CodingWorkspaceContext';
import { CodingWorkspaceProvider } from '../CodingWorkspaceContext';
import { CodingWorkspaceTabIcons } from '../CodingWorkspaceTabIcons';
import CodingWorkspaceConsole from '../common/console/CodingWorkspaceConsole';
import useMonacoEditorModels from '../common/editor/useMonacoEditorModels';
import useMonacoLanguagesFetchTypeDeclarations from '../common/editor/useMonacoLanguagesFetchTypeDeclarations';
import useMonacoLanguagesLoadTSConfig from '../common/editor/useMonacoLanguagesLoadTSConfig';
import useMonacoLanguagesTypeScriptRunDiagnostics from '../common/editor/useMonacoLanguagesTypeScriptRunDiagnostics';
import {
  codingWorkspaceTabFileId,
  codingWorkspaceTabSubmissionId,
  codingWorkspaceTabSubmissionPattern,
} from '../common/tabs/codingWorkspaceTabId';
import useRestartSandpack from '../useRestartSandpack';

import { useSandpack } from '@codesandbox/sandpack-react';
import { useMonaco } from '@monaco-editor/react';

const JavaScriptCodingWorkspaceTilesPanelRoot =
  TilesPanelRoot<JavaScriptCodingWorkspaceTabsType>;

function JavaScriptCodingWorkspaceImpl({
  canViewPremiumContent,
  defaultFiles,
  embed,
  loadedFilesFromLocalStorage,
  nextQuestions,
  language,
  onLanguageChange,
  similarQuestions,
  question,
  skeleton,
  workspace,
}: Readonly<{
  canViewPremiumContent: boolean;
  defaultFiles: Record<string, string>;
  embed: boolean;
  language: QuestionCodingWorkingLanguage;
  loadedFilesFromLocalStorage: boolean;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  onLanguageChange: (newLanguage: QuestionCodingWorkingLanguage) => void;
  question: QuestionJavaScript;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
  skeleton: QuestionJavaScriptSkeleton;
  workspace: QuestionJavaScriptWorkspace;
}>) {
  const { description, metadata, solution } = question;
  const { dispatch, getTabById, queryTabByPattern } =
    useJavaScriptCodingWorkspaceTilesContext();

  const copyRef = useQuestionLogEventCopyContents<HTMLDivElement>();

  const { sandpack } = useSandpack();
  const { files, updateFile } = sandpack;

  useRestartSandpack();

  const shouldUseTypeScript = codingFilesShouldUseTypeScript(
    Object.keys(files),
  );

  const monaco = useMonaco();
  const [selfTestMonacoEditor, setSelfTestMonacoEditor] =
    useState<editor.IStandaloneCodeEditor>();

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

  useEffect(() => {
    JavaScriptSelfTestCodesEmitter.on(
      'focus_on_test',
      ({ index, path: fullPath }) => {
        if (!selfTestMonacoEditor) {
          return;
        }

        const path = fullPath.slice(0, index + 1);
        const parentPath = path.slice(0, path.length - 1);
        const testName = path[path.length - 1];
        const sep = '[\\s\\S\\n\\r]*?';
        const regex = `${parentPath.join(sep)}${sep}(${testName})`;

        const match = selfTestMonacoEditor
          ?.getModel()
          ?.findNextMatch(
            regex,
            { column: 1, lineNumber: 1 },
            true,
            true,
            null,
            true,
          );

        if (!match) {
          return;
        }

        const endPosition = match.range.getEndPosition().delta(0, 1);
        const startPosition = endPosition.delta(0, -(testName.length + 2));

        const range = Range.fromPositions(startPosition, endPosition);

        selfTestMonacoEditor.revealRangeNearTopIfOutsideViewport(range);

        const collection = selfTestMonacoEditor.createDecorationsCollection([
          {
            options: {
              inlineClassName: 'bg-amber-300',
            },
            range,
          },
        ]);

        setTimeout(() => {
          collection.clear();
        }, 1000);
      },
    );

    return () => JavaScriptSelfTestCodesEmitter.off('focus_on_test');
  }, [selfTestMonacoEditor]);

  function openSubmission(submissionId: string) {
    const tabIdForSubmission = codingWorkspaceTabSubmissionId(submissionId);

    setTabContents({
      ...tabContents,
      [tabIdForSubmission]: {
        contents: (
          <JavaScriptCodingWorkspaceSubmissionTab
            metadata={metadata}
            submissionId={submissionId}
          />
        ),
        icon: RiCodeLine,
        label: 'Submission',
      },
    });

    const result = getTabById(tabIdForSubmission);

    // Submission is already open. Just have to make it active.
    if (result != null) {
      dispatch({
        payload: {
          tabId: result.tabId,
        },
        type: 'tab-set-active',
      });

      return;
    }

    const otherSubmissionTabs = queryTabByPattern(
      codingWorkspaceTabSubmissionPattern,
    );

    if (otherSubmissionTabs.length > 0) {
      dispatch({
        payload: {
          newTabCloseable: true,
          newTabId: tabIdForSubmission,
          panelId: otherSubmissionTabs[0].panelId,
        },
        type: 'tab-open',
      });

      return;
    }

    const descriptionTab = getTabById('description');

    if (descriptionTab != null) {
      dispatch({
        payload: {
          newTabCloseable: true,
          newTabId: tabIdForSubmission,
          panelId: descriptionTab?.panelId,
        },
        type: 'tab-open',
      });
    }
  }

  const predefinedTabs: JavaScriptCodingWorkspacePredefinedTabsContents = {
    console: {
      contents: <CodingWorkspaceConsole />,
      icon: CodingWorkspaceTabIcons.console.icon,
      label: 'Console',
    },
    description: {
      contents: (
        <JavaScriptCodingWorkspaceDescription
          canViewPremiumContent={canViewPremiumContent}
          description={description}
          metadata={metadata}
          nextQuestions={nextQuestions}
          similarQuestions={similarQuestions}
        />
      ),
      icon: CodingWorkspaceTabIcons.description.icon,
      label: 'Description',
    },
    run_tests: {
      contents: (
        <JavaScriptCodingWorkspaceTestsRunTab specPath={workspace.run} />
      ),
      icon: CodingWorkspaceTabIcons.run.icon,
      label: 'Run tests',
    },
    solution: {
      contents: (
        <div className="w-full">
          <div className="mx-auto max-w-3xl p-4">
            <QuestionContentProse contents={solution} />
          </div>
        </div>
      ),
      icon: CodingWorkspaceTabIcons.solution.icon,
      label: 'Solution',
    },
    submissions: {
      contents: <JavaScriptCodingWorkspaceSubmissionList metadata={metadata} />,
      icon: CodingWorkspaceTabIcons.submissions.icon,
      label: 'Submissions',
    },
    submit: {
      contents: (
        <JavaScriptCodingWorkspaceTestsSubmitTab
          metadata={metadata}
          specPath={workspace.submit}
        />
      ),
      icon: CodingWorkspaceTabIcons.submit.icon,
      label: 'Submit',
    },
    test_cases: {
      contents: (
        <div className="w-full">
          <div className="mx-auto max-w-3xl p-4">
            <QuestionContentsJavaScriptTestsCode
              contents={files[workspace.submit].code}
            />
          </div>
        </div>
      ),
      icon: CodingWorkspaceTabIcons.test_cases_all.icon,
      label: 'Submission tests',
    },
  };

  const [tabContents, setTabContents] = useState<
    CodingWorkspaceTabContents<JavaScriptCodingWorkspaceTabsType>
  >({
    ...predefinedTabs,
    [codingWorkspaceTabFileId(workspace.main)]: {
      contents: (
        <JavaScriptCodingWorkspaceCodeEditor filePath={workspace.main} />
      ),
      icon: CodingWorkspaceTabIcons.code.icon,
      label: 'Code',
    },
    [codingWorkspaceTabFileId(workspace.run)]: {
      contents: (
        <JavaScriptCodingWorkspaceCodeEditor
          filePath={workspace.run}
          onMount={setSelfTestMonacoEditor}
        />
      ),
      icon: CodingWorkspaceTabIcons.test_cases.icon,
      label: 'Test cases',
    },
  });

  const deleteCodeFromLocalStorage = useCallback(() => {
    deleteLocalJavaScriptQuestionCode(metadata, language);
  }, [language, metadata]);

  const resetToDefaultCode = useCallback(() => {
    deleteCodeFromLocalStorage();
    updateFile(defaultFiles);
    updateFile(workspace.main, skeleton[language]);
  }, [
    defaultFiles,
    deleteCodeFromLocalStorage,
    language,
    skeleton,
    updateFile,
    workspace.main,
  ]);

  return (
    <CodingWorkspaceProvider
      loadedFilesFromLocalStorage={loadedFilesFromLocalStorage}
      value={{
        defaultFiles,
        deleteCodeFromLocalStorage,
        openSubmission,
        question,
        resetToDefaultCode,
      }}>
      <JavaScriptCodingWorkspaceContextProvider
        language={language}
        metadata={metadata}
        skeleton={skeleton}
        workspace={workspace}
        onLanguageChange={onLanguageChange}>
        <div ref={copyRef} className="flex h-full w-full flex-col text-sm">
          <div className="flex grow overflow-x-auto">
            <div
              className={clsx(
                'flex w-full grow px-3',
                !embed && 'min-w-[1024px]',
              )}>
              <JavaScriptCodingWorkspaceTilesPanelRoot
                disablePointerEventsDuringResize={true}
                getResizeHandlerProps={(direction) => ({
                  children: (
                    <div
                      className={clsx(
                        'transition-color group-hover:bg-brand absolute rounded-full ease-in-out',
                        direction === 'horizontal' && 'inset-x-0 inset-y-1',
                        direction === 'vertical' && 'inset-x-1 inset-y-0',
                      )}
                    />
                  ),
                  className: clsx(
                    'relative bg-transparent group',
                    direction === 'horizontal' && 'h-3',
                    direction === 'vertical' && 'w-3',
                  ),
                })}
                getTabLabel={(tabId) => ({
                  icon: tabContents[tabId]?.icon,
                  label: tabContents[tabId]?.label ?? `New tab`,
                })}
                renderTab={(tabId) =>
                  tabContents[tabId] != null ? (
                    <div className="flex h-full w-full">
                      {tabContents[tabId]!.contents}
                    </div>
                  ) : (
                    <JavaScriptCodingWorkspaceNewTab
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
          </div>
          <JavaScriptCodingWorkspaceBottomBar
            metadata={metadata}
            mode={embed ? 'minimal' : 'full'}
            nextQuestions={nextQuestions}
          />
        </div>
      </JavaScriptCodingWorkspaceContextProvider>
    </CodingWorkspaceProvider>
  );
}

export default function JavaScriptCodingWorkspace({
  canViewPremiumContent,
  defaultFiles,
  loadedFilesFromLocalStorage,
  nextQuestions,
  question,
  similarQuestions,
  skeleton,
  workspace,
  embed,
  language,
  onLanguageChange,
}: Readonly<{
  canViewPremiumContent: boolean;
  defaultFiles: Record<string, string>;
  embed: boolean;
  language: QuestionCodingWorkingLanguage;
  loadedFilesFromLocalStorage: boolean;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  onLanguageChange: (newLanguage: QuestionCodingWorkingLanguage) => void;
  question: QuestionJavaScript;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
  skeleton: QuestionJavaScriptSkeleton;
  workspace: QuestionJavaScriptWorkspace;
}>) {
  const { sandpack } = useSandpack();

  const { activeFile, visibleFiles } = sandpack;

  const defaultLayout = getJavaScriptCodingWorkspaceLayoutTwoColumns(
    activeFile,
    visibleFiles,
  );

  return (
    <TilesProvider defaultValue={defaultLayout}>
      <JavaScriptCodingWorkspaceImpl
        canViewPremiumContent={canViewPremiumContent}
        defaultFiles={defaultFiles}
        embed={embed}
        language={language}
        loadedFilesFromLocalStorage={loadedFilesFromLocalStorage}
        nextQuestions={nextQuestions}
        question={question}
        similarQuestions={similarQuestions}
        skeleton={skeleton}
        workspace={workspace}
        onLanguageChange={onLanguageChange}
      />
    </TilesProvider>
  );
}
