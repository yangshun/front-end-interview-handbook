import clsx from 'clsx';
import { useCallback, useState } from 'react';
import { RiCodeLine } from 'react-icons/ri';

import type {
  QuestionCodingWorkingLanguage,
  QuestionJavaScript,
  QuestionJavaScriptSkeleton,
  QuestionJavaScriptWorkspace,
  QuestionMetadata,
} from '~/components/interviews/questions/common/QuestionsTypes';
import useQuestionsAutoMarkAsComplete from '~/components/interviews/questions/common/useQuestionsAutoMarkAsComplete';
import SponsorsAdFormatInContentContainer from '~/components/sponsors/ads/SponsorsAdFormatInContentContainer';
import Divider from '~/components/ui/Divider';
import { deleteLocalJavaScriptQuestionCode } from '~/components/workspace/javascript/JavaScriptCodingWorkspaceCodeStorage';
import JavaScriptCodingWorkspaceTestsCode from '~/components/workspace/javascript/JavaScriptCodingWorkspaceTestsCode';

import { TilesPanelRoot } from '~/react-tiling/components/TilesPanelRoot';
import { TilesProvider } from '~/react-tiling/state/TilesProvider';

import JavaScriptCodingWorkspaceBottomBar from './JavaScriptCodingWorkspaceBottomBar';
import JavaScriptCodingWorkspaceCodeEditor from './JavaScriptCodingWorkspaceCodeEditor';
import JavaScriptCodingWorkspaceCommunitySolutionCreateTab from './JavaScriptCodingWorkspaceCommunitySolutionCreateTab';
import JavaScriptCodingWorkspaceCommunitySolutionList from './JavaScriptCodingWorkspaceCommunitySolutionList';
import JavaScriptCodingWorkspaceCommunitySolutionTab from './JavaScriptCodingWorkspaceCommunitySolutionTab';
import { JavaScriptCodingWorkspaceContextProvider } from './JavaScriptCodingWorkspaceContext';
import JavaScriptCodingWorkspaceDescription from './JavaScriptCodingWorkspaceDescription';
import { getJavaScriptCodingWorkspaceLayoutTwoColumns } from './JavaScriptCodingWorkspaceLayouts';
import JavaScriptCodingWorkspaceNewTab from './JavaScriptCodingWorkspaceNewTab';
import JavaScriptCodingWorkspaceTestsRunTab from './JavaScriptCodingWorkspaceRunTab';
import JavaScriptCodingWorkspaceSolutionMobile from './JavaScriptCodingWorkspaceSolutionMobile';
import JavaScriptCodingWorkspaceSolutionTab from './JavaScriptCodingWorkspaceSolutionTab';
import JavaScriptCodingWorkspaceSubmissionList from './JavaScriptCodingWorkspaceSubmissionList';
import JavaScriptCodingWorkspaceSubmissionTab from './JavaScriptCodingWorkspaceSubmissionTab';
import JavaScriptCodingWorkspaceTestsSubmitTab from './JavaScriptCodingWorkspaceSubmitTab';
import JavaScriptCodingWorkspaceTestsEditor from './JavaScriptCodingWorkspaceTestsEditor';
import type {
  JavaScriptCodingWorkspacePredefinedTabsContents,
  JavaScriptCodingWorkspaceTabsType,
} from './JavaScriptCodingWorkspaceTypes';
import useJavaScriptCodingWorkspaceTilesContext from './useJavaScriptCodingWorkspaceTilesContext';
import { codingFilesShouldUseTypeScript } from '../common/codingFilesShouldUseTypeScript';
import type { CodingWorkspaceTabContents } from '../common/CodingWorkspaceContext';
import { CodingWorkspaceProvider } from '../common/CodingWorkspaceContext';
import CodingWorkspaceDivider, {
  CodingWorkspaceDividerWrapperClassname,
} from '../common/CodingWorkspaceDivider';
import CodingWorkspaceErrorBoundary from '../common/CodingWorkspaceErrorBoundary';
import { CodingWorkspaceTabIcons } from '../common/CodingWorkspaceTabIcons';
import CodingWorkspaceConsole from '../common/console/CodingWorkspaceConsole';
import useMonacoEditorModels from '../common/editor/useMonacoEditorModels';
import useMonacoLanguagesFetchTypeDeclarations from '../common/editor/useMonacoLanguagesFetchTypeDeclarations';
import useMonacoLanguagesLoadTSConfig from '../common/editor/useMonacoLanguagesLoadTSConfig';
import useMonacoLanguagesTypeScriptRunDiagnostics from '../common/editor/useMonacoLanguagesTypeScriptRunDiagnostics';
import useRestartSandpack from '../common/sandpack/useRestartSandpack';
import {
  codingWorkspaceTabCommunitySolutionId,
  codingWorkspaceTabCommunitySolutionPattern,
  codingWorkspaceTabFileId,
  codingWorkspaceTabSubmissionId,
  codingWorkspaceTabSubmissionPattern,
} from '../common/tabs/codingWorkspaceTabId';
import InterviewsPremiumBadge from '../../interviews/common/InterviewsPremiumBadge';

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
  studyListKey,
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
  studyListKey?: string;
  workspace: QuestionJavaScriptWorkspace;
}>) {
  const { description, metadata, solution } = question;
  const { dispatch } = useJavaScriptCodingWorkspaceTilesContext();

  const { sandpack } = useSandpack();
  const { files, updateFile } = sandpack;

  useRestartSandpack();

  const shouldUseTypeScript = codingFilesShouldUseTypeScript(
    Object.keys(files),
  );

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

  useQuestionsAutoMarkAsComplete(metadata, studyListKey);

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

    dispatch({
      payload: {
        fallbackNeighborTabId: 'description',
        tabCategoryPattern: codingWorkspaceTabSubmissionPattern,
        tabId: tabIdForSubmission,
      },
      type: 'tab-set-active-otherwise-open',
    });
  }

  function openCommunitySolution(solutionId: string) {
    const tabIdForCommunitySolution =
      codingWorkspaceTabCommunitySolutionId(solutionId);

    setTabContents({
      ...tabContents,
      [tabIdForCommunitySolution]: {
        contents: (
          <JavaScriptCodingWorkspaceCommunitySolutionTab
            solutionId={solutionId}
          />
        ),
        icon: CodingWorkspaceTabIcons.community_solution.icon,
        label: 'Community solution',
      },
    });

    dispatch({
      payload: {
        fallbackNeighborTabId: 'community_solutions',
        tabCategoryPattern: codingWorkspaceTabCommunitySolutionPattern,
        tabId: tabIdForCommunitySolution,
      },
      type: 'tab-set-active-otherwise-open',
    });
  }

  const predefinedTabs: JavaScriptCodingWorkspacePredefinedTabsContents = {
    community_solution_create: {
      contents: (
        <JavaScriptCodingWorkspaceCommunitySolutionCreateTab
          metadata={metadata}
        />
      ),
      icon: CodingWorkspaceTabIcons.community_solution_create.icon,
      label: 'Post solution',
    },
    community_solutions: {
      contents: (
        <JavaScriptCodingWorkspaceCommunitySolutionList metadata={metadata} />
      ),
      icon: CodingWorkspaceTabIcons.community_solutions.icon,
      label: 'Community',
    },
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
          studyListKey={studyListKey}
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
        <JavaScriptCodingWorkspaceSolutionTab
          canViewPremiumContent={canViewPremiumContent}
          solution={solution}
        />
      ),
      icon:
        question.metadata.access !== 'free'
          ? () => <InterviewsPremiumBadge iconOnly={true} />
          : CodingWorkspaceTabIcons.solution.icon,
      label: 'Solution',
    },
    submission_test_cases: {
      contents: (
        <div className="w-full">
          <div className="mx-auto max-w-3xl p-4">
            <JavaScriptCodingWorkspaceTestsCode
              contents={files[workspace.submit].code}
              specPath={workspace.submit}
            />
          </div>
        </div>
      ),
      icon: CodingWorkspaceTabIcons.test_cases_all.icon,
      label: 'Submission tests',
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
          openBesideTabId={codingWorkspaceTabFileId(workspace.run)}
          specPath={workspace.submit}
          studyListKey={studyListKey}
        />
      ),
      icon: CodingWorkspaceTabIcons.submit.icon,
      label: 'Submit',
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
        <JavaScriptCodingWorkspaceTestsEditor specPath={workspace.run} />
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
        openCommunitySolution,
        openSubmission,
        resetToDefaultCode,
      }}>
      <JavaScriptCodingWorkspaceContextProvider
        language={language}
        metadata={metadata}
        skeleton={skeleton}
        workspace={workspace}
        onLanguageChange={onLanguageChange}>
        {!embed && (
          <div
            className={clsx(
              'flex flex-col',
              'size-full min-h-[calc(100vh_-_var(--global-sticky-height))] lg:hidden',
            )}>
            <div className="flex grow flex-col gap-y-6">
              <JavaScriptCodingWorkspaceDescription
                canViewPremiumContent={canViewPremiumContent}
                description={description}
                metadata={metadata}
                nextQuestions={[]}
                similarQuestions={[]}
                studyListKey={studyListKey}
              />
              <Divider />
              <JavaScriptCodingWorkspaceSolutionMobile
                canViewPremiumContent={canViewPremiumContent}
                solution={solution}
              />
              <Divider />
              <div
                className={clsx('px-3.5', 'pb-6', 'mx-auto w-full max-w-3xl')}>
                <SponsorsAdFormatInContentContainer
                  adPlacement="questions_js"
                  size="sm"
                />
              </div>
            </div>
            <JavaScriptCodingWorkspaceBottomBar
              layout={embed ? 'minimal' : 'full'}
              metadata={metadata}
              nextQuestions={nextQuestions}
              slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE="qns_slideout_mobile"
              studyListKey={studyListKey}
            />
          </div>
        )}
        <div
          className={clsx(
            'size-full flex-col text-sm',
            !embed ? 'hidden lg:flex' : 'flex',
          )}>
          <div
            className={clsx(
              'flex grow overflow-x-auto',
              !embed && 'max-lg:pb-3',
            )}>
            <div
              className={clsx(
                'flex w-full grow px-3',
                !embed && 'min-w-[1024px]',
              )}>
              <JavaScriptCodingWorkspaceTilesPanelRoot
                disablePointerEventsDuringResize={true}
                getResizeHandlerProps={(direction) => ({
                  children: <CodingWorkspaceDivider direction={direction} />,
                  className: CodingWorkspaceDividerWrapperClassname(direction),
                })}
                getTabLabel={(tabId) => ({
                  icon: tabContents[tabId]?.icon,
                  iconSecondary: tabContents[tabId]?.iconSecondary,
                  label: tabContents[tabId]?.label ?? `New tab`,
                })}
                renderTab={(tabId) => (
                  <CodingWorkspaceErrorBoundary>
                    {tabContents[tabId] != null ? (
                      <div className="size-full flex">
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
                    )}
                  </CodingWorkspaceErrorBoundary>
                )}
              />
            </div>
          </div>
          <JavaScriptCodingWorkspaceBottomBar
            layout={embed ? 'minimal' : 'full'}
            metadata={metadata}
            nextQuestions={nextQuestions}
            slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE="qns_slideout"
            studyListKey={studyListKey}
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
  studyListKey,
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
  studyListKey?: string;
  workspace: QuestionJavaScriptWorkspace;
}>) {
  const { sandpack } = useSandpack();

  const { activeFile, visibleFiles } = sandpack;

  const defaultLayout = getJavaScriptCodingWorkspaceLayoutTwoColumns(
    activeFile,
    visibleFiles,
  );

  return (
    <TilesProvider
      activeTabScrollIntoView={!embed}
      defaultValue={defaultLayout}>
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
        studyListKey={studyListKey}
        workspace={workspace}
        onLanguageChange={onLanguageChange}
      />
    </TilesProvider>
  );
}
