import { SandpackProvider } from '@codesandbox/sandpack-react';
import clsx from 'clsx';

import CodingPreferencesProvider from '~/components/global/CodingPreferencesProvider';
import { useColorSchemePreferences } from '~/components/global/color-scheme/ColorSchemePreferencesProvider';
import type {
  InterviewsQuestionItemJavaScript,
  InterviewsQuestionItemMinimal,
  QuestionCodingWorkingLanguage,
} from '~/components/interviews/questions/common/QuestionsTypes';
import sandpackProviderOptions from '~/components/workspace/common/sandpack/sandpackProviderOptions';
import JavaScriptCodingWorkspace from '~/components/workspace/javascript/JavaScriptCodingWorkspace';
import { loadLocalJavaScriptQuestionCode } from '~/components/workspace/javascript/JavaScriptCodingWorkspaceCodeStorage';

import SandpackErrorReporting from '../common/sandpack/SandpackErrorReporting';

type Props = Readonly<{
  canViewPremiumContent: boolean;
  embed?: boolean;
  language: QuestionCodingWorkingLanguage;
  nextQuestions: ReadonlyArray<InterviewsQuestionItemMinimal>;
  onLanguageChange: (language: QuestionCodingWorkingLanguage) => void;
  question: InterviewsQuestionItemJavaScript;
  similarQuestions: ReadonlyArray<InterviewsQuestionItemMinimal>;
  studyListKey?: string;
  timeoutLoggerInstance: string;
}>;

export default function JavaScriptCodingWorkspaceSection({
  canViewPremiumContent,
  embed = false,
  question,
  nextQuestions,
  similarQuestions,
  onLanguageChange,
  language,
  studyListKey,
  timeoutLoggerInstance,
}: Props) {
  const { colorScheme } = useColorSchemePreferences();

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
              embed
                ? '!h-full'
                : '!bg-neutral-50 dark:!bg-[#070708] lg:!pt-3 lg:!h-[calc(100vh_-_var(--global-sticky-height))]',
            ),
          },
          visibleFiles: [workspace.main, workspace.run],
        }}
        theme={colorScheme === 'dark' ? 'dark' : undefined}>
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
          studyListKey={studyListKey}
          workspace={workspace}
          onLanguageChange={onLanguageChange}
        />
        <SandpackErrorReporting instance={timeoutLoggerInstance} />
      </SandpackProvider>
    </CodingPreferencesProvider>
  );
}
