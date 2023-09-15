'use client';

import type { QuestionJavaScriptV2 } from '~/components/questions/common/QuestionsTypes';
import JavaScriptCodingWorkspace from '~/components/workspace/javascript/JavaScriptCodingWorkspace';

import { SandpackProvider } from '@codesandbox/sandpack-react';

type Props = Readonly<{
  setup: QuestionJavaScriptV2;
}>;

export default function JavaScriptPage({ setup }: Props) {
  const { workspace, files, skeleton } = setup;
  const language = 'js' as const;
  const solution = files[workspace.main];

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
        skeleton={skeleton}
        solution={solution}
        workspace={workspace}
      />
    </SandpackProvider>
  );
}
