'use client';

import clsx from 'clsx';
import { useCallback, useState } from 'react';
import { LuSettings2 } from 'react-icons/lu';
import { RiCodeLine } from 'react-icons/ri';
import { useMediaQuery } from 'usehooks-ts';

import InterviewsPremiumBadge from '~/components/interviews/common/InterviewsPremiumBadge';
import { useIntl } from '~/components/intl';
import CodingWorkspaceDescriptionAddOnItems from '~/components/workspace/common/CodingWorkspaceDescriptionAddOnItems';
import CodingWorkspaceDivider, {
  CodingWorkspaceDividerWrapperClassname,
} from '~/components/workspace/common/CodingWorkspaceDivider';
import CodingWorkspaceErrorBoundary from '~/components/workspace/common/CodingWorkspaceErrorBoundary';
import CodingWorkspaceConsole from '~/components/workspace/common/console/CodingWorkspaceConsole';
import type { CodingWorkspaceTabContents } from '~/components/workspace/common/context/CodingWorkspaceContext';
import CodingWorkspaceEditorShortcutsTab from '~/components/workspace/common/editor/CodingWorkspaceEditorShortcutsTab';
import useCodingWorkspaceCodeEditorCustomActions from '~/components/workspace/common/hooks/useCodingWorkspaceCodeEditorCustomActions';
import useTabletResponsiveLayout from '~/components/workspace/common/hooks/useTabletResponsiveLayout';
import {
  codingWorkspaceTabAttemptId,
  codingWorkspaceTabAttemptPattern,
  codingWorkspaceTabCommunitySolutionId,
  codingWorkspaceTabCommunitySolutionPattern,
  codingWorkspaceTabFileId,
  codingWorkspaceTabFilePattern,
} from '~/components/workspace/common/tabs/codingWorkspaceTabId';
import JavaScriptCodingWorkspaceCodeEditor from '~/components/workspace/javascript/editor/JavaScriptCodingWorkspaceCodeEditor';
import JavaScriptCodingWorkspaceNewTab from '~/components/workspace/javascript/JavaScriptCodingWorkspaceNewTab';
import JavaScriptCodingWorkspaceCommunitySolutionCreateTab from '~/components/workspace/javascript/solution/JavaScriptCodingWorkspaceCommunitySolutionCreateTab';
import JavaScriptCodingWorkspaceCommunitySolutionList from '~/components/workspace/javascript/solution/JavaScriptCodingWorkspaceCommunitySolutionList';
import JavaScriptCodingWorkspaceCommunitySolutionTab from '~/components/workspace/javascript/solution/JavaScriptCodingWorkspaceCommunitySolutionTab';
import JavaScriptCodingWorkspaceSolution from '~/components/workspace/javascript/solution/JavaScriptCodingWorkspaceSolution';
import { useJavaScriptCodingWorkspaceSelector } from '~/components/workspace/javascript/store/hooks';
import JavaScriptCodingWorkspaceTestsRunTab from '~/components/workspace/javascript/tests/JavaScriptCodingWorkspaceRunTab';
import JavaScriptCodingWorkspaceTestsSubmitTab from '~/components/workspace/javascript/tests/JavaScriptCodingWorkspaceSubmitTab';

import { TilesPanelRoot } from '~/react-tiling/components/TilesPanelRoot';

import { CodingWorkspaceTabIcons } from '../common/CodingWorkspaceTabIcons';
import useJavaScriptCodingWorkspaceTilesContext from './hooks/useJavaScriptCodingWorkspaceTilesContext';
import type { JavaScriptWorkspaceRenderProps } from './JavaScriptCodingWorkspace';
import JavaScriptCodingWorkspaceBottomBar from './JavaScriptCodingWorkspaceBottomBar';
import JavaScriptCodingWorkspaceDescription from './JavaScriptCodingWorkspaceDescription';
import type {
  JavaScriptCodingWorkspacePredefinedTabsContents,
  JavaScriptCodingWorkspaceTabsType,
} from './JavaScriptCodingWorkspaceTypes';
import {
  getJavaScriptCodingWorkspaceLayoutTablet,
  getJavaScriptCodingWorkspaceLayoutTwoColumns,
} from './layout/JavaScriptCodingWorkspaceLayouts';
import JavaScriptCodingWorkspaceSubmissionList from './submission/JavaScriptCodingWorkspaceSubmissionList';
import JavaScriptCodingWorkspaceSubmissionTab from './submission/JavaScriptCodingWorkspaceSubmissionTab';
import JavaScriptCodingWorkspaceTestsCode from './tests/JavaScriptCodingWorkspaceTestsCode';
import JavaScriptCodingWorkspaceTestsEditor from './tests/JavaScriptCodingWorkspaceTestsEditor';

