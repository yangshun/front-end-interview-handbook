import clsx from 'clsx';

import footerlessContainerHeight from '~/components/common/FooterlessContainerHeight';
import CodingPreferencesProvider from '~/components/global/CodingPreferencesProvider';
import { useAppThemePreferences } from '~/components/global/dark/AppThemePreferencesProvider';
import type {
  QuestionCodingWorkingLanguage,
  QuestionJavaScript,
  QuestionMetadata,
} from '~/components/questions/common/QuestionsTypes';
import { loadLocalJavaScriptQuestionCode } from '~/components/workspace/javascript/JavaScriptCodingWorkspaceCodeStorage';
import sandpackProviderOptions from '~/components/workspace/common/sandpack/sandpackProviderOptions';
import JavaScriptCodingWorkspace from '~/components/workspace/javascript/JavaScriptCodingWorkspace';

import SandpackTimeoutLogger from '../common/sandpack/SandpackTimeoutLogger';

import { SandpackProvider } from '@codesandbox/sandpack-react';

type Props = Readonly<{
  canViewPremiumContent: boolean;
  embed?: boolean;
  language: QuestionCodingWorkingLanguage;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  onLanguageChange: (language: QuestionCodingWorkingLanguage) => void;
  question: QuestionJavaScript;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
  timeoutLoggerInstance: string;
}>;

export default function JavaScriptCodingWorkspaceSection({
  canViewPremiumContent,
  question,
  nextQuestions,
  similarQuestions,
  onLanguageChange,
  language,
  timeoutLoggerInstance,
  embed = false,
}: Props) {
  const { appTheme } = useAppThemePreferences();

  const { workspace, files, skeleton } = question;
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
            'sp-wrapper': clsx(
              '!w-full !text-sm',
              !embed && '!bg-neutral-50 dark:!bg-[#070708] !pt-3',
            ),
          },
          visibleFiles: [workspace.main, workspace.run],
        }}
        style={{
          height: embed ? '100%' : footerlessContainerHeight,
        }}
        theme={appTheme === 'dark' ? 'dark' : undefined}>
        <JavaScriptCodingWorkspace
          canViewPremiumContent={canViewPremiumContent}
          defaultFiles={skeletonFiles}
          embed={embed}
          language={language}
          loadedFilesFromLocalStorage={loadedFilesFromLocalStorage}
          nextQuestions={nextQuestions}
          question={question}
          similarQuestions={similarQuestions}
          skeleton={skeleton}
          workspace={workspace}
          onLanguageChange={onLanguageChange}
        />
        <SandpackTimeoutLogger instance={timeoutLoggerInstance} />
      </SandpackProvider>
    </CodingPreferencesProvider>
  );
}
