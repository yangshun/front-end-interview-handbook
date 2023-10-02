import clsx from 'clsx';
import { useCallback, useState } from 'react';

import type {
  QuestionCodingWorkingLanguage,
  QuestionJavaScriptSkeleton,
  QuestionJavaScript,
  QuestionJavaScriptWorkspace,
  QuestionMetadata,
} from '~/components/questions/common/QuestionsTypes';
import useQuestionLogEventCopyContents from '~/components/questions/common/useQuestionLogEventCopyContents';
import QuestionContentProse from '~/components/questions/content/QuestionContentProse';
import QuestionContentsJavaScriptTestsCode from '~/components/questions/content/QuestionContentsJavaScriptTestsCode';
import { deleteLocalJavaScriptQuestionCode } from '~/components/questions/editor/JavaScriptQuestionCodeStorage';

import { TilesPanelRoot } from '~/react-tiling/components/TilesPanelRoot';
import { TilesProvider } from '~/react-tiling/state/TilesProvider';

import JavaScriptCodingWorkspaceBottomBar from './JavaScriptCodingWorkspaceBottomBar';
import JavaScriptCodingWorkspaceCodeEditor from './JavaScriptCodingWorkspaceCodeEditor';
import {
  JavaScriptCodingWorkspaceContextProvider,
  useJavaScriptCodingWorkspaceContext,
} from './JavaScriptCodingWorkspaceContext';
import JavaScriptCodingWorkspaceDescription from './JavaScriptCodingWorkspaceDescription';
import { getJavaScriptCodingWorkspaceLayoutTwoColumns } from './JavaScriptCodingWorkspaceLayouts';
import JavaScriptCodingWorkspaceNewTab from './JavaScriptCodingWorkspaceNewTab';
import JavaScriptCodingWorkspaceTestsRunTab from './JavaScriptCodingWorkspaceRunTab';
import JavaScriptCodingWorkspaceTestsSubmitTab from './JavaScriptCodingWorkspaceSubmitTab';
import type {
  JavaScriptCodingWorkspacePredefinedTabsContents,
  JavaScriptCodingWorkspaceTabsType,
} from './JavaScriptCodingWorkspaceTypes';
import { codingFilesShouldUseTypeScript } from '../codingFilesShouldUseTypeScript';
import type { CodingWorkspaceTabContents } from '../CodingWorkspaceContext';
import { CodingWorkspaceProvider } from '../CodingWorkspaceContext';
import { CodingWorkspaceTabIcons } from '../CodingWorkspaceTabIcons';
import CodingWorkspaceConsole from '../common/console/CodingWorkspaceConsole';
import useMonacoEditorModels from '../common/editor/useMonacoEditorModels';
import useMonacoLanguagesFetchTypeDeclarations from '../common/editor/useMonacoLanguagesFetchTypeDeclarations';
import useMonacoLanguagesLoadTSConfig from '../common/editor/useMonacoLanguagesLoadTSConfig';
import useMonacoLanguagesTypeScriptRunDiagnostics from '../common/editor/useMonacoLanguagesTypeScriptRunDiagnostics';
import { codingWorkspaceTabFileId } from '../common/tabs/codingWorkspaceTabId';
import useRestartSandpack from '../useRestartSandpack';

import { useSandpack } from '@codesandbox/sandpack-react';
import { useMonaco } from '@monaco-editor/react';

const JavaScriptCodingWorkspaceTilesPanelRoot =
  TilesPanelRoot<JavaScriptCodingWorkspaceTabsType>;

function JavaScriptCodingWorkspaceImpl({
  canViewPremiumContent,
  description,
  nextQuestions,
  similarQuestions,
  metadata,
  solution,
  embed,
}: Readonly<{
  canViewPremiumContent: boolean;
  description: string | null;
  embed: boolean;
  metadata: QuestionMetadata;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
  solution: string | null;
}>) {
  const copyRef = useQuestionLogEventCopyContents<HTMLDivElement>();

  const { sandpack } = useSandpack();
  const { files } = sandpack;

  useRestartSandpack();

  const { language } = useJavaScriptCodingWorkspaceContext();

  const shouldUseTypeScript = codingFilesShouldUseTypeScript(
    Object.keys(files),
  );
  const { workspace } = useJavaScriptCodingWorkspaceContext();

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
        <JavaScriptCodingWorkspaceCodeEditor filePath={workspace.run} />
      ),
      icon: CodingWorkspaceTabIcons.test_cases.icon,
      label: 'Test cases',
    },
  });

  return (
    <div ref={copyRef} className="flex h-full w-full flex-col text-sm">
      <div className="flex grow overflow-x-auto">
        <div
          className={clsx('flex w-full grow px-3', !embed && 'min-w-[1024px]')}>
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
      {!embed && (
        <JavaScriptCodingWorkspaceBottomBar
          metadata={metadata}
          nextQuestions={nextQuestions}
        />
      )}
    </div>
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
  const { description, metadata, solution } = question;
  const { sandpack } = useSandpack();

  const { activeFile, visibleFiles, updateFile } = sandpack;

  const defaultLayout = getJavaScriptCodingWorkspaceLayoutTwoColumns(
    activeFile,
    visibleFiles,
  );

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
    <TilesProvider defaultValue={defaultLayout}>
      <CodingWorkspaceProvider
        loadedFilesFromLocalStorage={loadedFilesFromLocalStorage}
        value={{
          defaultFiles,
          deleteCodeFromLocalStorage,
          question,
          resetToDefaultCode,
        }}>
        <JavaScriptCodingWorkspaceContextProvider
          language={language}
          metadata={metadata}
          skeleton={skeleton}
          workspace={workspace}
          onLanguageChange={onLanguageChange}>
          <JavaScriptCodingWorkspaceImpl
            canViewPremiumContent={canViewPremiumContent}
            description={description}
            embed={embed}
            metadata={metadata}
            nextQuestions={nextQuestions}
            similarQuestions={similarQuestions}
            solution={solution}
          />
        </JavaScriptCodingWorkspaceContextProvider>
      </CodingWorkspaceProvider>
    </TilesProvider>
  );
}