const JavaScriptCodingWorkspaceTilesPanelRoot =
  TilesPanelRoot<JavaScriptCodingWorkspaceTabsType>;

type Props = JavaScriptWorkspaceRenderProps;

export default function JavaScriptCodingWorkspaceAboveMobile({
  canViewPremiumContent,
  embed,
  isUserAgentTablet,
  nextQuestions,
  question,
  similarQuestions,
  studyListKey,
}: Props) {
  const intl = useIntl();
  const isTablet = useMediaQuery('(max-width: 1023px)');
  const { description, metadata, solution, workspace } = question;
  const visibleFiles = useJavaScriptCodingWorkspaceSelector(
    (state) => state.sandpack.current.visibleFiles,
  );
  const activeFile = useJavaScriptCodingWorkspaceSelector(
    (state) => state.sandpack.current.activeFile,
  );

  const { tilesDispatch } = useJavaScriptCodingWorkspaceTilesContext();
  const editorCustomActions = useCodingWorkspaceCodeEditorCustomActions({
    openEditorShortcuts: () => {
      tilesDispatch({
        payload: {
          fallbackNeighborTabId: codingWorkspaceTabFileId(workspace.run),
          tabId: 'editor_shortcuts',
        },
        type: 'tab-set-active-otherwise-open',
      });
    },
  });

  useTabletResponsiveLayout({
    getDesktopLayout: () =>
      getJavaScriptCodingWorkspaceLayoutTwoColumns(activeFile, visibleFiles),
    getTabletLayout: () =>
      getJavaScriptCodingWorkspaceLayoutTablet(activeFile, visibleFiles),
    isUserAgentTablet,
  });

  const openSubmission = useCallback(
    (submissionId: string, submissionName: string) => {
      const tabIdForSubmission = codingWorkspaceTabAttemptId(submissionId);

      setTabContents((prev) => ({
        ...prev,
        [tabIdForSubmission]: {
          contents: (
            <JavaScriptCodingWorkspaceSubmissionTab
              submissionId={submissionId}
              submissionName={submissionName}
            />
          ),
          icon: RiCodeLine,
          label: intl.formatMessage(
            {
              defaultMessage: 'Submission ({name})',
              description: 'Coding workspace submission tab label',
              id: 'yUzfU2',
            },
            { name: submissionName },
          ),
        },
      }));

      tilesDispatch({
        payload: {
          fallbackNeighborTabId: 'description',
          tabCategoryPattern: codingWorkspaceTabAttemptPattern,
          tabId: tabIdForSubmission,
        },
        type: 'tab-set-active-otherwise-open',
      });
    },
    [tilesDispatch, intl],
  );
  const onOpenSolution = useCallback(
    (solutionId: string | null, name: string) => {
      if (solutionId) {
        openSubmission(solutionId, name);

        return;
      }
      tilesDispatch({
        payload: {
          tabId: 'solution',
        },
        type: 'tab-set-active',
      });
    },
    [tilesDispatch, openSubmission],
  );

  const openCommunitySolution = useCallback(
    (solutionId: string) => {
      const tabIdForCommunitySolution =
        codingWorkspaceTabCommunitySolutionId(solutionId);

      setTabContents((prev) => ({
        ...prev,
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
      }));

      tilesDispatch({
        payload: {
          fallbackNeighborTabId: 'community_solutions',
          tabCategoryPattern: codingWorkspaceTabCommunitySolutionPattern,
          tabId: tabIdForCommunitySolution,
        },
        type: 'tab-set-active-otherwise-open',
      });
    },
    [tilesDispatch, intl],
  );

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
        <JavaScriptCodingWorkspaceCommunitySolutionList
          metadata={metadata}
          openCommunitySolution={openCommunitySolution}
        />
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
          environment={embed ? 'embed' : 'workspace'}
          metadata={metadata}
          nextQuestions={nextQuestions}
          showAd={!embed}
          showLanguageSelector={embed}
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
    editor_shortcuts: {
      contents: <CodingWorkspaceEditorShortcutsTab />,
      icon: CodingWorkspaceTabIcons.editor_shortcuts.icon,
      label: intl.formatMessage({
        defaultMessage: 'Editor shortcuts',
        description: 'Coding workspace editor shortcuts tab label',
        id: 't7Smz8',
      }),
    },
    run_tests: {
      contents: (
        <JavaScriptCodingWorkspaceTestsRunTab
          metadata={metadata}
          specPath={workspace.run}
        />
      ),
      label: intl.formatMessage({
        defaultMessage: 'Run tests',
        description: 'Coding workspace run tests tab label',
        id: 'i+1FrX',
      }),
    },
    solution: {
      contents: (
        <JavaScriptCodingWorkspaceSolution
          canViewPremiumContent={canViewPremiumContent}
          environment={embed ? 'embed' : 'workspace'}
          metadata={metadata}
          nextQuestions={nextQuestions}
          showLanguageSelector={embed}
          similarQuestions={similarQuestions}
          solution={solution}
          studyListKey={studyListKey}
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
            <TestsCode specPath={workspace.submit} />
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
      contents: (
        <JavaScriptCodingWorkspaceSubmissionList
          metadata={metadata}
          openSubmission={openSubmission}
        />
      ),
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
        <JavaScriptCodingWorkspaceCodeEditor
          filePath={workspace.main}
          isMobile={false}
          type="coding"
          onOpenSolution={onOpenSolution}
        />
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

  // TODO(workspace): If the user somehow resize the screen to mobile screen,
  // show a UI that suggests them to switch to mobile device.
  return (
    <div className={clsx('size-full flex-col text-sm', 'flex')}>
      <div
        className={clsx(
          'flex grow flex-col overflow-x-auto',
          !embed && 'py-1.5 max-lg:pb-3',
        )}>
        <div
          className={clsx(
            'flex w-full grow px-3',
            // Added max-lg:h-[150vh] because in tablet since the tiles panel are vertically stacked
            // we need a fixed height for the tiles panel root to occupy
            !embed && 'max-lg:h-[150vh]',
          )}>
          <JavaScriptCodingWorkspaceTilesPanelRoot
            disablePointerEventsDuringResize={true}
            getCustomActionsOrComponents={(_panelId, activeTabId) => {
              if (
                activeTabId &&
                codingWorkspaceTabFilePattern.test(activeTabId)
              ) {
                return editorCustomActions;
              }

              return undefined;
            }}
            getDropdownIcon={(_panelId, activeTabId) => {
              if (
                activeTabId &&
                codingWorkspaceTabFilePattern.test(activeTabId)
              ) {
                return LuSettings2;
              }

              return undefined;
            }}
            getResizeHandlerProps={(direction) => ({
              children: <CodingWorkspaceDivider direction={direction} />,
              className: CodingWorkspaceDividerWrapperClassname(direction),
            })}
            getTabLabel={(tabId) => ({
              icon: tabContents[tabId]?.icon,
              iconSecondary: tabContents[tabId]?.iconSecondary,
              label: tabContents[tabId]?.label ?? `New tab`,
              showIcon: false,
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
        <CodingWorkspaceDescriptionAddOnItems
          adPlacement="questions_js"
          className={clsx('lg:hidden', 'space-y-3', 'px-3 pt-2')}
          contentType="description"
          metadata={metadata}
          nextQuestions={nextQuestions}
          showAd={true}
          similarQuestions={similarQuestions}
        />
      </div>
      <JavaScriptCodingWorkspaceBottomBar
        device={isUserAgentTablet || isTablet ? 'tablet' : 'desktop'}
        layout={embed ? 'minimal' : 'full'}
        metadata={metadata}
        nextQuestions={nextQuestions}
        slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE="qns_slideout"
        studyListKey={studyListKey}
      />
    </div>
  );
}

function TestsCode({ specPath }: Readonly<{ specPath: string }>) {
  const files = useJavaScriptCodingWorkspaceSelector(
    (state) => state.sandpack.current.files,
  );

  return (
    <JavaScriptCodingWorkspaceTestsCode
      contents={files[specPath]?.code ?? ''}
      specPath={specPath}
    />
  );
}
