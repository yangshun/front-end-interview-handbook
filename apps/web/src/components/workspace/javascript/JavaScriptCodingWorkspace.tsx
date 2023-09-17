import clsx from 'clsx';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { VscLayout } from 'react-icons/vsc';

import CodingPreferencesProvider from '~/components/global/CodingPreferencesProvider';
import LogoLink from '~/components/global/Logo';
import type {
  QuestionJavaScriptSkeleton,
  QuestionJavaScriptWorkspace,
  QuestionMetadata,
} from '~/components/questions/common/QuestionsTypes';
import QuestionContentProse from '~/components/questions/content/QuestionContentProse';
import QuestionContentsJavaScriptTestsCode from '~/components/questions/content/QuestionContentsJavaScriptTestsCode';
import Button from '~/components/ui/Button';
import DropdownMenu from '~/components/ui/DropdownMenu';

import { TilesPanelRoot } from '~/react-tiling/components/TilesPanelRoot';
import { TilesProvider } from '~/react-tiling/state/TilesProvider';
import { useTilesContext } from '~/react-tiling/state/useTilesContext';

import JavaScriptCodingWorkspaceBottomBar from './JavaScriptCodingWorkspaceBottomBar';
import JavaScriptCodingWorkspaceCodeEditor from './JavaScriptCodingWorkspaceCodeEditor';
import {
  JavaScriptCodingWorkspaceContextProvider,
  useJavaScriptCodingWorkspaceContext,
} from './JavaScriptCodingWorkspaceContext';
import {
  getJavaScriptCodingWorkspaceLayout,
  getJavaScriptCodingWorkspaceLayoutGrid,
  getJavaScriptCodingWorkspaceLayoutThreeColumns,
} from './JavaScriptCodingWorkspaceLayouts';
import JavaScriptCodingWorkspaceNewTab from './JavaScriptCodingWorkspaceNewTab';
import JavaScriptCodingWorkspaceQuestionDescription from './JavaScriptCodingWorkspaceQuestionDescription';
import JavaScriptCodingWorkspaceTestsRunTab from './JavaScriptCodingWorkspaceRunTab';
import JavaScriptCodingWorkspaceTestsSubmitTab from './JavaScriptCodingWorkspaceSubmitTab';
import { codingFilesShouldUseTypeScript } from '../codingFilesShouldUseTypeScript';
import type { CodingWorkspaceTabContents } from '../CodingWorkspaceContext';
import {
  CodingWorkspaceProvider,
  useCodingWorkspaceContext,
} from '../CodingWorkspaceContext';
import { CodingWorkspaceTabIcons } from '../CodingWorkspaceTabIcons';
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

function JavaScriptCodingWorkspaceImpl({
  canViewPremiumContent,
  description,
  nextQuestions,
  similarQuestions,
  metadata,
  solution,
}: Readonly<{
  canViewPremiumContent: boolean;
  description: string | null;
  metadata: QuestionMetadata;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
  solution: string | null;
}>) {
  const { dispatch } = useTilesContext();
  const { status } = useCodingWorkspaceContext();
  const { language, resetAllFiles } = useJavaScriptCodingWorkspaceContext();

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
      icon: CodingWorkspaceTabIcons.console.icon,
      label: 'Console',
    },
    description: {
      contents: (
        <JavaScriptCodingWorkspaceQuestionDescription
          canViewPremiumContent={canViewPremiumContent}
          description={description}
          metadata={metadata}
          nextQuestions={nextQuestions}
          similarQuestions={similarQuestions}
        />
      ),
      icon: CodingWorkspaceTabIcons.description.icon,
      label: 'Description',
    },
    run_tests: {
      contents: (
        <JavaScriptCodingWorkspaceTestsRunTab specPath={workspace.run} />
      ),
      icon: CodingWorkspaceTabIcons.run.icon,
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
      icon: CodingWorkspaceTabIcons.solution.icon,
      label: 'Solution',
    },
    submit: {
      contents: (
        <JavaScriptCodingWorkspaceTestsSubmitTab
          metadata={metadata}
          specPath={workspace.submit}
        />
      ),
      icon: CodingWorkspaceTabIcons.submit.icon,
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
      icon: CodingWorkspaceTabIcons.test_cases_all.icon,
      label: 'All test cases',
    },
  };

  const [tabContents, setTabContents] = useState<CodingWorkspaceTabContents>({
    ...predefinedTabs,
    ...Object.fromEntries(
      visibleFiles.map((file) => [
        file,
        {
          contents: <JavaScriptCodingWorkspaceCodeEditor filePath={file} />,
          ...{
            [workspace.main]: {
              icon: CodingWorkspaceTabIcons.code.icon,
              label: 'Code',
            },
            [workspace.run]: {
              icon: CodingWorkspaceTabIcons.test_cases.icon,
              label: 'Test cases',
            },
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
      <div className="flex grow overflow-x-auto">
        <div className="flex w-full min-w-[1024px] grow px-3">
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
                <JavaScriptCodingWorkspaceNewTab
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
  description: string | null;
  metadata: QuestionMetadata;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
  skeleton: QuestionJavaScriptSkeleton;
  solution: string | null;
  workspace: QuestionJavaScriptWorkspace;
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
            metadata={metadata}
            skeleton={skeleton}
            workspace={workspace}>
            <JavaScriptCodingWorkspaceImpl
              canViewPremiumContent={canViewPremiumContent}
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
