import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import { RiArrowGoBackLine, RiCodeLine } from 'react-icons/ri';

import type {
  QuestionFramework,
  QuestionMetadata,
  QuestionUserInterface,
} from '~/components/questions/common/QuestionsTypes';
import type { QuestionUserInterfaceMode } from '~/components/questions/common/QuestionUserInterfacePath';
import useQuestionLogEventCopyContents from '~/components/questions/common/useQuestionLogEventCopyContents';
import { questionUserInterfaceSolutionPath } from '~/components/questions/content/user-interface/QuestionUserInterfaceRoutes';
import Button from '~/components/ui/Button';
import EmptyState from '~/components/ui/EmptyState';
import {
  deleteLocalUserInterfaceQuestionCode,
  saveUserInterfaceQuestionCodeLocally,
} from '~/components/workspace/user-interface/UserInterfaceCodingWorkspaceCodeStorage';

import { TilesPanelRoot } from '~/react-tiling/components/TilesPanelRoot';
import { TilesProvider } from '~/react-tiling/state/TilesProvider';

import UserInterfaceCodingWorkspaceCodeEditor from './UserInterfaceCodingWorkspaceCodeEditor';
import UserInterfaceCodingWorkspaceCommunitySolutionCreateTab from './UserInterfaceCodingWorkspaceCommunitySolutionCreateTab';
import UserInterfaceCodingWorkspaceCommunitySolutionList from './UserInterfaceCodingWorkspaceCommunitySolutionList';
import UserInterfaceCodingWorkspaceFileExplorer from './UserInterfaceCodingWorkspaceExplorer';
import UserInterfaceCodingWorkspaceLayoutButton from './UserInterfaceCodingWorkspaceLayoutDialog';
import { getUserInterfaceCodingWorkspaceLayout } from './UserInterfaceCodingWorkspaceLayouts';
import UserInterfaceCodingWorkspaceNewTab from './UserInterfaceCodingWorkspaceNewTab';
import UserInterfaceCodingWorkspaceSaveButton from './UserInterfaceCodingWorkspaceSaveButton';
import UserInterfaceCodingWorkspaceSavesList from './UserInterfaceCodingWorkspaceSavesList';
import UserInterfaceCodingWorkspaceSolutionPreviewTab from './UserInterfaceCodingWorkspaceSolutionPreviewTab';
import type {
  UserInterfaceCodingWorkspacePredefinedTabsContents,
  UserInterfaceCodingWorkspaceTabsType,
} from './UserInterfaceCodingWorkspaceTypes';
import UserInterfaceCodingWorkspaceWriteup from './UserInterfaceCodingWorkspaceWriteup';
import useUserInterfaceCodingWorkspaceTilesContext from './useUserInterfaceCodingWorkspaceTilesContext';
import { codingFilesShouldUseTypeScript } from '../common/codingFilesShouldUseTypeScript';
import CodingWorkspaceBottomBar from '../common/CodingWorkspaceBottomBar';
import type { CodingWorkspaceTabContents } from '../common/CodingWorkspaceContext';
import { CodingWorkspaceProvider } from '../common/CodingWorkspaceContext';
import { codingWorkspaceExtractFileNameFromPath } from '../common/codingWorkspaceExtractFileNameFromPath';
import { CodingWorkspaceTabIcons } from '../common/CodingWorkspaceTabIcons';
import CodingWorkspaceConsole from '../common/console/CodingWorkspaceConsole';
import useMonacoEditorModels from '../common/editor/useMonacoEditorModels';
import useMonacoEditorRegisterEditorOpener from '../common/editor/useMonacoEditorRegisterEditorOpener';
import useMonacoLanguagesFetchTypeDeclarations from '../common/editor/useMonacoLanguagesFetchTypeDeclarations';
import useMonacoLanguagesJSONDefaults from '../common/editor/useMonacoLanguagesJSONDefaults';
import useMonacoLanguagesLoadTSConfig from '../common/editor/useMonacoLanguagesLoadTSConfig';
import useMonacoLanguagesTypeScriptRunDiagnostics from '../common/editor/useMonacoLanguagesTypeScriptRunDiagnostics';
import { codingWorkspaceExplorerFilePathToIcon } from '../common/explorer/codingWorkspaceExplorerFilePathToIcon';
import useRestartSandpack from '../common/sandpack/useRestartSandpack';
import {
  codingWorkspaceTabFileId,
  codingWorkspaceTabFilePattern,
} from '../common/tabs/codingWorkspaceTabId';

