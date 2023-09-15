'use client';

import type {
  QuestionJavaScriptV2,
  QuestionMetadata,
} from '~/components/questions/common/QuestionsTypes';
import JavaScriptCodingWorkspace from '~/components/workspace/javascript/JavaScriptCodingWorkspace';

import { SandpackProvider } from '@codesandbox/sandpack-react';

type Props = Readonly<{
  canViewPremiumContent: boolean;
  isQuestionLockedForUser: boolean;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  question: QuestionJavaScriptV2;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
}>;

export default function JavaScriptCodingWorkspacePage({
  canViewPremiumContent,
  isQuestionLockedForUser,
  question,
  nextQuestions,
  similarQuestions,
}: Props) {
  const { description, workspace, files, skeleton, solution, metadata } =
    question;
  const language = 'js' as const;

  const finalFiles = {
    ...files,
    [workspace.main]: skeleton[language],
  };

  return (
    <SandpackProvider
      customSetup={{
        environment: 'parcel',
      }}
      files={finalFiles}
      options={{
        bundlerURL: 'https://bundler.greatfrontend.com',
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
        defaultLanguage={language}
        description={description}
        isQuestionLockedForUser={isQuestionLockedForUser}
        metadata={metadata}
        nextQuestions={nextQuestions}
        similarQuestions={similarQuestions}
        skeleton={skeleton}
        solution={solution}
        workspace={workspace}
      />
    </SandpackProvider>
  );
}
