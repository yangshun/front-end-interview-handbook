import clsx from 'clsx';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import {
  RiArrowGoBackLine,
  RiCodeLine,
  RiFileList2Line,
  RiFolder3Line,
  RiTerminalBoxLine,
  RiWindowLine,
} from 'react-icons/ri';
import { VscLayout } from 'react-icons/vsc';

import CodingPreferencesProvider from '~/components/global/CodingPreferencesProvider';
import LogoLink from '~/components/global/Logo';
import type {
  QuestionFramework,
  QuestionMetadata,
  QuestionUserInterfaceWorkspace,
} from '~/components/questions/common/QuestionsTypes';
import type { QuestionUserInterfaceMode } from '~/components/questions/common/QuestionUserInterfacePath';
import Button from '~/components/ui/Button';
import DropdownMenu from '~/components/ui/DropdownMenu';

import { TilesPanelRoot } from '~/react-tiling/components/TilesPanelRoot';
import { TilesProvider } from '~/react-tiling/state/TilesProvider';
import { useTilesContext } from '~/react-tiling/state/useTilesContext';

import UserInterfaceCodingWorkspaceCodeEditor from './UserInterfaceCodingWorkspaceCodeEditor';
import UserInterfaceCodingWorkspaceFileExplorer from './UserInterfaceCodingWorkspaceFileExplorer';
import {
  getUserInterfaceCodingWorkspaceLayout,
  getUserInterfaceCodingWorkspaceLayoutAdvanced,
} from './UserInterfaceCodingWorkspaceLayouts';
import UserInterfaceCodingWorkspaceNewTabContents from './UserInterfaceCodingWorkspaceNewTabContents';
import UserInterfaceCodingWorkspaceWriteup from './UserInterfaceCodingWorkspaceWriteup';
import { codingFilesShouldUseTypeScript } from '../codingFilesShouldUseTypeScript';
import type { CodingWorkspaceTabContents } from '../CodingWorkspaceContext';
import { CodingWorkspaceProvider } from '../CodingWorkspaceContext';
import CodingWorkspaceBottomBar from '../common/CodingWorkspaceBottomBar';
import CodingWorkspaceTimer from '../common/CodingWorkspaceTimer';
import CodingWorkspaceConsole from '../common/console/CodingWorkspaceConsole';
import useMonacoEditorModels from '../common/editor/useMonacoEditorModels';
import useMonacoEditorRegisterEditorOpener from '../common/editor/useMonacoEditorRegisterEditorOpener';
import useMonacoLanguagesFetchTypeDeclarations from '../common/editor/useMonacoLanguagesFetchTypeDeclarations';
import useMonacoLanguagesJSONDefaults from '../common/editor/useMonacoLanguagesJSONDefaults';
import useMonacoLanguagesLoadTSConfig from '../common/editor/useMonacoLanguagesLoadTSConfig';
import useMonacoLanguagesTypeScriptRunDiagnostics from '../common/editor/useMonacoLanguagesTypeScriptRunDiagnostics';
import useRestartSandpack from '../useRestartSandpack';

import type { SandpackFiles } from '@codesandbox/sandpack-react';
import { SandpackPreview, useSandpack } from '@codesandbox/sandpack-react';
import { useMonaco } from '@monaco-editor/react';

type TabsType = 'code' | 'console' | 'file_explorer' | 'preview' | 'writeup';

export type StaticTabsType = Exclude<TabsType, 'code'>;
export type PredefinedTabsContents = Record<
  StaticTabsType,
  Readonly<{
    contents: ReactNode;
    icon: (iconProps: React.ComponentProps<'svg'>) => JSX.Element;
    label: string;
  }>
>;

