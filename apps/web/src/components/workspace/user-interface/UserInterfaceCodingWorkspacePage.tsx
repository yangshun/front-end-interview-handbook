'use client';

import type {
  QuestionMetadata,
  QuestionUserInterfaceV2,
} from '~/components/questions/common/QuestionsTypes';
import type { QuestionUserInterfaceMode } from '~/components/questions/common/QuestionUserInterfacePath';
import sandpackProviderOptions from '~/components/questions/evaluator/sandpackProviderOptions';
import UserInterfaceCodingWorkspace from '~/components/workspace/user-interface/UserInterfaceCodingWorkspace';

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
  const files =
    mode === 'practice'
      ? question.skeletonBundle?.files
      : question.solutionBundle?.files;
  const writeup =
    mode === 'practice' ? question.description : question.solution;
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
          'sp-wrapper': '!w-full !h-screen',
        },
        visibleFiles: workspace?.visibleFiles ?? undefined,
      }}
      theme="dark">
      <UserInterfaceCodingWorkspace
        canViewPremiumContent={canViewPremiumContent}
        defaultFiles={files!} // TODO(redesign): remove when the field is made compulsory
        framework={question.framework}
        metadata={question.metadata}
        mode={mode}
        nextQuestions={nextQuestions}
        similarQuestions={similarQuestions}
        workspace={workspace!} // TODO(redesign): remove when the field is made compulsory
        writeup={writeup}
      />
    </SandpackProvider>
  );
}
