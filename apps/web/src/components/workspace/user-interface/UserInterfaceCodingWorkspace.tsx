import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import { RiCodeLine } from 'react-icons/ri';

import { questionHrefWithListType } from '~/components/interviews/questions/common/questionHref';
import type {
  QuestionFramework,
  QuestionMetadata,
  QuestionUserInterface,
} from '~/components/interviews/questions/common/QuestionsTypes';
import type { QuestionUserInterfaceMode } from '~/components/interviews/questions/common/QuestionUserInterfacePath';
import useQuestionLogEventCopyContents from '~/components/interviews/questions/common/useQuestionLogEventCopyContents';
import useQuestionsAutoMarkAsComplete from '~/components/interviews/questions/common/useQuestionsAutoMarkAsComplete';
import { questionUserInterfaceSolutionPath } from '~/components/interviews/questions/content/user-interface/QuestionUserInterfaceRoutes';
import Button from '~/components/ui/Button';
import EmptyState from '~/components/ui/EmptyState';
import {
  deleteLocalUserInterfaceQuestionCode,
  saveUserInterfaceQuestionCodeLocally,
} from '~/components/workspace/user-interface/UserInterfaceCodingWorkspaceCodeStorage';

import { TilesPanelRoot } from '~/react-tiling/components/TilesPanelRoot';
import { TilesProvider } from '~/react-tiling/state/TilesProvider';

import UserInterfaceCodingWorkspaceBottomBar from './UserInterfaceCodingWorkspaceBottomBar';
import UserInterfaceCodingWorkspaceCodeEditor from './UserInterfaceCodingWorkspaceCodeEditor';
import UserInterfaceCodingWorkspaceCommunitySolutionCreateTab from './UserInterfaceCodingWorkspaceCommunitySolutionCreateTab';
import UserInterfaceCodingWorkspaceCommunitySolutionList from './UserInterfaceCodingWorkspaceCommunitySolutionList';
import UserInterfaceCodingWorkspaceExplorer from './UserInterfaceCodingWorkspaceExplorer';
import { getUserInterfaceCodingWorkspaceLayout } from './UserInterfaceCodingWorkspaceLayouts';
import UserInterfaceCodingWorkspaceMobile from './UserInterfaceCodingWorkspaceMobile';
import UserInterfaceCodingWorkspaceNewTab from './UserInterfaceCodingWorkspaceNewTab';
import UserInterfaceCodingWorkspacePreview from './UserInterfaceCodingWorkspacePreview';
import UserInterfaceCodingWorkspaceSavesList from './UserInterfaceCodingWorkspaceSavesList';
import UserInterfaceCodingWorkspaceSolutionPreviewTab from './UserInterfaceCodingWorkspaceSolutionPreviewTab';
import type {
  UserInterfaceCodingWorkspacePredefinedTabsContents,
  UserInterfaceCodingWorkspaceTabsType,
} from './UserInterfaceCodingWorkspaceTypes';
import UserInterfaceCodingWorkspaceWriteup from './UserInterfaceCodingWorkspaceWriteup';
import useUserInterfaceCodingWorkspaceTilesContext from './useUserInterfaceCodingWorkspaceTilesContext';
import { codingFilesShouldUseTypeScript } from '../common/codingFilesShouldUseTypeScript';
import type { CodingWorkspaceTabContents } from '../common/CodingWorkspaceContext';
import { CodingWorkspaceProvider } from '../common/CodingWorkspaceContext';
import CodingWorkspaceDivider, {
  CodingWorkspaceDividerWrapperClassname,
} from '../common/CodingWorkspaceDivider';
import CodingWorkspaceErrorBoundary from '../common/CodingWorkspaceErrorBoundary';
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
import useSandpackModuleErrorRefreshBrowser from '../common/sandpack/useSandpackModuleErrorRefreshBrowser';
import {
  codingWorkspaceTabFileId,
  codingWorkspaceTabFilePattern,
} from '../common/tabs/codingWorkspaceTabId';

import type { SandpackFiles } from '@codesandbox/sandpack-react';
import { useSandpack } from '@codesandbox/sandpack-react';
import { useMonaco } from '@monaco-editor/react';

const UserInterfaceCodingWorkspaceTilesPanelRoot =
  TilesPanelRoot<UserInterfaceCodingWorkspaceTabsType>;

