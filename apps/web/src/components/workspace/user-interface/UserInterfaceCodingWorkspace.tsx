import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import { RiArrowGoBackLine, RiCodeLine } from 'react-icons/ri';

import FooterlessContainerHeight from '~/components/common/FooterlessContainerHeight';
import CodingPreferencesProvider from '~/components/global/CodingPreferencesProvider';
import type {
  QuestionMetadata,
  QuestionUserInterfaceV2,
} from '~/components/questions/common/QuestionsTypes';
import type { QuestionUserInterfaceMode } from '~/components/questions/common/QuestionUserInterfacePath';
import useQuestionLogEventCopyContents from '~/components/questions/common/useQuestionLogEventCopyContents';
import { questionUserInterfaceSolutionPath } from '~/components/questions/content/user-interface/QuestionUserInterfaceRoutes';
import {
  deleteLocalUserInterfaceQuestionCode,
  saveUserInterfaceQuestionCodeLocally,
} from '~/components/questions/editor/UserInterfaceQuestionCodeStorage';
import Button from '~/components/ui/Button';
import EmptyState from '~/components/ui/EmptyState';

import { TilesPanelRoot } from '~/react-tiling/components/TilesPanelRoot';
import { TilesProvider } from '~/react-tiling/state/TilesProvider';
import { useTilesContext } from '~/react-tiling/state/useTilesContext';

import UserInterfaceCodingWorkspaceCodeEditor from './UserInterfaceCodingWorkspaceCodeEditor';
import UserInterfaceCodingWorkspaceFileExplorer from './UserInterfaceCodingWorkspaceExplorer';
import UserInterfaceCodingWorkspaceLayoutButton from './UserInterfaceCodingWorkspaceLayoutButton';
import { getUserInterfaceCodingWorkspaceLayout } from './UserInterfaceCodingWorkspaceLayouts';
import UserInterfaceCodingWorkspaceNewTab from './UserInterfaceCodingWorkspaceNewTab';
import UserInterfaceCodingWorkspaceWriteup from './UserInterfaceCodingWorkspaceWriteup';
import { codingFilesShouldUseTypeScript } from '../codingFilesShouldUseTypeScript';
import type { CodingWorkspaceTabContents } from '../CodingWorkspaceContext';
import { CodingWorkspaceProvider } from '../CodingWorkspaceContext';
import { CodingWorkspaceTabIcons } from '../CodingWorkspaceTabIcons';
import CodingWorkspaceBottomBar from '../common/CodingWorkspaceBottomBar';
import { codingWorkspaceExtractFileNameFromPath } from '../common/codingWorkspaceExtractFileNameFromPath';
import CodingWorkspaceConsole from '../common/console/CodingWorkspaceConsole';
import useMonacoEditorModels from '../common/editor/useMonacoEditorModels';
import useMonacoEditorRegisterEditorOpener from '../common/editor/useMonacoEditorRegisterEditorOpener';
import useMonacoLanguagesFetchTypeDeclarations from '../common/editor/useMonacoLanguagesFetchTypeDeclarations';
import useMonacoLanguagesJSONDefaults from '../common/editor/useMonacoLanguagesJSONDefaults';
import useMonacoLanguagesLoadTSConfig from '../common/editor/useMonacoLanguagesLoadTSConfig';
import useMonacoLanguagesTypeScriptRunDiagnostics from '../common/editor/useMonacoLanguagesTypeScriptRunDiagnostics';
import { codingWorkspaceExplorerFilePathToIcon } from '../common/explorer/codingWorkspaceExplorerFilePathToIcon';
import useRestartSandpack from '../useRestartSandpack';

import type { SandpackFiles } from '@codesandbox/sandpack-react';
import { SandpackPreview, useSandpack } from '@codesandbox/sandpack-react';
import { useMonaco } from '@monaco-editor/react';

type UserInterfaceCodingWorkspaceTabsType =
  | 'code'
  | 'console'
  | 'description'
  | 'file_explorer'
  | 'preview'
  | 'solution';

export type UserInterfaceCodingWorkspacePredefinedTabsType = Exclude<
  UserInterfaceCodingWorkspaceTabsType,
  'code'
>;
export type UserInterfaceCodingWorkspacePredefinedTabsContents =
  CodingWorkspaceTabContents<UserInterfaceCodingWorkspacePredefinedTabsType>;

