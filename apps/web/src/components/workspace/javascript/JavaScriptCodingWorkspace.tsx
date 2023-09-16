import clsx from 'clsx';
import type { ReactNode } from 'react';
import { useState } from 'react';
import {
  RiArrowGoBackLine,
  RiCheckboxLine,
  RiCodeLine,
  RiFileList2Line,
  RiFlaskLine,
  RiLightbulbLine,
  RiListCheck3,
  RiPlayLine,
  RiTerminalBoxLine,
} from 'react-icons/ri';
import { VscLayout } from 'react-icons/vsc';

import CodingPreferencesProvider from '~/components/global/CodingPreferencesProvider';
import LogoLink from '~/components/global/Logo';
import type { QuestionMetadata } from '~/components/questions/common/QuestionsTypes';
import QuestionCodingWorkingLanguageSelect from '~/components/questions/content/QuestionCodingWorkingLanguageSelect';
import QuestionContentProse from '~/components/questions/content/QuestionContentProse';
import QuestionContentsJavaScriptTestsCode from '~/components/questions/content/QuestionContentsJavaScriptTestsCode';
import CodingWorkspaceEditorShortcutsButton from '~/components/questions/editor/CodingWorkspaceEditorShortcutsButton';
import CodingWorkspaceResetButton from '~/components/questions/editor/CodingWorkspaceResetButton';
import CodingWorkspaceThemeSelect from '~/components/questions/editor/CodingWorkspaceThemeSelect';
import Button from '~/components/ui/Button';
import DropdownMenu from '~/components/ui/DropdownMenu';
import MonacoCodeEditor from '~/components/workspace/common/editor/MonacoCodeEditor';

import { TilesPanelRoot } from '~/react-tiling/components/TilesPanelRoot';
import { TilesProvider } from '~/react-tiling/state/TilesProvider';
import { useTilesContext } from '~/react-tiling/state/useTilesContext';

import JavaScriptCodingQuestionDescription from './JavaScriptCodingQuestionDescription';
import JavaScriptCodingWorkspaceBottomBar from './JavaScriptCodingWorkspaceBottomBar';
import type {
  JavaScriptCodingLanguage,
  JavaScriptCodingSkeleton,
  JavaScriptCodingWorkspaceConfig,
} from './JavaScriptCodingWorkspaceContext';
import {
  JavaScriptCodingWorkspaceContextProvider,
  useJavaScriptCodingWorkspaceContext,
} from './JavaScriptCodingWorkspaceContext';
import {
  getJavaScriptCodingWorkspaceLayout,
  getJavaScriptCodingWorkspaceLayoutGrid,
  getJavaScriptCodingWorkspaceLayoutThreeColumns,
} from './JavaScriptCodingWorkspaceLayouts';
import JavaScriptCodingWorkspaceTestsRunPanel from './JavaScriptCodingWorkspaceRunPanel';
import JavaScriptCodingWorkspaceTestsSubmitPanel from './JavaScriptCodingWorkspaceSubmitPanel';
import { codingFilesShouldUseTypeScript } from '../codingFilesShouldUseTypeScript';
import {
  CodingWorkspaceProvider,
  useCodingWorkspaceContext,
} from '../CodingWorkspaceContext';
import CodingWorkspaceTimer from '../common/CodingWorkspaceTimer';
import CodingWorkspaceConsole from '../common/console/CodingWorkspaceConsole';
import useMonacoEditorModels from '../common/editor/useMonacoEditorModels';
import useMonacoLanguagesFetchTypeDeclarations from '../common/editor/useMonacoLanguagesFetchTypeDeclarations';
import useMonacoLanguagesLoadTSConfig from '../common/editor/useMonacoLanguagesLoadTSConfig';
import useMonacoLanguagesTypeScriptRunDiagnostics from '../common/editor/useMonacoLanguagesTypeScriptRunDiagnostics';
import useRestartSandpack from '../useRestartSandpack';

import { useSandpack } from '@codesandbox/sandpack-react';
import { useMonaco } from '@monaco-editor/react';

type TabsType =
  | 'console'
  | 'description'
  | 'run_tests'
  | 'solution'
  | 'submit'
  | 'test_cases';

