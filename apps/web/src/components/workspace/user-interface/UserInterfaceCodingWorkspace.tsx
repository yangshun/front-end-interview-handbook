'use client';

import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import { RiCodeLine } from 'react-icons/ri';

import InterviewsPremiumBadge from '~/components/interviews/common/InterviewsPremiumBadge';
import { questionHrefWithListType } from '~/components/interviews/questions/common/QuestionHrefUtils';
import type {
  QuestionFramework,
  QuestionMetadata,
  QuestionUserInterface,
} from '~/components/interviews/questions/common/QuestionsTypes';
import type { QuestionUserInterfaceMode } from '~/components/interviews/questions/common/QuestionUserInterfacePath';
import useQuestionsAutoMarkAsComplete from '~/components/interviews/questions/common/useQuestionsAutoMarkAsComplete';
import { questionUserInterfaceSolutionPath } from '~/components/interviews/questions/content/user-interface/QuestionUserInterfaceRoutes';
import { useQuestionsListTypeCurrent } from '~/components/interviews/questions/listings/utils/useQuestionsListDataForType';
import { useIntl } from '~/components/intl';
import SponsorsAdFormatInContentContainer from '~/components/sponsors/ads/SponsorsAdFormatInContentContainer';
import Button from '~/components/ui/Button';
import Divider from '~/components/ui/Divider';
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

// Find files that are not in defaultFiles but exist in sandpack.files
const getNonDefaultFiles = (
  sandpackFiles: SandpackFiles,
  defaultFiles: SandpackFiles,
) => {
  const nonDefaultFiles: Array<string> = [];

  if (sandpackFiles) {
    Object.keys(sandpackFiles).forEach((filePath) => {
      if (!defaultFiles[filePath]) {
        nonDefaultFiles.push(filePath);
      }
    });
  }

  return nonDefaultFiles;
};

