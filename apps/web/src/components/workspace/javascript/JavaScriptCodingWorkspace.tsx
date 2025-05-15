'use client';

import { useSandpack } from '@codesandbox/sandpack-react';
import { useMonaco } from '@monaco-editor/react';
import clsx from 'clsx';
import { useCallback, useState } from 'react';
import { RiCodeLine } from 'react-icons/ri';

import type {
  InterviewsQuestionItemJavaScript,
  InterviewsQuestionItemMinimal,
  QuestionCodingWorkingLanguage,
  QuestionJavaScriptSkeleton,
  QuestionJavaScriptWorkspace,
} from '~/components/interviews/questions/common/QuestionsTypes';
import useQuestionsAutoMarkAsComplete from '~/components/interviews/questions/common/useQuestionsAutoMarkAsComplete';
import { useIntl } from '~/components/intl';
import SponsorsAdFormatInContentContainer from '~/components/sponsors/ads/SponsorsAdFormatInContentContainer';
import Divider from '~/components/ui/Divider';
import { deleteLocalJavaScriptQuestionCode } from '~/components/workspace/javascript/JavaScriptCodingWorkspaceCodeStorage';
import JavaScriptCodingWorkspaceTestsCode from '~/components/workspace/javascript/JavaScriptCodingWorkspaceTestsCode';

import { TilesPanelRoot } from '~/react-tiling/components/TilesPanelRoot';
import { TilesProvider } from '~/react-tiling/state/TilesProvider';

import InterviewsPremiumBadge from '../../interviews/common/InterviewsPremiumBadge';
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
  nextQuestions: ReadonlyArray<InterviewsQuestionItemMinimal>;
  onLanguageChange: (newLanguage: QuestionCodingWorkingLanguage) => void;
  question: InterviewsQuestionItemJavaScript;
  similarQuestions: ReadonlyArray<InterviewsQuestionItemMinimal>;
  skeleton: QuestionJavaScriptSkeleton;
  studyListKey?: string;
  workspace: QuestionJavaScriptWorkspace;
}>) {
  const intl = useIntl();
  const { description, metadata, solution, info } = question;
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
            info={info}
            submissionId={submissionId}
          />
        ),
        icon: RiCodeLine,
        label: intl.formatMessage({
          defaultMessage: 'Submission',
          description: 'Coding workspace submission tab label',
          id: 'aPrOAu',
        }),
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
        label: intl.formatMessage({
          defaultMessage: 'Community solution',
          description: 'Coding workspace community solution tab label',
          id: 'RbINSF',
        }),
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
      label: intl.formatMessage({
        defaultMessage: 'Post solution',
        description: 'Coding workspace post solution tab label',
        id: 'q91wY2',
      }),
    },
    community_solutions: {
      contents: (
        <JavaScriptCodingWorkspaceCommunitySolutionList metadata={metadata} />
      ),
      icon: CodingWorkspaceTabIcons.community_solutions.icon,
      label: intl.formatMessage({
        defaultMessage: 'Community',
        description: 'Coding workspace community solutions tab label',
        id: 'qDIWna',
      }),
    },
    console: {
      contents: <CodingWorkspaceConsole />,
      icon: CodingWorkspaceTabIcons.console.icon,
      label: intl.formatMessage({
        defaultMessage: 'Console',
        description: 'Coding workspace console tab label',
        id: 'hWpv5f',
      }),
    },
    description: {
      contents: (
        <JavaScriptCodingWorkspaceDescription
          canViewPremiumContent={canViewPremiumContent}
          description={description}
          info={info}
          metadata={metadata}
          nextQuestions={nextQuestions}
          showAd={!embed}
          similarQuestions={similarQuestions}
          studyListKey={studyListKey}
        />
      ),
      icon: CodingWorkspaceTabIcons.description.icon,
      label: intl.formatMessage({
        defaultMessage: 'Description',
        description: 'Coding workspace description tab label',
        id: '60Qm8N',
      }),
    },
    run_tests: {
      contents: (
        <JavaScriptCodingWorkspaceTestsRunTab specPath={workspace.run} />
      ),
      icon: CodingWorkspaceTabIcons.run.icon,
      label: intl.formatMessage({
        defaultMessage: 'Run tests',
        description: 'Coding workspace run tests tab label',
        id: 'i+1FrX',
      }),
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
      label: intl.formatMessage({
        defaultMessage: 'Solution',
        description: 'Coding workspace solution tab label',
        id: 'ZquLVV',
      }),
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
      label: intl.formatMessage({
        defaultMessage: 'Submission tests',
        description: 'Coding workspace submission tests tab label',
        id: 'VArueU',
      }),
    },
    submissions: {
      contents: <JavaScriptCodingWorkspaceSubmissionList metadata={metadata} />,
      icon: CodingWorkspaceTabIcons.submissions.icon,
      label: intl.formatMessage({
        defaultMessage: 'Submissions',
        description: 'Coding workspace submissions tab label',
        id: 'H3ninu',
      }),
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
      label: intl.formatMessage({
        defaultMessage: 'Submit',
        description: 'Coding workspace submit tab label',
        id: 'DeIlcK',
      }),
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
      label: intl.formatMessage({
        defaultMessage: 'Code',
        description: 'Coding workspace code tab label',
        id: '4m+sME',
      }),
    },
    [codingWorkspaceTabFileId(workspace.run)]: {
      contents: (
        <JavaScriptCodingWorkspaceTestsEditor specPath={workspace.run} />
      ),
      icon: CodingWorkspaceTabIcons.test_cases.icon,
      label: intl.formatMessage({
        defaultMessage: 'Test cases',
        description: 'Coding workspace test cases tab label',
        id: '/dPmoS',
      }),
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
      embed={embed}
      loadedFilesFromLocalStorage={loadedFilesFromLocalStorage}
      metadata={metadata}
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
              'lg:hidden',
              'size-full min-h-[calc(100vh_-_var(--global-sticky-height))]',
            )}>
            <div className="flex grow flex-col gap-y-4">
              <JavaScriptCodingWorkspaceDescription
                canViewPremiumContent={canViewPremiumContent}
                description={description}
                info={info}
                metadata={metadata}
                nextQuestions={[]}
                showAd={!embed}
                similarQuestions={[]}
                studyListKey={studyListKey}
              />
              <JavaScriptCodingWorkspaceSolutionMobile
                canViewPremiumContent={canViewPremiumContent}
                solution={solution}
              />
              <div
                className={clsx(
                  'flex flex-col gap-y-6',
                  'px-4 pb-6',
                  'mx-auto w-full max-w-3xl',
                )}>
                <Divider />
                <SponsorsAdFormatInContentContainer
                  adPlacement="questions_js"
                  size="sm"
                />
              </div>
            </div>
            <JavaScriptCodingWorkspaceBottomBar
              layout={embed ? 'minimal' : 'full'}
              metadata={metadata}
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
                      <div className="flex size-full">
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
  nextQuestions: ReadonlyArray<InterviewsQuestionItemMinimal>;
  onLanguageChange: (newLanguage: QuestionCodingWorkingLanguage) => void;
  question: InterviewsQuestionItemJavaScript;
  similarQuestions: ReadonlyArray<InterviewsQuestionItemMinimal>;
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
