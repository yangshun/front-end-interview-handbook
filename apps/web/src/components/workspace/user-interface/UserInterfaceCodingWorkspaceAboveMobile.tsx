'use client';

import type { SandpackFiles } from '@codesandbox/sandpack-react';
import { useMonaco } from '@monaco-editor/react';
import clsx from 'clsx';
import { useState } from 'react';
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
import { CodingWorkspaceTabIcons } from '~/components/workspace/common/CodingWorkspaceTabIcons';
import CodingWorkspaceConsole from '~/components/workspace/common/console/CodingWorkspaceConsole';
import type { CodingWorkspaceTabContents } from '~/components/workspace/common/context/CodingWorkspaceContext';
import CodingWorkspaceEditorShortcutsTab from '~/components/workspace/common/editor/CodingWorkspaceEditorShortcutsTab';
import useMonacoEditorRegisterEditorOpener from '~/components/workspace/common/editor/useMonacoEditorRegisterEditorOpener';
import useCodingWorkspaceCodeEditorCustomActions from '~/components/workspace/common/hooks/useCodingWorkspaceCodeEditorCustomActions';
import useTabletResponsiveLayout from '~/components/workspace/common/hooks/useTabletResponsiveLayout';
import {
  codingWorkspaceTabAttemptId,
  codingWorkspaceTabAttemptPattern,
  codingWorkspaceTabFileId,
  codingWorkspaceTabFilePattern,
} from '~/components/workspace/common/tabs/codingWorkspaceTabId';
import { codingWorkspaceExtractFileNameFromPath } from '~/components/workspace/common/utils/codingWorkspaceExtractFileNameFromPath';
import useUserInterfaceCodingWorkspaceTilesContext from '~/components/workspace/user-interface/hooks/useUserInterfaceCodingWorkspaceTilesContext';
import UserInterfaceCodingWorkspaceSaveCodeTab from '~/components/workspace/user-interface/save-code/UserInterfaceCodingWorkspaceSaveCodeTab';
import UserInterfaceCodingWorkspaceSavesList from '~/components/workspace/user-interface/save-code/UserInterfaceCodingWorkspaceSavesList';
import UserInterfaceCodingWorkspaceCommunitySolutionCreateTab from '~/components/workspace/user-interface/solution/UserInterfaceCodingWorkspaceCommunitySolutionCreateTab';
import UserInterfaceCodingWorkspaceCommunitySolutionList from '~/components/workspace/user-interface/solution/UserInterfaceCodingWorkspaceCommunitySolutionList';

import { TilesPanelRoot } from '~/react-tiling/components/TilesPanelRoot';

import { codingWorkspaceExplorerFilePathToIcon } from '../common/explorer/codingWorkspaceExplorerFilePathToIcon';
import UserInterfaceCodingWorkspaceCodeEditor from './editor/UserInterfaceCodingWorkspaceCodeEditor';
import {
  getUserInterfaceCodingWorkspaceLayout,
  getUserInterfaceCodingWorkspaceLayoutMobile,
} from './layout/UserInterfaceCodingWorkspaceLayouts';
import UserInterfaceCodingWorkspacePreview from './preview/UserInterfaceCodingWorkspacePreview';
import UserInterfaceCodingWorkspaceSolutionPreviewTab from './solution/UserInterfaceCodingWorkspaceSolutionPreviewTab';
import { replaceUserInterfaceCodeEditorContents } from './store/actions';
import {
  useUserInterfaceCodingWorkspaceDispatch,
  useUserInterfaceCodingWorkspaceSelector,
} from './store/hooks';
import type { UserInterfaceWorkspaceRenderProps } from './UserInterfaceCodingWorkspace';
import UserInterfaceCodingWorkspaceBottomBar from './UserInterfaceCodingWorkspaceBottomBar';
import UserInterfaceCodingWorkspaceExplorer from './UserInterfaceCodingWorkspaceExplorer';
import UserInterfaceCodingWorkspaceNewTab from './UserInterfaceCodingWorkspaceNewTab';
import type {
  UserInterfaceCodingWorkspacePredefinedTabsContents,
  UserInterfaceCodingWorkspaceTabsType,
} from './UserInterfaceCodingWorkspaceTypes';
import UserInterfaceCodingWorkspaceWriteup from './UserInterfaceCodingWorkspaceWriteup';

