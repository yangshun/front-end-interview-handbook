'use client';

import CodingPreferencesProvider from '~/components/global/CodingPreferencesProvider';
import { useAppThemePreferences } from '~/components/global/dark/AppThemePreferencesProvider';
import type {
  QuestionJavaScriptV2,
  QuestionMetadata,
} from '~/components/questions/common/QuestionsTypes';
import { loadLocalJavaScriptQuestionCode } from '~/components/questions/editor/JavaScriptQuestionCodeStorage';
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
  const { appTheme } = useAppThemePreferences();
  const { workspace, files, skeleton } = question;
  const [language] = useCodingWorkspaceWorkingLanguage();
  const loadedCode = loadLocalJavaScriptQuestionCode(
    question.metadata,
    language,
  );
  const loadedFilesFromLocalStorage = loadedCode != null;

  const code = loadedCode ?? question.skeleton[language];

  const skeletonFiles = {
    ...files,
    [workspace.main]: question.skeleton[language],
  };

  const finalFiles = {
    ...files,
    [workspace.main]: code,
  };

  return (
    <CodingPreferencesProvider>
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
        theme={appTheme === 'dark' ? 'dark' : undefined}>
        <JavaScriptCodingWorkspace
          canViewPremiumContent={canViewPremiumContent}
          defaultFiles={skeletonFiles}
          loadedFilesFromLocalStorage={loadedFilesFromLocalStorage}
          nextQuestions={nextQuestions}
          question={question}
          similarQuestions={similarQuestions}
          skeleton={skeleton}
          workspace={workspace}
        />
      </SandpackProvider>
    </CodingPreferencesProvider>
  );
}
