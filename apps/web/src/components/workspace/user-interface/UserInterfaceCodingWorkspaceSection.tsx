'use client';

import { SandpackProvider } from '@codesandbox/sandpack-react';
import clsx from 'clsx';
import { NavigationGuardProvider } from 'next-navigation-guard';
import { type ComponentType, useRef } from 'react';
import { Provider } from 'react-redux';

import CodingPreferencesProvider from '~/components/global/CodingPreferencesProvider';
import { useColorSchemePreferences } from '~/components/global/color-scheme/ColorSchemePreferencesProvider';
import type {
  QuestionFramework,
  QuestionMetadata,
  QuestionUserInterface,
} from '~/components/interviews/questions/common/QuestionsTypes';
import { codingWorkspaceConvertFilesToSandpackBundlerFiles } from '~/components/workspace/common/codingWorkspaceConvertFiles';
import { useSandpackBundlerURL } from '~/components/workspace/common/sandpack/useSandpackBundlerURL';
import type { UserInterfaceWorkspaceRenderProps } from '~/components/workspace/user-interface/UserInterfaceCodingWorkspace';
import UserInterfaceCodingWorkspace from '~/components/workspace/user-interface/UserInterfaceCodingWorkspace';
import { loadLocalUserInterfaceQuestionCode } from '~/components/workspace/user-interface/UserInterfaceCodingWorkspaceCodeStorage';

import SandpackObservability from '../common/sandpack/SandpackObservability';
import { makeUserInterfaceCodingWorkspaceStore } from './store/user-interface-store';

type Props = Readonly<{
  activeTabScrollIntoView?: boolean;
  canViewPremiumContent: boolean;
  embed?: boolean;
  isUserAgentTablet?: boolean;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  onFrameworkChange?: (framework: QuestionFramework) => void;
  question: QuestionUserInterface;
  renderWorkspace: ComponentType<UserInterfaceWorkspaceRenderProps>;
  sandpackO11yInstance: string;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
  studyListKey?: string;
}>;

export default function UserInterfaceCodingWorkspaceSection({
  activeTabScrollIntoView,
  canViewPremiumContent,
  embed = false,
  isUserAgentTablet = false,
  nextQuestions,
  onFrameworkChange,
  question,
  renderWorkspace,
  sandpackO11yInstance,
  similarQuestions,
  studyListKey,
}: Props) {
  const { colorScheme } = useColorSchemePreferences();
  const bundlerURL = useSandpackBundlerURL(sandpackO11yInstance);

  const loadedFiles = loadLocalUserInterfaceQuestionCode(
    question,
    question.skeletonBundle!.files,
  );
  const defaultFiles = question.skeletonBundle.files;
  const files = loadedFiles ?? defaultFiles;
  const { workspace } = question.skeletonBundle;
  const activeFile = (workspace.visibleFiles ?? []).includes(
    workspace.activeFile ?? '',
  )
    ? workspace.activeFile ?? ''
    : workspace.visibleFiles?.[0] ?? '';

  const storeRef = useRef(
    makeUserInterfaceCodingWorkspaceStore({
      sandpack: {
        current: {
          activeFile,
          files: codingWorkspaceConvertFilesToSandpackBundlerFiles(files),
          visibleFiles: workspace.visibleFiles ?? [],
        },
        default: {
          activeFile,
          files:
            codingWorkspaceConvertFilesToSandpackBundlerFiles(defaultFiles),
          visibleFiles: workspace.visibleFiles ?? [],
        },
      },
      workspace: {
        question,
      },
    }),
  );

  return (
    <Provider store={storeRef.current}>
      <NavigationGuardProvider>
        <CodingPreferencesProvider>
          <SandpackProvider
            // Remount if the bundler URL changes
            key={bundlerURL}
            customSetup={{
              environment: workspace?.environment,
            }}
            files={files}
            options={{
              activeFile: workspace?.activeFile,
              bundlerURL,
              classes: {
                'sp-input': 'touch-none select-none pointer-events-none',
                'sp-layout': 'h-full',
                'sp-stack': 'h-full',
                'sp-wrapper': clsx(
                  '!w-full !text-sm',
                  embed
                    ? '!h-full'
                    : [
                        '!bg-neutral-50 dark:!bg-[#070708]',
                        'lg:!h-[calc(100vh_-_var(--global-sticky-height))] h-full',
                      ],
                ),
              },
              visibleFiles: workspace?.visibleFiles ?? undefined,
            }}
            theme={colorScheme === 'dark' ? 'dark' : undefined}>
            <UserInterfaceCodingWorkspace
              activeTabScrollIntoView={activeTabScrollIntoView}
              canViewPremiumContent={canViewPremiumContent}
              embed={embed}
              isUserAgentTablet={isUserAgentTablet}
              nextQuestions={nextQuestions}
              question={question}
              renderWorkspace={renderWorkspace}
              similarQuestions={similarQuestions}
              studyListKey={studyListKey}
              onFrameworkChange={onFrameworkChange}
            />
            <SandpackObservability
              bundlerURL={bundlerURL}
              instance={sandpackO11yInstance}
            />
          </SandpackProvider>
        </CodingPreferencesProvider>
      </NavigationGuardProvider>
    </Provider>
  );
}
