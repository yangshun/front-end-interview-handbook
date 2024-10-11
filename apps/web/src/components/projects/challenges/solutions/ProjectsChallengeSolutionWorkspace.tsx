import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { RiCodeLine } from 'react-icons/ri';

import useQuestionLogEventCopyContents from '~/components/interviews/questions/common/useQuestionLogEventCopyContents';
import { codingFilesShouldUseTypeScript } from '~/components/workspace/common/codingFilesShouldUseTypeScript';
import type { CodingWorkspaceTabContents } from '~/components/workspace/common/CodingWorkspaceContext';
import { CodingWorkspaceProvider } from '~/components/workspace/common/CodingWorkspaceContext';
import CodingWorkspaceDivider, {
  CodingWorkspaceDividerWrapperClassname,
} from '~/components/workspace/common/CodingWorkspaceDivider';
import CodingWorkspaceErrorBoundary from '~/components/workspace/common/CodingWorkspaceErrorBoundary';
import { codingWorkspaceExtractFileNameFromPath } from '~/components/workspace/common/codingWorkspaceExtractFileNameFromPath';
import { CodingWorkspaceTabIcons } from '~/components/workspace/common/CodingWorkspaceTabIcons';
import CodingWorkspaceConsole from '~/components/workspace/common/console/CodingWorkspaceConsole';
import useMonacoEditorModels from '~/components/workspace/common/editor/useMonacoEditorModels';
import useMonacoEditorRegisterEditorOpener from '~/components/workspace/common/editor/useMonacoEditorRegisterEditorOpener';
import useMonacoLanguagesFetchTypeDeclarations from '~/components/workspace/common/editor/useMonacoLanguagesFetchTypeDeclarations';
import useMonacoLanguagesJSONDefaults from '~/components/workspace/common/editor/useMonacoLanguagesJSONDefaults';
import useMonacoLanguagesLoadTSConfig from '~/components/workspace/common/editor/useMonacoLanguagesLoadTSConfig';
import useMonacoLanguagesTypeScriptRunDiagnostics from '~/components/workspace/common/editor/useMonacoLanguagesTypeScriptRunDiagnostics';
import CodingWorkspaceExplorer from '~/components/workspace/common/explorer/CodingWorkspaceExplorer';
import { codingWorkspaceExplorerFilePathToIcon } from '~/components/workspace/common/explorer/codingWorkspaceExplorerFilePathToIcon';
import useRestartSandpack from '~/components/workspace/common/sandpack/useRestartSandpack';
import {
  codingWorkspaceTabFileId,
  codingWorkspaceTabFilePattern,
} from '~/components/workspace/common/tabs/codingWorkspaceTabId';
import UserInterfaceCodingWorkspaceCodeEditor from '~/components/workspace/user-interface/UserInterfaceCodingWorkspaceCodeEditor';
import UserInterfaceCodingWorkspacePreview from '~/components/workspace/user-interface/UserInterfaceCodingWorkspacePreview';
import useUserInterfaceCodingWorkspaceTilesContext from '~/components/workspace/user-interface/useUserInterfaceCodingWorkspaceTilesContext';

import { TilesPanelRoot } from '~/react-tiling/components/TilesPanelRoot';
import { TilesProvider } from '~/react-tiling/state/TilesProvider';
import type { TilesPanelConfig } from '~/react-tiling/types';

import ProjectsChallengeSolutionWorkspaceNewTab from './ProjectsChallengeSolutionWorkspaceNewTab';
import type {
  ProjectsChallengeSolutionWorkspacePredefinedTabsContents,
  ProjectsChallengeSolutionWorkspaceTabsType,
} from './ProjectsChallengeSolutionWorkspaceTypes';

import type { SandpackFiles } from '@codesandbox/sandpack-react';
import { useSandpack } from '@codesandbox/sandpack-react';
import { useMonaco } from '@monaco-editor/react';

const UserInterfaceCodingWorkspaceTilesPanelRoot =
  TilesPanelRoot<ProjectsChallengeSolutionWorkspaceTabsType>;

function ProjectsChallengeSolutionWorkspaceImpl({
  defaultFiles,
}: Readonly<{
  defaultFiles: SandpackFiles;
}>) {
  const copyRef = useQuestionLogEventCopyContents<HTMLDivElement>();
  const { dispatch } = useUserInterfaceCodingWorkspaceTilesContext();
  const { sandpack } = useSandpack();
  const { activeFile, visibleFiles, files } = sandpack;

  useRestartSandpack();

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

  function resetToDefaultCode() {
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
            showNotSavedBanner={true}
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

  const predefinedTabs: ProjectsChallengeSolutionWorkspacePredefinedTabsContents =
    {
      console: {
        contents: <CodingWorkspaceConsole />,
        icon: CodingWorkspaceTabIcons.console.icon,
        label: 'Console',
      },
      file_explorer: {
        contents: (
          <div className="flex w-full p-2">
            <CodingWorkspaceExplorer onOpenFile={openFile} />
          </div>
        ),
        icon: CodingWorkspaceTabIcons.explorer.icon,
        label: 'File explorer',
      },
      preview: {
        contents: <UserInterfaceCodingWorkspacePreview />,
        icon: CodingWorkspaceTabIcons.browser.icon,
        label: 'Browser',
      },
    };

  const [tabContents, setTabContents] = useState<
    CodingWorkspaceTabContents<ProjectsChallengeSolutionWorkspaceTabsType>
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
                showNotSavedBanner={true}
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
      value={{
        defaultFiles,
        deleteCodeFromLocalStorage: () => {},
        openFile,
        resetToDefaultCode,
      }}>
      <div ref={copyRef} className={clsx('size-full flex-col text-sm', 'flex')}>
        <div className="flex grow overflow-x-auto">
          <div className={clsx('flex w-full grow', 'min-w-[1024px]')}>
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
                    <ProjectsChallengeSolutionWorkspaceNewTab
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
                                  showNotSavedBanner={true}
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
      </div>
    </CodingWorkspaceProvider>
  );
}

export default function ProjectsChallengeSolutionWorkspace({
  activeTabScrollIntoView = true,
  defaultFiles,
}: Readonly<{
  activeTabScrollIntoView?: boolean;
  defaultFiles: SandpackFiles;
}>) {
  const { sandpack } = useSandpack();
  const { activeFile, visibleFiles } = sandpack;

  const layout: TilesPanelConfig<ProjectsChallengeSolutionWorkspaceTabsType> = {
    direction: 'horizontal',
    id: 'root',
    items: [
      {
        activeTabId: codingWorkspaceTabFileId(activeFile),
        collapsible: true,
        defaultSize: 40,
        id: 'left-column',
        tabs: [
          {
            closeable: true,
            id: 'file_explorer',
          },
          ...visibleFiles.map((file) => ({
            allowOverflow: true,
            closeable: true,
            id: codingWorkspaceTabFileId(file),
          })),
        ],
        type: 'item',
      },
      {
        activeTabId: 'preview',
        collapsible: true,
        defaultSize: 30,
        id: 'right-column',
        tabs: [
          {
            closeable: false,
            id: 'preview',
          },
          {
            closeable: true,
            id: 'console',
          },
        ],
        type: 'item',
      },
    ],
    type: 'group',
  } as const;

  return (
    <TilesProvider
      activeTabScrollIntoView={activeTabScrollIntoView}
      defaultValue={layout}>
      <ProjectsChallengeSolutionWorkspaceImpl defaultFiles={defaultFiles} />
    </TilesProvider>
  );
}