function UserInterfaceCodingWorkspaceImpl({
  canViewPremiumContent,
  defaultFiles,
  embed,
  frameworkSolutionPath,
  loadedFilesFromLocalStorage,
  mode,
  question,
  nextQuestions,
  similarQuestions,
  onFrameworkChange,
  studyListKey,
}: Readonly<{
  canViewPremiumContent: boolean;
  defaultFiles: SandpackFiles;
  embed: boolean;
  frameworkSolutionPath: string;
  loadedFilesFromLocalStorage: boolean;
  mode: QuestionUserInterfaceMode;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  onFrameworkChange: (
    framework: QuestionFramework,
    contentType: 'description' | 'solution',
  ) => void;
  question: QuestionUserInterface;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
  studyListKey?: string;
}>) {
  const { framework, metadata: rawMetadata, description, solution } = question;

  const metadata = {
    ...rawMetadata,
    author:
      (mode === 'practice'
        ? question.skeletonBundle.author
        : question.solutionBundle?.author) ?? rawMetadata.author,
  };

  const copyRef = useQuestionLogEventCopyContents<HTMLDivElement>();
  const { dispatch } = useUserInterfaceCodingWorkspaceTilesContext();
  const { sandpack } = useSandpack();
  const { activeFile, visibleFiles, files } = sandpack;

  useRestartSandpack();
  useSandpackModuleErrorRefreshBrowser();

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

  useQuestionsAutoMarkAsComplete(metadata, studyListKey);

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

    dispatch({
      payload: {
        fallbackNeighborTabId: 'file_explorer',
        openBesideTabId:
          fromFilePath != null
            ? codingWorkspaceTabFileId(fromFilePath)
            : undefined,
        tabCategoryPattern: codingWorkspaceTabFilePattern,
        tabId: tabIdForFile,
      },
      type: 'tab-set-active-otherwise-open',
    });
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
          studyListKey={studyListKey}
          writeup={description}
          onFrameworkChange={onFrameworkChange}
        />
      ),
      icon: CodingWorkspaceTabIcons.description.icon,
      label: 'Description',
    },
    file_explorer: {
      contents: <UserInterfaceCodingWorkspaceExplorer />,
      icon: CodingWorkspaceTabIcons.explorer.icon,
      label: 'File explorer',
    },
    preview: {
      contents: <UserInterfaceCodingWorkspacePreview embed={embed} />,
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
            studyListKey={studyListKey}
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
        resetToDefaultCode,
      }}>
      {/* Mobile version */}
      {!embed && (
        <div className="size-full flex min-h-[calc(100vh_-_var(--global-sticky-height))] flex-col lg:hidden">
          <div className="flex grow flex-col gap-y-4">
            {mode === 'practice' && (
              <UserInterfaceCodingWorkspaceWriteup
                canViewPremiumContent={canViewPremiumContent}
                contentType="description"
                framework={framework}
                metadata={metadata}
                mode={mode}
                nextQuestions={[]}
                similarQuestions={[]}
                studyListKey={studyListKey}
                writeup={description}
                onFrameworkChange={onFrameworkChange}
              />
            )}
            {mode === 'solution' && (
              <UserInterfaceCodingWorkspaceWriteup
                canViewPremiumContent={canViewPremiumContent}
                contentType="solution"
                framework={framework}
                metadata={metadata}
                mode={mode}
                nextQuestions={[]}
                similarQuestions={[]}
                studyListKey={studyListKey}
                writeup={solution}
                onFrameworkChange={onFrameworkChange}
              />
            )}
            <UserInterfaceCodingWorkspaceMobile
              topAddOn={
                mode === 'practice' && (
                  <Button
                    display="block"
                    href={frameworkSolutionPath}
                    label="View solution"
                    variant="secondary"
                  />
                )
              }
            />
          </div>
          <UserInterfaceCodingWorkspaceBottomBar
            frameworkSolutionPath={frameworkSolutionPath}
            metadata={metadata}
            mode={mode}
            nextQuestions={nextQuestions}
            question={question}
            resetToDefaultCode={resetToDefaultCode}
            slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE="qns_slideout_mobile"
            studyListKey={studyListKey}
          />
        </div>
      )}
      <div
        ref={copyRef}
        className={clsx(
          'size-full flex-col text-sm',
          !embed ? 'hidden lg:flex' : 'flex',
        )}>
        <div className={clsx('flex grow overflow-x-auto', !embed && 'pb-3')}>
          <div
            className={clsx(
              'flex w-full grow px-3',
              !embed && 'min-w-[1024px]',
            )}>
            <UserInterfaceCodingWorkspaceTilesPanelRoot
              disablePointerEventsDuringResize={true}
              getResizeHandlerProps={(direction) => ({
                children: <CodingWorkspaceDivider direction={direction} />,
                className: CodingWorkspaceDividerWrapperClassname(direction),
              })}
              getTabLabel={(tabId) => ({
                icon: tabContents[tabId]?.icon,
                label: tabContents[tabId]?.label ?? `New tab`,
              })}
              renderTab={(tabId) => (
                <CodingWorkspaceErrorBoundary>
                  {tabContents[tabId] != null ? (
                    <div className="size-full flex">
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
                  )}
                </CodingWorkspaceErrorBoundary>
              )}
            />
          </div>
        </div>
        {!embed && (
          <UserInterfaceCodingWorkspaceBottomBar
            frameworkSolutionPath={frameworkSolutionPath}
            metadata={metadata}
            mode={mode}
            nextQuestions={nextQuestions}
            question={question}
            resetToDefaultCode={resetToDefaultCode}
            slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE="qns_slideout"
            studyListKey={studyListKey}
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
  studyListKey,
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
  studyListKey?: string;
}>) {
  const { sandpack } = useSandpack();
  const { activeFile, visibleFiles } = sandpack;
  const { metadata, framework } = question;

  const frameworkSolutionPath = questionHrefWithListType(
    questionUserInterfaceSolutionPath(metadata, framework),
    studyListKey ? { type: 'study-list', value: studyListKey } : undefined,
  );

  return (
    <TilesProvider
      activeTabScrollIntoView={activeTabScrollIntoView}
      defaultValue={getUserInterfaceCodingWorkspaceLayout(
        mode,
        activeFile,
        visibleFiles,
        frameworkSolutionPath,
      )}>
      <UserInterfaceCodingWorkspaceImpl
        canViewPremiumContent={canViewPremiumContent}
        defaultFiles={defaultFiles}
        embed={embed}
        frameworkSolutionPath={frameworkSolutionPath}
        loadedFilesFromLocalStorage={loadedFilesFromLocalStorage}
        mode={mode}
        nextQuestions={nextQuestions}
        question={question}
        similarQuestions={similarQuestions}
        studyListKey={studyListKey}
        onFrameworkChange={onFrameworkChange}
      />
    </TilesProvider>
  );
}
