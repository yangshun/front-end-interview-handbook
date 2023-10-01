import clsx from 'clsx';

import footerlessContainerHeight from '~/components/common/FooterlessContainerHeight';
import { useAppThemePreferences } from '~/components/global/dark/AppThemePreferencesProvider';
import type {
  QuestionFramework,
  QuestionMetadata,
  QuestionUserInterfaceV2,
} from '~/components/questions/common/QuestionsTypes';
import type { QuestionUserInterfaceMode } from '~/components/questions/common/QuestionUserInterfacePath';
import { loadLocalUserInterfaceQuestionCode } from '~/components/questions/editor/UserInterfaceQuestionCodeStorage';
import sandpackProviderOptions from '~/components/questions/evaluator/sandpackProviderOptions';
import UserInterfaceCodingWorkspace from '~/components/workspace/user-interface/UserInterfaceCodingWorkspace';

import SandpackTimeoutLogger from '../SandpackTimeoutLogger';

import type { SandpackTheme } from '@codesandbox/sandpack-react';
import { SandpackProvider } from '@codesandbox/sandpack-react';

type Props = Readonly<{
  canViewPremiumContent: boolean;
  embed?: boolean;
  fillViewportHeight?: boolean;
  mode: QuestionUserInterfaceMode;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  onFrameworkChange: (
    framework: QuestionFramework,
    contentType: 'description' | 'solution',
  ) => void;
  question: QuestionUserInterfaceV2;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
  theme?: SandpackTheme;
  timeoutLoggerInstance: string;
}>;

export default function UserInterfaceCodingWorkspaceSection({
  canViewPremiumContent,
  mode,
  nextQuestions,
  question,
  similarQuestions,
  fillViewportHeight = false,
  theme,
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
      ? question.skeletonBundle?.files
      : question.solutionBundle?.files;

  const files =
    mode === 'practice' ? loadedFiles ?? defaultFiles : defaultFiles;

  const workspace =
    mode === 'practice'
      ? question.skeletonBundle?.workspace
      : question.solutionBundle?.workspace;

  return (
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
        height: fillViewportHeight ? footerlessContainerHeight : '100%',
      }}
      theme={theme ?? (appTheme === 'dark' ? 'dark' : undefined)}>
      <UserInterfaceCodingWorkspace
        canViewPremiumContent={canViewPremiumContent}
        defaultFiles={defaultFiles!} // TODO(workspace): remove ! when the field is made compulsory
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
  );
}