function UserInterfaceCodingWorkspaceImpl({
  canViewPremiumContent,
  isViewingSave,
  saveFilesToLocalStorage,
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
  isViewingSave: boolean;
  loadedFilesFromLocalStorage: boolean;
  mode: QuestionUserInterfaceMode;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  onFrameworkChange: (
    framework: QuestionFramework,
    contentType: 'description' | 'solution',
  ) => void;
  question: QuestionUserInterface;
  saveFilesToLocalStorage: boolean;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
  studyListKey?: string;
}>) {
  const intl = useIntl();
  const { framework, metadata: rawMetadata, description, solution } = question;

  const metadata = {
    ...rawMetadata,
    author:
      (mode === 'practice'
        ? question.skeletonBundle.author
        : question.solutionBundle?.author) ?? rawMetadata.author,
  };

  const { dispatch } = useUserInterfaceCodingWorkspaceTilesContext();
  const { sandpack } = useSandpack();
  const { activeFile, visibleFiles, files } = sandpack;

  useRestartSandpack();
  useSandpackModuleErrorRefreshBrowser();

  useEffect(() => {
    if (mode === 'practice' && saveFilesToLocalStorage) {
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

    const nonDefaultFiles = getNonDefaultFiles(sandpack.files, defaultFiles);

    if (nonDefaultFiles.length > 0) {
      nonDefaultFiles.forEach((filePath) => {
        sandpack.deleteFile(filePath);
      });
    }
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
            isViewingSave={isViewingSave}
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
          metadata={metadata}
          mode={mode}
          nextQuestions={nextQuestions}
          showAd={!embed}
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
    file_explorer: {
      contents: <UserInterfaceCodingWorkspaceExplorer />,
      icon: CodingWorkspaceTabIcons.explorer.icon,
      label: intl.formatMessage({
        defaultMessage: 'File explorer',
        description: 'Coding workspace file explorer label',
        id: '7hMBWU',
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
      contents:
        mode === 'practice' ? (
          <div className="flex w-full items-center p-2">
            <EmptyState
              action={
                <Button
                  href={frameworkSolutionPath}
                  label={intl.formatMessage({
                    defaultMessage: 'Go to solution',
                    description: 'Coding workspace go to solution button label',
                    id: 'JNG61K',
                  })}
                  variant="secondary"
                />
              }
              icon={CodingWorkspaceTabIcons.solution.icon}
              size="sm"
              subtitle={intl.formatMessage({
                defaultMessage: 'View the full solution on a new page',
                description: 'Coding workspace view solution subtitle',
                id: 'qBtGwR',
              })}
              title={intl.formatMessage({
                defaultMessage: 'Solution',
                description: 'Coding workspace view solution title',
                id: '23pktm',
              })}
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
            showAd={!embed}
            similarQuestions={similarQuestions}
            studyListKey={studyListKey}
            writeup={solution}
            onFrameworkChange={onFrameworkChange}
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
      contents: <UserInterfaceCodingWorkspaceSavesList metadata={metadata} />,
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
        .filter((filePath) => files[filePath] != null)
        .map((filePath) => [
          codingWorkspaceTabFileId(filePath),
          {
            contents: (
              <UserInterfaceCodingWorkspaceCodeEditor
                filePath={filePath}
                isViewingSave={isViewingSave}
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
      embed={embed}
      loadedFilesFromLocalStorage={loadedFilesFromLocalStorage}
      value={{
        defaultFiles,
        deleteCodeFromLocalStorage,
        openFile,
        resetToDefaultCode,
      }}>
      {/* Mobile version */}
      {!embed && (
        <div
          className={clsx(
            'flex flex-col',
            'lg:hidden',
            'size-full min-h-[calc(100vh_-_var(--global-sticky-height))]',
          )}>
          <div className="flex grow flex-col gap-y-4">
            {mode === 'practice' && (
              <UserInterfaceCodingWorkspaceWriteup
                canViewPremiumContent={canViewPremiumContent}
                contentType="description"
                framework={framework}
                metadata={metadata}
                mode={mode}
                nextQuestions={[]}
                showAd={!embed}
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
                showAd={!embed}
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
                    label={intl.formatMessage({
                      defaultMessage: 'View solution',
                      description:
                        'Coding workspace view solution button label',
                      id: '/08n88',
                    })}
                    variant="secondary"
                  />
                )
              }
            />
            <div
              className={clsx(
                'flex flex-col gap-y-6',
                'px-4 pb-6',
                'mx-auto w-full max-w-3xl',
              )}>
              <Divider />
              <SponsorsAdFormatInContentContainer
                adPlacement="questions_ui"
                size="sm"
              />
            </div>
          </div>
          <UserInterfaceCodingWorkspaceBottomBar
            framework={framework}
            frameworkSolutionPath={frameworkSolutionPath}
            isViewingSave={isViewingSave}
            metadata={metadata}
            mode={mode}
            question={question}
            resetToDefaultCode={resetToDefaultCode}
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
            <UserInterfaceCodingWorkspaceTilesPanelRoot
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
                                  isViewingSave={isViewingSave}
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
            framework={framework}
            frameworkSolutionPath={frameworkSolutionPath}
            isViewingSave={isViewingSave}
            metadata={metadata}
            mode={mode}
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
  isViewingSave = false,
  canViewPremiumContent,
  embed,
  defaultFiles,
  loadedFilesFromLocalStorage,
  saveFilesToLocalStorage = true,
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
  isViewingSave?: boolean;
  loadedFilesFromLocalStorage: boolean;
  mode: QuestionUserInterfaceMode;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  onFrameworkChange: (
    framework: QuestionFramework,
    contentType: 'description' | 'solution',
  ) => void;
  question: QuestionUserInterface;
  saveFilesToLocalStorage?: boolean;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
  studyListKey?: string;
}>) {
  const { sandpack } = useSandpack();
  const { activeFile, visibleFiles } = sandpack;
  const { metadata, framework } = question;

  const listType = useQuestionsListTypeCurrent(studyListKey, framework);
  const frameworkSolutionPath = questionHrefWithListType(
    questionUserInterfaceSolutionPath(metadata, framework),
    listType,
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
        isViewingSave={isViewingSave}
        loadedFilesFromLocalStorage={loadedFilesFromLocalStorage}
        mode={mode}
        nextQuestions={nextQuestions}
        question={question}
        saveFilesToLocalStorage={saveFilesToLocalStorage}
        similarQuestions={similarQuestions}
        studyListKey={studyListKey}
        onFrameworkChange={onFrameworkChange}
      />
    </TilesProvider>
  );
}
