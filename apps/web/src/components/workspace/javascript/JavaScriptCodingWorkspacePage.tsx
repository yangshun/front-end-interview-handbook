'use client';

import type {
  QuestionJavaScriptV2,
  QuestionMetadata,
} from '~/components/questions/common/QuestionsTypes';
import useJavaScriptQuestionCode from '~/components/questions/editor/useJavaScriptQuestionCode';
import sandpackProviderOptions from '~/components/questions/evaluator/sandpackProviderOptions';
import JavaScriptCodingWorkspace from '~/components/workspace/javascript/JavaScriptCodingWorkspace';

import useCodingWorkspaceWorkingLanguage from '../common/useCodingWorkspaceWorkingLanguage';

import { SandpackProvider } from '@codesandbox/sandpack-react';

type Props = Readonly<{
  canViewPremiumContent: boolean;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  question: QuestionJavaScriptV2;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
}>;

export default function JavaScriptCodingWorkspacePage({
  canViewPremiumContent,
  question,
  nextQuestions,
  similarQuestions,
}: Props) {
  const { workspace, files, skeleton, solution, metadata } = question;
  const [language] = useCodingWorkspaceWorkingLanguage();
  const { code } = useJavaScriptQuestionCode(
    question.metadata,
    language,
    question.skeleton,
  );

  const finalFiles = {
    ...files,
    [workspace.main]: code,
  };

  return (
    <SandpackProvider
      customSetup={{
        environment: 'parcel',
      }}
      files={finalFiles}
      options={{
        ...sandpackProviderOptions,
        classes: {
          'sp-input': 'touch-none select-none pointer-events-none',
          'sp-layout': 'h-full',
          'sp-stack': 'h-full',
          'sp-wrapper': '!w-full !h-screen',
        },
        visibleFiles: [workspace.main, workspace.run],
      }}
      theme="dark">
      <JavaScriptCodingWorkspace
        canViewPremiumContent={canViewPremiumContent}
        defaultFiles={finalFiles}
        nextQuestions={nextQuestions}
        question={question}
        similarQuestions={similarQuestions}
        skeleton={skeleton}
        workspace={workspace}
      />
    </SandpackProvider>
  );
}
