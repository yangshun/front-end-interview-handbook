'use client';

import clsx from 'clsx';

import { useAppThemePreferences } from '~/components/global/dark/AppThemePreferencesProvider';
import type {
  QuestionMetadata,
  QuestionUserInterfaceV2,
} from '~/components/questions/common/QuestionsTypes';
import type { QuestionUserInterfaceMode } from '~/components/questions/common/QuestionUserInterfacePath';
import { loadLocalUserInterfaceQuestionCode } from '~/components/questions/editor/UserInterfaceQuestionCodeStorage';
import sandpackProviderOptions from '~/components/questions/evaluator/sandpackProviderOptions';
import UserInterfaceCodingWorkspace from '~/components/workspace/user-interface/UserInterfaceCodingWorkspace';

import SandpackTimeoutLogger from '../SandpackTimeoutLogger';

import { SandpackProvider } from '@codesandbox/sandpack-react';

type Props = Readonly<{
  canViewPremiumContent: boolean;
  mode: QuestionUserInterfaceMode;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  question: QuestionUserInterfaceV2;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
}>;

export default function UserInterfaceCodingWorkspacePage({
  canViewPremiumContent,
  mode,
  nextQuestions,
  question,
  similarQuestions,
}: Props) {
  const { appTheme } = useAppThemePreferences();
  const isDark = appTheme === 'dark';

  const loadedFiles = loadLocalUserInterfaceQuestionCode(question);
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
            '!w-full !text-sm',
            '!bg-neutral-50 dark:!bg-[#070708]',
          ),
        },
        visibleFiles: workspace?.visibleFiles ?? undefined,
      }}
      theme={appTheme === 'dark' ? 'dark' : undefined}>
      <UserInterfaceCodingWorkspace
        canViewPremiumContent={canViewPremiumContent}
        defaultFiles={defaultFiles!} // TODO(redesign): remove ! when the field is made compulsory
        loadedFilesFromLocalStorage={loadedFilesFromLocalStorage}
        mode={mode}
        nextQuestions={nextQuestions}
        question={question}
        similarQuestions={similarQuestions}
      />
      <SandpackTimeoutLogger instance="workspace.ui" />
    </SandpackProvider>
  );
}
