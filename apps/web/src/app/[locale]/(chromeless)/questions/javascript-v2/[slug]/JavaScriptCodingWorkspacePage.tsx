'use client';

import type { QuestionJavaScriptV2 } from '~/components/questions/common/QuestionsTypes';
import JavaScriptCodingWorkspace from '~/components/workspace/javascript/JavaScriptCodingWorkspace';

import { SandpackProvider } from '@codesandbox/sandpack-react';

type Props = Readonly<{
  question: QuestionJavaScriptV2;
}>;

export default function JavaScriptPage({ question }: Props) {
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
        defaultFiles={finalFiles}
        defaultLanguage={language}
        description={description}
        metadata={metadata}
        skeleton={skeleton}
        solution={solution}
        workspace={workspace}
      />
    </SandpackProvider>
  );
}
