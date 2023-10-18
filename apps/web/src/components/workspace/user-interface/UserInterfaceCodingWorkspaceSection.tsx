import clsx from 'clsx';

import footerlessContainerHeight from '~/components/common/FooterlessContainerHeight';
import CodingPreferencesProvider from '~/components/global/CodingPreferencesProvider';
import { useAppThemePreferences } from '~/components/global/dark/AppThemePreferencesProvider';
import type {
  QuestionFramework,
  QuestionMetadata,
  QuestionUserInterface,
} from '~/components/questions/common/QuestionsTypes';
import type { QuestionUserInterfaceMode } from '~/components/questions/common/QuestionUserInterfacePath';
import sandpackProviderOptions from '~/components/workspace/common/sandpack/sandpackProviderOptions';
import UserInterfaceCodingWorkspace from '~/components/workspace/user-interface/UserInterfaceCodingWorkspace';
import { loadLocalUserInterfaceQuestionCode } from '~/components/workspace/user-interface/UserInterfaceCodingWorkspaceCodeStorage';

import SandpackTimeoutLogger from '../common/sandpack/SandpackTimeoutLogger';

import { SandpackProvider } from '@codesandbox/sandpack-react';

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
  similarQuestions: ReadonlyArray<QuestionMetadata>;
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
}: Props) {
  const { appTheme } = useAppThemePreferences();

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
              '!w-full !text-sm flex-1',
              !embed && '!bg-neutral-50 dark:!bg-[#070708] !pt-3',
            ),
          },
          visibleFiles: workspace?.visibleFiles ?? undefined,
        }}
        style={{
          height: embed ? '100%' : footerlessContainerHeight,
        }}
        theme={appTheme === 'dark' ? 'dark' : undefined}>
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
          onFrameworkChange={onFrameworkChange}
        />
        <SandpackTimeoutLogger instance={timeoutLoggerInstance} />
      </SandpackProvider>
    </CodingPreferencesProvider>
  );
}