const UserInterfaceCodingWorkspaceTilesPanelRoot =
  TilesPanelRoot<UserInterfaceCodingWorkspaceTabsType>;

type Props = UserInterfaceWorkspaceRenderProps;

export default function UserInterfaceCodingWorkspaceAboveMobile({
  canViewPremiumContent,
  embed,
  isUserAgentTablet,
  nextQuestions,
  similarQuestions,
  studyListKey,
  ...props
}: Props) {
  const intl = useIntl();
  const isTablet = useMediaQuery('(max-width: 1023px)');
  const { onFrameworkChange, question } = props;
  const { description, framework, metadata, solution } = question;
  const workspaceDispatch = useUserInterfaceCodingWorkspaceDispatch();
  const visibleFiles = useUserInterfaceCodingWorkspaceSelector(
    (state) => state.sandpack.current.visibleFiles,
  );
  const activeFile = useUserInterfaceCodingWorkspaceSelector(
    (state) => state.sandpack.current.activeFile,
  );
  const fileNames = useUserInterfaceCodingWorkspaceSelector(
    (state) => Object.keys(state.sandpack.current.files),
    (previousFileNames, currentFileNames) => {
      if (previousFileNames.length !== currentFileNames.length) {
        return false;
      }

      return previousFileNames.every((fileName) =>
        currentFileNames.includes(fileName),
      );
    },
  );

  const { tilesDispatch } = useUserInterfaceCodingWorkspaceTilesContext();
  const questionAuthor = question.skeletonBundle.author;
  const solutionAuthor = question.solutionBundle?.author ?? metadata.author;
  const editorCustomActions = useCodingWorkspaceCodeEditorCustomActions({
    openEditorShortcuts: () => {
      tilesDispatch({
        payload: {
          fallbackNeighborTabId: 'file_explorer',
          tabId: 'editor_shortcuts',
        },
        type: 'tab-set-active-otherwise-open',
      });
    },
  });

  const monaco = useMonaco();

  useMonacoEditorRegisterEditorOpener(
    monaco,
    (filePathToOpen: string, fromFilePath?: string) => {
      if (!fileNames.includes(filePathToOpen)) {
        // Non-existent file cannot be opened.
        return;
      }

      openFile(filePathToOpen, fromFilePath);
    },
  );

  // Responsive layout handling using shared hook
  useTabletResponsiveLayout({
    getDesktopLayout: () =>
      getUserInterfaceCodingWorkspaceLayout(activeFile, visibleFiles),
    getTabletLayout: () =>
      getUserInterfaceCodingWorkspaceLayoutMobile(activeFile, visibleFiles),
    isUserAgentTablet,
  });

  function openSavedCode(saveId: string, saveName: string) {
    const tabIdForSubmission = codingWorkspaceTabAttemptId(saveId);

    setTabContents((prev) => ({
      ...prev,
      [tabIdForSubmission]: {
        contents: (
          <UserInterfaceCodingWorkspaceSaveCodeTab
            saveId={saveId}
            onOpenSolutionInWorkspace={replaceCodeEditorContents}
          />
        ),
        label: intl.formatMessage(
          {
            defaultMessage: 'Saved code ({name})',
            description: 'Coding workspace saved code tab label',
            id: 'guixJ6',
          },
          { name: saveName },
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
  }

  function onOpenSolution(solutionId: string | null, name: string) {
    if (solutionId) {
      openSavedCode(solutionId, name);

      return;
    }
    tilesDispatch({
      payload: {
        tabId: 'solution',
      },
      type: 'tab-set-active',
    });
  }

  function createCodeEditorFileTabContent(filePath: string) {
    return {
      contents: (
        <UserInterfaceCodingWorkspaceCodeEditor
          filePath={filePath}
          replaceCodeEditorContents={replaceCodeEditorContents}
          onOpenSolution={onOpenSolution}
        />
      ),
      icon: codingWorkspaceExplorerFilePathToIcon(filePath)?.icon ?? RiCodeLine,
      label: codingWorkspaceExtractFileNameFromPath(filePath),
    };
  }

  function openFile(filePath: string, _fromFilePath: string | undefined) {
    const tabIdForFile = codingWorkspaceTabFileId(filePath);

    setTabContents((prev) => ({
      ...prev,
      [tabIdForFile]: createCodeEditorFileTabContent(filePath),
    }));

    tilesDispatch({
      payload: {
        fallbackNeighborTabId: 'file_explorer',
        tabCategoryPattern: codingWorkspaceTabFilePattern,
        tabId: tabIdForFile,
      },
      type: 'tab-set-active-otherwise-open',
    });
  }

  function closeFile(tabId: UserInterfaceCodingWorkspaceTabsType) {
    tilesDispatch({
      payload: {
        tabId,
      },
      type: 'tab-close',
    });
  }

  function changeActiveFile(tabId: UserInterfaceCodingWorkspaceTabsType) {
    tilesDispatch({
      payload: {
        tabId,
      },
      type: 'tab-set-active',
    });
  }

  function replaceCodeEditorContents(newFiles: SandpackFiles) {
    workspaceDispatch(
      replaceUserInterfaceCodeEditorContents({
        changeActiveFile,
        closeFile,
        newFiles,
        openFile: (filePath: string) => openFile(filePath, undefined),
      }),
    );
  }

  const predefinedTabs: UserInterfaceCodingWorkspacePredefinedTabsContents = {
    community_solution_create: {
      contents: (
        <UserInterfaceCodingWorkspaceCommunitySolutionCreateTab
          framework={framework}
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
        <UserInterfaceCodingWorkspaceCommunitySolutionList
          metadata={metadata}
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
        <UserInterfaceCodingWorkspaceWriteup
          canViewPremiumContent={canViewPremiumContent}
          contentType="description"
          framework={framework}
          metadata={{ ...question.metadata, author: questionAuthor }}
          nextQuestions={nextQuestions}
          showAd={!embed}
          showFrameworkSelector={embed}
          similarQuestions={similarQuestions}
          studyListKey={studyListKey}
          writeup={description}
          onFrameworkChange={onFrameworkChange}
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
    file_explorer: {
      contents: <UserInterfaceCodingWorkspaceExplorer openFile={openFile} />,
      icon: CodingWorkspaceTabIcons.explorer.icon,
      label: intl.formatMessage({
        defaultMessage: 'Files',
        description: 'Coding workspace file explorer label',
        id: 'shjtM6',
      }),
    },
    preview: {
      contents: <UserInterfaceCodingWorkspacePreview embed={embed} />,
      icon: CodingWorkspaceTabIcons.browser.icon,
      label: intl.formatMessage({
        defaultMessage: 'Browser',
        description: 'Coding workspace browser tab label',
        id: 'ZNFWBy',
      }),
    },
    solution: {
      contents: (
        <UserInterfaceCodingWorkspaceWriteup
          canViewPremiumContent={canViewPremiumContent}
          contentType="solution"
          framework={framework}
          metadata={{ ...question.metadata, author: solutionAuthor }}
          nextQuestions={nextQuestions}
          showAd={!embed}
          similarQuestions={similarQuestions}
          solutionFiles={question.solutionBundle?.files}
          studyListKey={studyListKey}
          writeup={solution}
          onFrameworkChange={onFrameworkChange}
          onOpenSolutionInWorkspace={replaceCodeEditorContents}
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
    solution_preview: {
      contents: (
        <UserInterfaceCodingWorkspaceSolutionPreviewTab
          bundle={question.solutionBundle}
        />
      ),
      icon: CodingWorkspaceTabIcons.browser.icon,
      label: intl.formatMessage({
        defaultMessage: 'Solution preview',
        description: 'Coding workspace solution preview tab label',
        id: 'sV/LsP',
      }),
    },
    versions: {
      contents: (
        <UserInterfaceCodingWorkspaceSavesList
          metadata={metadata}
          openSavedCode={openSavedCode}
        />
      ),
      icon: CodingWorkspaceTabIcons.versions.icon,
      label: intl.formatMessage({
        defaultMessage: 'Saved code',
        description: 'Coding workspace saved code tab label',
        id: '8nTsZn',
      }),
    },
  };

  const [tabContents, setTabContents] = useState<
    CodingWorkspaceTabContents<UserInterfaceCodingWorkspaceTabsType>
  >({
    ...predefinedTabs,
    ...Object.fromEntries(
      visibleFiles
        .filter((filePath) => fileNames.includes(filePath))
        .map((filePath) => [
          codingWorkspaceTabFileId(filePath),
          {
            contents: (
              <UserInterfaceCodingWorkspaceCodeEditor
                filePath={filePath}
                replaceCodeEditorContents={replaceCodeEditorContents}
                onOpenSolution={onOpenSolution}
              />
            ),
            icon:
              codingWorkspaceExplorerFilePathToIcon(filePath)?.icon ??
              RiCodeLine,
            label: codingWorkspaceExtractFileNameFromPath(filePath),
          },
        ]),
    ),
  });

  // TODO(workspace): If the user somehow resize the screen to mobile screen,
  // show a UI that suggests them to switch to mobile device.
  return (
    <div className={clsx('size-full flex-col text-sm', 'flex')}>
      <div
        className={clsx(
          'flex grow flex-col overflow-auto',
          !embed && 'py-1.5 max-lg:pb-3',
        )}>
        <div
          className={clsx(
            'flex w-full grow px-3',
            // Added max-lg:h-[150vh] because in tablet since the tiles panel are vertically stacked
            // we need a fixed height for the tiles panel root to occupy
            !embed && 'max-lg:h-[150vh]',
          )}>
          <UserInterfaceCodingWorkspaceTilesPanelRoot
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
              showIcon: tabId === 'file_explorer',
            })}
            renderTab={(tabId) => (
              <CodingWorkspaceErrorBoundary>
                {tabContents[tabId] != null ? (
                  <div className="flex size-full">
                    {tabContents[tabId]!.contents}
                  </div>
                ) : (
                  <UserInterfaceCodingWorkspaceNewTab
                    predefinedTabs={predefinedTabs}
                    onSelectTabType={(data) => {
                      if (data.type === 'code') {
                        const newTabId = codingWorkspaceTabFileId(
                          data.payload.file,
                        );

                        tilesDispatch({
                          payload: {
                            newTabId,
                            oldTabId: tabId,
                          },
                          type: 'tab-change-id',
                        });
                        setTabContents({
                          ...tabContents,
                          [newTabId]: {
                            contents: (
                              <UserInterfaceCodingWorkspaceCodeEditor
                                filePath={data.payload.file}
                                replaceCodeEditorContents={
                                  replaceCodeEditorContents
                                }
                                onOpenSolution={onOpenSolution}
                              />
                            ),
                            icon:
                              codingWorkspaceExplorerFilePathToIcon(
                                data.payload.file,
                              )?.icon ?? RiCodeLine,
                            label: codingWorkspaceExtractFileNameFromPath(
                              data.payload.file,
                            ),
                          },
                        });

                        return;
                      }

                      setTabContents({
                        ...tabContents,
                        [tabId]: { ...tabContents[data.type] },
                      });
                    }}
                  />
                )}
              </CodingWorkspaceErrorBoundary>
            )}
          />
        </div>
        <CodingWorkspaceDescriptionAddOnItems
          adPlacement="questions_ui"
          className={clsx('lg:hidden', 'space-y-3', 'px-3 pt-2')}
          nextQuestions={nextQuestions}
          showAd={true}
          similarQuestions={similarQuestions}
        />
      </div>
      {!embed && (
        <UserInterfaceCodingWorkspaceBottomBar
          device={isUserAgentTablet || isTablet ? 'tablet' : 'desktop'}
          framework={framework}
          metadata={metadata}
          nextQuestions={nextQuestions}
          question={question}
          replaceCodeEditorContents={replaceCodeEditorContents}
          slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE="qns_slideout"
          studyListKey={studyListKey}
          onFrameworkChange={onFrameworkChange}
        />
      )}
    </div>
  );
}