function UserInterfaceCodingWorkspaceImpl({
  canViewPremiumContent,
  defaultFiles,
  loadedFilesFromLocalStorage,
  mode,
  question,
  nextQuestions,
  similarQuestions,
}: Readonly<{
  canViewPremiumContent: boolean;
  defaultFiles: SandpackFiles;
  loadedFilesFromLocalStorage: boolean;
  mode: QuestionUserInterfaceMode;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  question: QuestionUserInterfaceV2;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
}>) {
  const { framework, metadata, description, solution } = question;

  const copyRef = useQuestionLogEventCopyContents<HTMLDivElement>();
  const { dispatch, getTabById, queryTabByPattern } = useTilesContext();
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
        tabId: activeFile,
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
    setTabContents({
      ...tabContents,
      [filePath]: {
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

    const result = getTabById(filePath);

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
      const fromFileTab = getTabById(fromFilePath);

      if (fromFileTab != null) {
        // Open in the same panel as the source file.
        dispatch({
          payload: {
            newTabCloseable: true,
            newTabId: filePath,
            newTabPosition: 'after',
            panelId: fromFileTab.panelId,
            tabId: fromFileTab.tabId,
          },
          type: 'tab-open',
        });

        return;
      }
    }

    const matchedTabs = queryTabByPattern(/^\//);

    if (matchedTabs.length > 0) {
      dispatch({
        payload: {
          newTabCloseable: true,
          newTabId: filePath,
          panelId: matchedTabs[0].panelId,
        },
        type: 'tab-open',
      });

      return;
    }

    dispatch({
      payload: {
        newTabCloseable: true,
        newTabId: filePath,
        // TODO: Remove hardcoding of panelId.
        panelId: 'center-column',
      },
      type: 'tab-open',
    });
  }

  const frameworkSolutionPath = questionUserInterfaceSolutionPath(
    metadata,
    framework,
  );

  const predefinedTabs: UserInterfaceCodingWorkspacePredefinedTabsContents = {
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
        <SandpackPreview showNavigator={true} showOpenInCodeSandbox={false} />
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
          />
        ),
      icon: CodingWorkspaceTabIcons.solution.icon,
      label: 'Solution',
    },
  };

  const [tabContents, setTabContents] = useState<CodingWorkspaceTabContents>({
    ...predefinedTabs,
    ...Object.fromEntries(
      visibleFiles.map((filePath) => [
        filePath,
        {
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
      <div
        ref={copyRef}
        className="flex h-full w-full flex-col pt-3 text-sm"
        style={{ height: FooterlessContainerHeight }}>
        <div className="flex grow overflow-x-auto">
          <div className="flex w-full min-w-[1024px] grow px-3">
            <TilesPanelRoot
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
                    {tabContents[tabId].contents}
                  </div>
                ) : (
                  <UserInterfaceCodingWorkspaceNewTab
                    predefinedTabs={predefinedTabs}
                    onSelectTabType={(data) => {
                      if (data.type === 'code') {
                        const newTabId = data.payload.file;

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
        <CodingWorkspaceBottomBar
          leftElements={
            <>
              <div className="hidden md:inline">
                <UserInterfaceCodingWorkspaceLayoutButton
                  frameworkSolutionPath={frameworkSolutionPath}
                  mode={mode}
                />
              </div>
              <Button
                addonPosition="start"
                icon={RiArrowGoBackLine}
                label="Reset question"
                size="xs"
                variant="secondary"
                onClick={() => {
                  if (confirm('Reset to initial code?')) {
                    resetToDefaultCode();
                  }
                }}
              />
            </>
          }
          metadata={metadata}
          nextQuestions={nextQuestions}
        />
      </div>
    </CodingWorkspaceProvider>
  );
}

export default function UserInterfaceCodingWorkspace({
  canViewPremiumContent,
  defaultFiles,
  loadedFilesFromLocalStorage,
  mode,
  question,
  nextQuestions,
  similarQuestions,
}: Readonly<{
  canViewPremiumContent: boolean;
  defaultFiles: SandpackFiles;
  loadedFilesFromLocalStorage: boolean;
  mode: QuestionUserInterfaceMode;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  question: QuestionUserInterfaceV2;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
}>) {
  const { sandpack } = useSandpack();
  const { activeFile, visibleFiles } = sandpack;
  const { metadata, framework } = question;

  return (
    <CodingPreferencesProvider>
      <TilesProvider
        defaultValue={getUserInterfaceCodingWorkspaceLayout(
          mode,
          activeFile,
          visibleFiles,
          questionUserInterfaceSolutionPath(metadata, framework),
        )}>
        <UserInterfaceCodingWorkspaceImpl
          canViewPremiumContent={canViewPremiumContent}
          defaultFiles={defaultFiles}
          loadedFilesFromLocalStorage={loadedFilesFromLocalStorage}
          mode={mode}
          nextQuestions={nextQuestions}
          question={question}
          similarQuestions={similarQuestions}
        />
      </TilesProvider>
    </CodingPreferencesProvider>
  );
}
