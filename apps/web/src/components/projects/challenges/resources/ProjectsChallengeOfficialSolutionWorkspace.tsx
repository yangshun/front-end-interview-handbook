import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { RiCodeLine } from 'react-icons/ri';
import { mergeRefs } from 'react-merge-refs';

import useQuestionLogEventCopyContents from '~/components/interviews/questions/common/useQuestionLogEventCopyContents';
import { codingFilesShouldUseTypeScript } from '~/components/workspace/common/codingFilesShouldUseTypeScript';
import type { CodingWorkspaceTabContents } from '~/components/workspace/common/CodingWorkspaceContext';
import { CodingWorkspaceProvider } from '~/components/workspace/common/CodingWorkspaceContext';
import { codingWorkspaceExtractFileNameFromPath } from '~/components/workspace/common/codingWorkspaceExtractFileNameFromPath';
import { CodingWorkspaceTabIcons } from '~/components/workspace/common/CodingWorkspaceTabIcons';
import CodingWorkspaceConsole from '~/components/workspace/common/console/CodingWorkspaceConsole';
import useMonacoEditorModels from '~/components/workspace/common/editor/useMonacoEditorModels';
import useMonacoEditorRegisterEditorOpener from '~/components/workspace/common/editor/useMonacoEditorRegisterEditorOpener';
import useMonacoLanguagesFetchTypeDeclarations from '~/components/workspace/common/editor/useMonacoLanguagesFetchTypeDeclarations';
import useMonacoLanguagesJSONDefaults from '~/components/workspace/common/editor/useMonacoLanguagesJSONDefaults';
import useMonacoLanguagesLoadTSConfig from '~/components/workspace/common/editor/useMonacoLanguagesLoadTSConfig';
import useMonacoLanguagesTypeScriptRunDiagnostics from '~/components/workspace/common/editor/useMonacoLanguagesTypeScriptRunDiagnostics';
import { codingWorkspaceExplorerFilePathToIcon } from '~/components/workspace/common/explorer/codingWorkspaceExplorerFilePathToIcon';
import {
  codingWorkspaceTabFileId,
  codingWorkspaceTabFilePattern,
} from '~/components/workspace/common/tabs/codingWorkspaceTabId';
import UserInterfaceCodingWorkspaceCodeEditor from '~/components/workspace/user-interface/UserInterfaceCodingWorkspaceCodeEditor';
import UserInterfaceCodingWorkspaceExplorer from '~/components/workspace/user-interface/UserInterfaceCodingWorkspaceExplorer';
import useUserInterfaceCodingWorkspaceTilesContext from '~/components/workspace/user-interface/useUserInterfaceCodingWorkspaceTilesContext';

import { TilesPanelRoot } from '~/react-tiling/components/TilesPanelRoot';
import { TilesProvider } from '~/react-tiling/state/TilesProvider';
import type { TilesPanelConfig } from '~/react-tiling/types';

import ProjectsChallengeOfficialSolutionWorkspaceNewTab from './ProjectsChallengeOfficialSolutionWorkspaceNewTab';
import type {
  ProjectsChallengeOfficialSolutionWorkspacePredefinedTabsContents,
  ProjectsChallengeOfficialSolutionWorkspaceTabsType,
} from './ProjectsChallengeOfficialSolutionWorkspaceTypes';

import type { SandpackFiles } from '@codesandbox/sandpack-react';
import { SandpackPreview, useSandpack } from '@codesandbox/sandpack-react';
import { useMonaco } from '@monaco-editor/react';

const UserInterfaceCodingWorkspaceTilesPanelRoot =
  TilesPanelRoot<ProjectsChallengeOfficialSolutionWorkspaceTabsType>;

function ProjectsChallengeOfficialSolutionWorkspaceImpl({
  defaultFiles,
}: Readonly<{
  defaultFiles: SandpackFiles;
}>) {
  const copyRef = useQuestionLogEventCopyContents<HTMLDivElement>();
  const { dispatch } = useUserInterfaceCodingWorkspaceTilesContext();
  const { sandpack } = useSandpack();
  const { activeFile, visibleFiles, files } = sandpack;

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

  const predefinedTabs: ProjectsChallengeOfficialSolutionWorkspacePredefinedTabsContents =
    {
      console: {
        contents: <CodingWorkspaceConsole />,
        icon: CodingWorkspaceTabIcons.console.icon,
        label: 'Console',
      },
      file_explorer: {
        contents: <UserInterfaceCodingWorkspaceExplorer />,
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
    };

  const [tabContents, setTabContents] = useState<
    CodingWorkspaceTabContents<ProjectsChallengeOfficialSolutionWorkspaceTabsType>
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

  const mergedRef = mergeRefs([copyRef, sandpack.lazyAnchorRef]);

  return (
    <CodingWorkspaceProvider
      value={{
        defaultFiles,
        deleteCodeFromLocalStorage: () => {},
        openFile,
        resetToDefaultCode,
      }}>
      <div
        ref={mergedRef}
        className={clsx('size-full flex-col text-sm', 'flex')}>
        <div className="flex grow overflow-x-auto">
          <div className={clsx('flex w-full grow', 'min-w-[1024px]')}>
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
                  <div className="size-full flex">
                    {tabContents[tabId]!.contents}
                  </div>
                ) : (
                  <ProjectsChallengeOfficialSolutionWorkspaceNewTab
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
                )
              }
            />
          </div>
        </div>
      </div>
    </CodingWorkspaceProvider>
  );
}

export default function ProjectsChallengeOfficialSolutionWorkspace({
  activeTabScrollIntoView = true,
  defaultFiles,
}: Readonly<{
  activeTabScrollIntoView?: boolean;
  defaultFiles: SandpackFiles;
}>) {
  const { sandpack } = useSandpack();
  const { activeFile, visibleFiles } = sandpack;

  const layout: TilesPanelConfig<ProjectsChallengeOfficialSolutionWorkspaceTabsType> =
    {
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
      <ProjectsChallengeOfficialSolutionWorkspaceImpl
        defaultFiles={defaultFiles}
      />
    </TilesProvider>
  );
}