import type { SandpackFiles } from '@codesandbox/sandpack-react';
import { SandpackPreview, useSandpack } from '@codesandbox/sandpack-react';
import { useMonaco } from '@monaco-editor/react';
import UserInterfaceCodingWorkspaceBottomBar from './UserInterfaceCodingWorkspaceBottomBar';

const UserInterfaceCodingWorkspaceTilesPanelRoot =
  TilesPanelRoot<UserInterfaceCodingWorkspaceTabsType>;

function UserInterfaceCodingWorkspaceImpl({
  canViewPremiumContent,
  embed,
  defaultFiles,
  loadedFilesFromLocalStorage,
  mode,
  question,
  nextQuestions,
  similarQuestions,
  onFrameworkChange,
}: Readonly<{
  canViewPremiumContent: boolean;
  defaultFiles: SandpackFiles;
  embed: boolean;
  loadedFilesFromLocalStorage: boolean;
  mode: QuestionUserInterfaceMode;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  onFrameworkChange: (
    framework: QuestionFramework,
    contentType: 'description' | 'solution',
  ) => void;
  question: QuestionUserInterface;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
}>) {
  const { framework, metadata: rawMetadata, description, solution } = question;

  const metadata = {
    ...rawMetadata,
    author:
      (mode === 'practice'
        ? question.skeletonBundle.author
        : question.solutionBundle.author) ?? rawMetadata.author,
  };

  const copyRef = useQuestionLogEventCopyContents<HTMLDivElement>();
  const { dispatch, getTabById, queryTabByPattern } =
    useUserInterfaceCodingWorkspaceTilesContext();
  const { sandpack } = useSandpack();
  const { activeFile, visibleFiles, files } = sandpack;

  useRestartSandpack();
  useEffect(() => {
    if (mode === 'practice') {
      saveUserInterfaceQuestionCodeLocally(question, sandpack.files);
    }
  });

  const shouldUseTypeScript = codingFilesShouldUseTypeScript(
    Object.keys(files),
  );

  const monaco = useMonaco();

  useMonacoLanguagesJSONDefaults(monaco);
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
  useMonacoLanguagesTypeScriptRunDiagnostics(monaco, shouldUseTypeScript);

  useMonacoEditorModels(monaco, files);
  useMonacoEditorRegisterEditorOpener(
    monaco,
    (filePathToOpen: string, fromFilePath?: string) => {
      if (!files[filePathToOpen]) {
        // Non-existent file cannot be opened.
        return;
      }

      openFile(filePathToOpen, fromFilePath);
    },
  );

  useEffect(() => {
    dispatch({
      payload: {
        tabId: codingWorkspaceTabFileId(activeFile),
      },
      type: 'tab-set-active',
    });
  }, [activeFile, dispatch]);

  const deleteCodeFromLocalStorage = useCallback(() => {
    deleteLocalUserInterfaceQuestionCode(question);
  }, [question]);

  function resetToDefaultCode() {
    deleteCodeFromLocalStorage();
    sandpack.updateFile(defaultFiles);
  }

  function openFile(filePath: string, fromFilePath: string | undefined) {
    const tabIdForFile = codingWorkspaceTabFileId(filePath);

    setTabContents({
      ...tabContents,
      [tabIdForFile]: {
        contents: (
          <UserInterfaceCodingWorkspaceCodeEditor
            filePath={filePath}
            showNotSavedBanner={mode === 'solution'}
          />
        ),
        icon:
          codingWorkspaceExplorerFilePathToIcon(filePath)?.icon ?? RiCodeLine,
        label: codingWorkspaceExtractFileNameFromPath(filePath),
      },
    });

    const result = getTabById(tabIdForFile);

    // File is already open. Just have to make it active.
    if (result != null) {
      dispatch({
        payload: {
          tabId: result.tabId,
        },
        type: 'tab-set-active',
      });

      return;
    }

    if (fromFilePath != null) {
      const fromFileTab = getTabById(codingWorkspaceTabFileId(fromFilePath));

      if (fromFileTab != null) {
        // Open in the same panel as the source file.
        dispatch({
          payload: {
            newTabCloseable: true,
            newTabId: tabIdForFile,
            newTabPosition: 'after',
            panelId: fromFileTab.panelId,
            tabId: fromFileTab.tabId,
          },
          type: 'tab-open',
        });

        return;
      }
    }

    const otherCodeTabs = queryTabByPattern(codingWorkspaceTabFilePattern);

    if (otherCodeTabs.length > 0) {
      dispatch({
        payload: {
          newTabCloseable: true,
          newTabId: tabIdForFile,
          panelId: otherCodeTabs[0].panelId,
        },
        type: 'tab-open',
      });

      return;
    }

    const fileExplorerTab = getTabById('file_explorer');

    if (fileExplorerTab != null) {
      dispatch({
        payload: {
          newTabCloseable: true,
          newTabId: tabIdForFile,
          panelId: fileExplorerTab?.panelId,
        },
        type: 'tab-open',
      });
    }
  }

  const frameworkSolutionPath = questionUserInterfaceSolutionPath(
    metadata,
    framework,
  );

  const predefinedTabs: UserInterfaceCodingWorkspacePredefinedTabsContents = {
    community_solution_create: {
      contents: (
        <UserInterfaceCodingWorkspaceCommunitySolutionCreateTab
          framework={framework}
          metadata={metadata}
        />
      ),
      icon: CodingWorkspaceTabIcons.community_solution_create.icon,
      label: 'Post solution',
    },
    community_solutions: {
      contents: (
        <UserInterfaceCodingWorkspaceCommunitySolutionList
          metadata={metadata}
        />
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
        <UserInterfaceCodingWorkspaceWriteup
          canViewPremiumContent={canViewPremiumContent}
          contentType="description"
          framework={framework}
          metadata={metadata}
          mode={mode}
          nextQuestions={nextQuestions}
          similarQuestions={similarQuestions}
          writeup={description}
          onFrameworkChange={onFrameworkChange}
        />
      ),
      icon: CodingWorkspaceTabIcons.description.icon,
      label: 'Description',
    },
    file_explorer: {
      contents: <UserInterfaceCodingWorkspaceFileExplorer />,
      icon: CodingWorkspaceTabIcons.explorer.icon,
      label: 'File explorer',
    },
    preview: {
      contents: (
        <SandpackPreview
          className={
            embed
              ? 'dark:[&>.sp-preview-container]:hue-rotate-180 dark:[&>.sp-preview-container]:invert'
              : undefined
          }
          showNavigator={true}
          showOpenInCodeSandbox={false}
        />
      ),
      icon: CodingWorkspaceTabIcons.browser.icon,
      label: 'Browser',
    },
    solution: {
      contents:
        mode === 'practice' ? (
          <div className="flex w-full items-center p-2">
            <EmptyState
              action={
                <Button
                  href={frameworkSolutionPath}
                  label="Go to solution"
                  variant="secondary"
                />
              }
              icon={CodingWorkspaceTabIcons.solution.icon}
              size="sm"
              subtitle="View the full solution on a new page"
              title="Solution"
            />
          </div>
        ) : (
          <UserInterfaceCodingWorkspaceWriteup
            canViewPremiumContent={canViewPremiumContent}
            contentType="solution"
            framework={framework}
            metadata={metadata}
            mode={mode}
            nextQuestions={nextQuestions}
            similarQuestions={similarQuestions}
            writeup={solution}
            onFrameworkChange={onFrameworkChange}
          />
        ),
      icon: CodingWorkspaceTabIcons.solution.icon,
      label: 'Solution',
    },
    solution_preview: {
      contents: (
        <UserInterfaceCodingWorkspaceSolutionPreviewTab
          bundle={question.solutionBundle}
        />
      ),
      icon: CodingWorkspaceTabIcons.browser.icon,
      label: 'Solution preview',
    },
    versions: {
      contents: <UserInterfaceCodingWorkspaceSavesList metadata={metadata} />,
      icon: CodingWorkspaceTabIcons.versions.icon,
      label: 'Saved code',
    },
  };

  const [tabContents, setTabContents] = useState<
    CodingWorkspaceTabContents<UserInterfaceCodingWorkspaceTabsType>
  >({
    ...predefinedTabs,
    ...Object.fromEntries(
      visibleFiles
        .filter((filePath) => files[filePath] != null)
        .map((filePath) => [
          codingWorkspaceTabFileId(filePath),
          {
            contents: (
              <UserInterfaceCodingWorkspaceCodeEditor
                filePath={filePath}
                showNotSavedBanner={mode === 'solution'}
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

  return (
    <CodingWorkspaceProvider
      loadedFilesFromLocalStorage={loadedFilesFromLocalStorage}
      value={{
        defaultFiles,
        deleteCodeFromLocalStorage,
        openFile,
        question,
        resetToDefaultCode,
      }}>
      <div ref={copyRef} className="flex h-full w-full flex-col text-sm">
        <div className="flex grow overflow-x-auto">
          <div
            className={clsx(
              'flex w-full grow px-3',
              !embed && 'min-w-[1024px]',
            )}>
            <UserInterfaceCodingWorkspaceTilesPanelRoot
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
                  <UserInterfaceCodingWorkspaceNewTab
                    predefinedTabs={predefinedTabs}
                    onSelectTabType={(data) => {
                      if (data.type === 'code') {
                        const newTabId = codingWorkspaceTabFileId(
                          data.payload.file,
                        );

                        dispatch({
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
                                showNotSavedBanner={mode === 'solution'}
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
                )
              }
            />
          </div>
        </div>
        {!embed && (
          <UserInterfaceCodingWorkspaceBottomBar
            metadata={metadata}
            frameworkSolutionPath={frameworkSolutionPath}
            layout={embed ? 'minimal' : 'full'}
            mode={mode}
            question={question}
            nextQuestions={nextQuestions}
            resetToDefaultCode={resetToDefaultCode}
          />
        )}
      </div>
    </CodingWorkspaceProvider>
  );
}

export default function UserInterfaceCodingWorkspace({
  activeTabScrollIntoView = true,
  canViewPremiumContent,
  embed,
  defaultFiles,
  loadedFilesFromLocalStorage,
  mode,
  question,
  nextQuestions,
  similarQuestions,
  onFrameworkChange,
}: Readonly<{
  activeTabScrollIntoView?: boolean;
  canViewPremiumContent: boolean;
  defaultFiles: SandpackFiles;
  embed: boolean;
  loadedFilesFromLocalStorage: boolean;
  mode: QuestionUserInterfaceMode;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  onFrameworkChange: (
    framework: QuestionFramework,
    contentType: 'description' | 'solution',
  ) => void;
  question: QuestionUserInterface;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
}>) {
  const { sandpack } = useSandpack();
  const { activeFile, visibleFiles } = sandpack;
  const { metadata, framework } = question;

  return (
    <TilesProvider
      activeTabScrollIntoView={activeTabScrollIntoView}
      defaultValue={getUserInterfaceCodingWorkspaceLayout(
        mode,
        activeFile,
        visibleFiles,
        questionUserInterfaceSolutionPath(metadata, framework),
      )}>
      <UserInterfaceCodingWorkspaceImpl
        canViewPremiumContent={canViewPremiumContent}
        defaultFiles={defaultFiles}
        embed={embed}
        loadedFilesFromLocalStorage={loadedFilesFromLocalStorage}
        mode={mode}
        nextQuestions={nextQuestions}
        question={question}
        similarQuestions={similarQuestions}
        onFrameworkChange={onFrameworkChange}
      />
    </TilesProvider>
  );
}