function extractFileNameFromPath(filePath: string) {
  return filePath.replace(/^\//, '').split('/').at(-1) ?? '';
}

function UserInterfaceCodingWorkspaceImpl({
  canViewPremiumContent,
  defaultFiles,
  framework,
  metadata,
  mode,
  nextQuestions,
  similarQuestions,
  writeup,
}: Readonly<{
  canViewPremiumContent: boolean;
  defaultFiles: SandpackFiles;
  framework: QuestionFramework;
  metadata: QuestionMetadata;
  mode: QuestionUserInterfaceMode;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
  writeup: string | null;
}>) {
  const { sandpack } = useSandpack();
  const { dispatch, getTabById, queryTabByPattern } = useTilesContext();
  const { activeFile, visibleFiles, files, resetAllFiles } = sandpack;

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
        tabId: activeFile,
      },
      type: 'tab-set-active',
    });
  }, [activeFile, dispatch]);

  function openFile(filePath: string, fromFilePath: string | undefined) {
    setTabContents({
      ...tabContents,
      [filePath]: {
        contents: (
          <UserInterfaceCodingWorkspaceCodeEditor filePath={filePath} />
        ),
        icon: RiCodeLine,
        label: extractFileNameFromPath(filePath),
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

  const predefinedTabs: PredefinedTabsContents = {
    console: {
      contents: <CodingWorkspaceConsole />,
      icon: RiTerminalBoxLine,
      label: 'Console',
    },
    file_explorer: {
      contents: <UserInterfaceCodingWorkspaceFileExplorer />,
      icon: RiFolder3Line,
      label: 'File explorer',
    },
    preview: {
      contents: (
        <SandpackPreview showNavigator={true} showOpenInCodeSandbox={false} />
      ),
      icon: RiWindowLine,
      label: 'Browser',
    },
    writeup: {
      contents: (
        <UserInterfaceCodingWorkspaceWriteup
          canViewPremiumContent={canViewPremiumContent}
          framework={framework}
          metadata={metadata}
          mode={mode}
          nextQuestions={nextQuestions}
          similarQuestions={similarQuestions}
          writeup={writeup}
        />
      ),
      icon: RiFileList2Line,
      label: mode === 'practice' ? 'Description' : 'Solution',
    },
  };

  const [tabContents, setTabContents] = useState<CodingWorkspaceTabContents>({
    ...predefinedTabs,
    ...Object.fromEntries(
      visibleFiles.map((filePath) => [
        filePath,
        {
          contents: (
            <UserInterfaceCodingWorkspaceCodeEditor filePath={filePath} />
          ),
          icon: RiCodeLine,
          label: extractFileNameFromPath(filePath),
        },
      ]),
    ),
  });

  return (
    <CodingWorkspaceProvider
      value={{
        defaultFiles,
        openFile,
      }}>
      <div className="flex h-full w-full flex-col">
        <div className="flex items-center justify-between px-3 py-3">
          <div className="flex items-center gap-x-8">
            <LogoLink />
          </div>
          <div className="flex items-center gap-x-2">
            <CodingWorkspaceTimer />
            <Button
              addonPosition="start"
              icon={RiArrowGoBackLine}
              label="Reset question"
              size="xs"
              variant="secondary"
              onClick={() => {
                if (confirm('Reset all changed made to this question?')) {
                  resetAllFiles();
                }
              }}
            />
            <DropdownMenu
              align="end"
              icon={VscLayout}
              isLabelHidden={true}
              label="Layout"
              size="xs">
              {[
                {
                  label: 'Default layout',
                  value: 'default',
                },
                {
                  label: 'Coding-focused',
                  value: 'coding-focused',
                },
              ].map(({ label, value }) => (
                <DropdownMenu.Item
                  key={value}
                  isSelected={false}
                  label={label}
                  onClick={() => {
                    if (value === 'default') {
                      dispatch({
                        payload: {
                          panels: getUserInterfaceCodingWorkspaceLayout(
                            activeFile,
                            visibleFiles,
                          ),
                        },
                        type: 'layout-change',
                      });
                    }
                    if (value === 'coding-focused') {
                      dispatch({
                        payload: {
                          panels: getUserInterfaceCodingWorkspaceLayoutAdvanced(
                            activeFile,
                            visibleFiles,
                          ),
                        },
                        type: 'layout-change',
                      });
                    }
                  }}
                />
              ))}
            </DropdownMenu>
          </div>
        </div>
        <div className="flex grow overflow-x-auto">
          <div className="flex w-full min-w-[1024px] grow px-3">
            <TilesPanelRoot
              disablePointerEventsDuringResize={true}
              getResizeHandlerProps={(direction) => ({
                children: (
                  <div
                    className={clsx(
                      'transition-color absolute rounded-full ease-in-out group-hover:bg-indigo-400',
                      direction === 'horizontal' && 'inset-x-0 inset-y-0.5',
                      direction === 'vertical' && 'inset-x-0.5 inset-y-0',
                    )}
                  />
                ),
                className: clsx(
                  'relative bg-transparent group',
                  direction === 'horizontal' && 'h-2',
                  direction === 'vertical' && 'w-2',
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
                  <UserInterfaceCodingWorkspaceNewTabContents
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
                              />
                            ),
                            icon: RiCodeLine,
                            label: extractFileNameFromPath(data.payload.file),
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
  framework,
  metadata,
  mode,
  nextQuestions,
  similarQuestions,
  writeup,
}: Readonly<{
  canViewPremiumContent: boolean;
  defaultFiles: SandpackFiles;
  framework: QuestionFramework;
  metadata: QuestionMetadata;
  mode: QuestionUserInterfaceMode;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
  workspace: QuestionUserInterfaceWorkspace;
  writeup: string | null;
}>) {
  const { sandpack } = useSandpack();
  const { activeFile, visibleFiles } = sandpack;

  return (
    <CodingPreferencesProvider>
      <TilesProvider
        defaultValue={getUserInterfaceCodingWorkspaceLayout(
          activeFile,
          visibleFiles,
        )}>
        <UserInterfaceCodingWorkspaceImpl
          canViewPremiumContent={canViewPremiumContent}
          defaultFiles={defaultFiles}
          framework={framework}
          metadata={metadata}
          mode={mode}
          nextQuestions={nextQuestions}
          similarQuestions={similarQuestions}
          writeup={writeup}
        />
      </TilesProvider>
    </CodingPreferencesProvider>
  );
}
