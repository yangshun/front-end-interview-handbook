import { SandpackProvider } from '@codesandbox/sandpack-react';
import clsx from 'clsx';

import CodingPreferencesProvider from '~/components/global/CodingPreferencesProvider';
import { useColorSchemePreferences } from '~/components/global/color-scheme/ColorSchemePreferencesProvider';
import type {
  QuestionFramework,
  QuestionMetadata,
  QuestionUserInterface,
} from '~/components/interviews/questions/common/QuestionsTypes';
import type { QuestionUserInterfaceMode } from '~/components/interviews/questions/common/QuestionUserInterfacePath';
import { SandpackTimeout } from '~/components/workspace/common/sandpack/SandpackTimeout';
import { useSandpackBundlerURL } from '~/components/workspace/common/sandpack/useSandpackBundlerURL';
import UserInterfaceCodingWorkspace from '~/components/workspace/user-interface/UserInterfaceCodingWorkspace';
import { loadLocalUserInterfaceQuestionCode } from '~/components/workspace/user-interface/UserInterfaceCodingWorkspaceCodeStorage';

import SandpackObservability from '../common/sandpack/SandpackObservability';

type Props = Readonly<{
  activeTabScrollIntoView?: boolean;
  canViewPremiumContent: boolean;
  embed?: boolean;
  mode: QuestionUserInterfaceMode;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  onFrameworkChange: (
    framework: QuestionFramework,
    contentType: 'description' | 'solution',
  ) => void;
  question: QuestionUserInterface;
  sandpackO11yInstance: string;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
  studyListKey?: string;
}>;

export default function UserInterfaceCodingWorkspaceSection({
  activeTabScrollIntoView,
  canViewPremiumContent,
  embed = false,
  mode,
  nextQuestions,
  onFrameworkChange,
  question,
  sandpackO11yInstance,
  similarQuestions,
  studyListKey,
}: Props) {
  const { colorScheme } = useColorSchemePreferences();
  const [bundlerURL, changeToFallbackUrl] =
    useSandpackBundlerURL(sandpackO11yInstance);

  const loadedFiles = loadLocalUserInterfaceQuestionCode(
    question,
    question.skeletonBundle!.files,
  );
  const loadedFilesFromLocalStorage =
    mode === 'practice' && loadedFiles != null;

  const defaultFiles =
    mode === 'practice'
      ? question.skeletonBundle.files
      : question.solutionBundle.files;

  const files =
    mode === 'practice' ? loadedFiles ?? defaultFiles : defaultFiles;

  const workspace =
    mode === 'practice'
      ? question.skeletonBundle.workspace
      : question.solutionBundle.workspace;

  return (
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
                : '!bg-neutral-50 dark:!bg-[#070708] lg:!pt-3 lg:!h-[calc(100vh_-_var(--global-sticky-height))]',
            ),
          },
          visibleFiles: workspace?.visibleFiles ?? undefined,
        }}
        theme={colorScheme === 'dark' ? 'dark' : undefined}>
        <UserInterfaceCodingWorkspace
          activeTabScrollIntoView={activeTabScrollIntoView}
          canViewPremiumContent={canViewPremiumContent}
          defaultFiles={defaultFiles}
          embed={embed}
          loadedFilesFromLocalStorage={loadedFilesFromLocalStorage}
          mode={mode}
          nextQuestions={nextQuestions}
          question={question}
          similarQuestions={similarQuestions}
          studyListKey={studyListKey}
          onFrameworkChange={onFrameworkChange}
        />
        <SandpackTimeout
          instance={sandpackO11yInstance}
          onTimeout={changeToFallbackUrl}
        />
        <SandpackObservability
          bundlerURL={bundlerURL}
          instance={sandpackO11yInstance}
        />
      </SandpackProvider>
    </CodingPreferencesProvider>
  );
}
