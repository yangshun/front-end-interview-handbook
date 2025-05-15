import { SandpackProvider } from '@codesandbox/sandpack-react';
import clsx from 'clsx';

import CodingPreferencesProvider from '~/components/global/CodingPreferencesProvider';
import { useColorSchemePreferences } from '~/components/global/color-scheme/ColorSchemePreferencesProvider';
import type {
  InterviewsQuestionItemMinimal,
  InterviewsQuestionItemUserInterface,
  QuestionFramework,
} from '~/components/interviews/questions/common/QuestionsTypes';
import type { QuestionUserInterfaceMode } from '~/components/interviews/questions/common/QuestionUserInterfacePath';
import sandpackProviderOptions from '~/components/workspace/common/sandpack/sandpackProviderOptions';
import UserInterfaceCodingWorkspace from '~/components/workspace/user-interface/UserInterfaceCodingWorkspace';
import { loadLocalUserInterfaceQuestionCode } from '~/components/workspace/user-interface/UserInterfaceCodingWorkspaceCodeStorage';

import SandpackErrorReporting from '../common/sandpack/SandpackErrorReporting';

type Props = Readonly<{
  activeTabScrollIntoView?: boolean;
  canViewPremiumContent: boolean;
  embed?: boolean;
  mode: QuestionUserInterfaceMode;
  nextQuestions: ReadonlyArray<InterviewsQuestionItemMinimal>;
  onFrameworkChange: (
    framework: QuestionFramework,
    contentType: 'description' | 'solution',
  ) => void;
  question: InterviewsQuestionItemUserInterface;
  similarQuestions: ReadonlyArray<InterviewsQuestionItemMinimal>;
  studyListKey?: string;
  timeoutLoggerInstance: string;
}>;

export default function UserInterfaceCodingWorkspaceSection({
  activeTabScrollIntoView,
  canViewPremiumContent,
  mode,
  nextQuestions,
  question,
  similarQuestions,
  embed = false,
  timeoutLoggerInstance,
  onFrameworkChange,
  studyListKey,
}: Props) {
  const { colorScheme } = useColorSchemePreferences();

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
    mode === 'practice' ? (loadedFiles ?? defaultFiles) : defaultFiles;

  const workspace =
    mode === 'practice'
      ? question.skeletonBundle.workspace
      : question.solutionBundle.workspace;

  return (
    <CodingPreferencesProvider>
      <SandpackProvider
        customSetup={{
          environment: workspace?.environment,
        }}
        files={files}
        options={{
          ...sandpackProviderOptions,
          activeFile: workspace?.activeFile,
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
        <SandpackErrorReporting instance={timeoutLoggerInstance} />
      </SandpackProvider>
    </CodingPreferencesProvider>
  );
}