export type PredefinedTabsContents = Record<
  TabsType,
  Readonly<{
    contents: ReactNode;
    icon: (iconProps: React.ComponentProps<'svg'>) => JSX.Element;
    label: string;
  }>
>;

function NewTabContents({
  predefinedTabs,
  onSelectTabType,
}: Readonly<{
  onSelectTabType: (tabType: TabsType) => void;
  predefinedTabs: PredefinedTabsContents;
}>) {
  return (
    <div className="flex flex-col gap-2 p-4">
      <p className="text-sm font-medium">Tools</p>
      <div className="flex flex-wrap gap-2">
        {Object.entries(predefinedTabs).map(([tabType, tabDetails]) => (
          <button
            key={tabType}
            className="rounded-full border border-neutral-700 px-3 py-1.5 text-xs transition-colors hover:bg-neutral-700"
            type="button"
            onClick={() => {
              onSelectTabType(tabType as TabsType);
            }}>
            {tabDetails.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function JavaScriptCodingCodeEditor({
  filePath,
}: Readonly<{
  filePath: string;
}>) {
  const { resetFile } = useJavaScriptCodingWorkspaceContext();
  const { sandpack } = useSandpack();
  const { files, updateFile } = sandpack;

  return (
    <div className="flex w-full flex-col">
      <div className="flex items-center justify-between px-1 py-1.5">
        <QuestionCodingWorkingLanguageSelect value="js" onChange={() => {}} />
        <div className="flex items-center gap-x-1.5">
          <CodingWorkspaceThemeSelect />
          <CodingWorkspaceEditorShortcutsButton />
          <CodingWorkspaceResetButton
            onClick={() => {
              if (!confirm('Reset code to original? Changes will be lost!')) {
                return;
              }
              resetFile(filePath);
            }}
          />
        </div>
      </div>
      <MonacoCodeEditor
        filePath={filePath}
        value={files[filePath].code}
        onChange={(val) => {
          updateFile(filePath, val ?? '');
        }}
      />
    </div>
  );
}

function JavaScriptCodingWorkspaceImpl({
  canViewPremiumContent,
  defaultLanguage,
  description,
  nextQuestions,
  similarQuestions,
  metadata,
  solution,
}: Readonly<{
  canViewPremiumContent: boolean;
  defaultLanguage: JavaScriptCodingLanguage;
  description: string | null;
  metadata: QuestionMetadata;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
  solution: string | null;
}>) {
  const { dispatch } = useTilesContext();
  const { status } = useCodingWorkspaceContext();
  const { language, setLanguage, resetAllFiles } =
    useJavaScriptCodingWorkspaceContext();

  const { sandpack } = useSandpack();
  const { activeFile, visibleFiles, files } = sandpack;

  useRestartSandpack();

  const shouldUseTypeScript = codingFilesShouldUseTypeScript(
    Object.keys(files),
  );
  const { workspace } = useJavaScriptCodingWorkspaceContext();

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

  const predefinedTabs: PredefinedTabsContents = {
    console: {
      contents: <CodingWorkspaceConsole />,
      icon: RiTerminalBoxLine,
      label: 'Console',
    },
    description: {
      contents: (
        <JavaScriptCodingQuestionDescription
          canViewPremiumContent={canViewPremiumContent}
          description={description}
          metadata={metadata}
          nextQuestions={nextQuestions}
          similarQuestions={similarQuestions}
        />
      ),
      icon: RiFileList2Line,
      label: 'Description',
    },
    run_tests: {
      contents: (
        <JavaScriptCodingWorkspaceTestsRunPanel specPath={workspace.run} />
      ),
      icon: RiPlayLine,
      label: 'Run tests',
    },
    solution: {
      contents: (
        <div className="w-full">
          <div className="p-4">
            <QuestionContentProse contents={solution} />
          </div>
        </div>
      ),
      icon: RiLightbulbLine,
      label: 'Solution',
    },
    submit: {
      contents: (
        <JavaScriptCodingWorkspaceTestsSubmitPanel
          metadata={metadata}
          specPath={workspace.submit}
        />
      ),
      icon: RiCheckboxLine,
      label: 'Submit',
    },
    test_cases: {
      contents: (
        <div className="w-full">
          <div className="p-4">
            <QuestionContentsJavaScriptTestsCode
              contents={files[workspace.submit].code}
            />
          </div>
        </div>
      ),
      icon: RiListCheck3,
      label: 'All test cases',
    },
  };

  const [tabContents, setTabContents] = useState<
    Record<
      string,
      Readonly<{
        contents: ReactNode;
        icon: (iconProps: React.ComponentProps<'svg'>) => JSX.Element;
        label: string;
      }>
    >
  >({
    ...predefinedTabs,
    ...Object.fromEntries(
      visibleFiles.map((file) => [
        file,
        {
          contents: <JavaScriptCodingCodeEditor filePath={file} />,
          ...{
            [workspace.main]: { icon: RiCodeLine, label: 'Code' },
            [workspace.run]: { icon: RiFlaskLine, label: 'Test cases' },
          }[file],
        },
      ]),
    ),
  });

  return (
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
            isDisabled={status !== 'idle'}
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
                label: 'Three-column layout',
                value: 'three-column',
              },
              {
                label: 'Grid layout',
                value: 'grid',
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
                        panels: getJavaScriptCodingWorkspaceLayout(
                          activeFile,
                          visibleFiles,
                        ),
                      },
                      type: 'layout-change',
                    });
                  }
                  if (value === 'three-column') {
                    dispatch({
                      payload: {
                        panels: getJavaScriptCodingWorkspaceLayoutThreeColumns(
                          activeFile,
                          visibleFiles,
                        ),
                      },
                      type: 'layout-change',
                    });
                  }
                  if (value === 'grid') {
                    dispatch({
                      payload: {
                        panels: getJavaScriptCodingWorkspaceLayoutGrid(
                          workspace.main,
                          workspace.run,
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
      <div className="flex w-full grow px-3">
        <TilesPanelRoot
          disablePointerEventsDuringResize={true}
          getResizeHandlerProps={(direction) => ({
            children: (
              <div
                className={clsx(
                  'transition-color absolute rounded-full ease-in-out group-hover:bg-indigo-400',
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
              <NewTabContents
                predefinedTabs={predefinedTabs}
                onSelectTabType={(tabType) => {
                  setTabContents({
                    ...tabContents,
                    [tabId]: { ...tabContents[tabType] },
                  });
                }}
              />
            )
          }
        />
      </div>
      <JavaScriptCodingWorkspaceBottomBar
        metadata={metadata}
        nextQuestions={nextQuestions}
      />
    </div>
  );
}

export default function JavaScriptCodingWorkspace({
  canViewPremiumContent,
  defaultFiles,
  defaultLanguage,
  description,
  metadata,
  nextQuestions,
  similarQuestions,
  skeleton,
  solution,
  workspace,
}: Readonly<{
  canViewPremiumContent: boolean;
  defaultFiles: Record<string, string>;
  defaultLanguage: JavaScriptCodingLanguage;
  description: string | null;
  metadata: QuestionMetadata;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
  skeleton: JavaScriptCodingSkeleton;
  solution: string | null;
  workspace: JavaScriptCodingWorkspaceConfig;
}>) {
  const { sandpack } = useSandpack();

  const { activeFile, visibleFiles } = sandpack;

  const defaultLayout = getJavaScriptCodingWorkspaceLayout(
    activeFile,
    visibleFiles,
  );

  return (
    <CodingPreferencesProvider>
      <TilesProvider defaultValue={defaultLayout}>
        <CodingWorkspaceProvider
          value={{
            defaultFiles,
          }}>
          <JavaScriptCodingWorkspaceContextProvider
            skeleton={skeleton}
            workspace={workspace}>
            <JavaScriptCodingWorkspaceImpl
              canViewPremiumContent={canViewPremiumContent}
              defaultLanguage={defaultLanguage}
              description={description}
              metadata={metadata}
              nextQuestions={nextQuestions}
              similarQuestions={similarQuestions}
              solution={solution}
            />
          </JavaScriptCodingWorkspaceContextProvider>
        </CodingWorkspaceProvider>
      </TilesProvider>
    </CodingPreferencesProvider>
  );
}
