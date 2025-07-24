import { SandpackProvider } from '@codesandbox/sandpack-react';
import clsx from 'clsx';

import CodingPreferencesProvider from '~/components/global/CodingPreferencesProvider';
import { useColorSchemePreferences } from '~/components/global/color-scheme/ColorSchemePreferencesProvider';
import type {
  QuestionCodingWorkingLanguage,
  QuestionJavaScript,
  QuestionMetadata,
} from '~/components/interviews/questions/common/QuestionsTypes';
import { SandpackTimeout } from '~/components/workspace/common/sandpack/SandpackTimeout';
import JavaScriptCodingWorkspace from '~/components/workspace/javascript/JavaScriptCodingWorkspace';
import { loadLocalJavaScriptQuestionCode } from '~/components/workspace/javascript/JavaScriptCodingWorkspaceCodeStorage';

import SandpackObservability from '../common/sandpack/SandpackObservability';
import { useSandpackBundlerURL } from '../common/sandpack/useSandpackBundlerURL';

type Props = Readonly<{
  canViewPremiumContent: boolean;
  embed?: boolean;
  language: QuestionCodingWorkingLanguage;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  onLanguageChange: (language: QuestionCodingWorkingLanguage) => void;
  question: QuestionJavaScript;
  sandpackO11yInstance: string;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
  studyListKey?: string;
}>;

export default function JavaScriptCodingWorkspaceSection({
  canViewPremiumContent,
  embed = false,
  language,
  nextQuestions,
  onLanguageChange,
  question,
  sandpackO11yInstance,
  similarQuestions,
  studyListKey,
}: Props) {
  const { colorScheme } = useColorSchemePreferences();
  const [bundlerURL, changeToFallbackUrl] =
    useSandpackBundlerURL(sandpackO11yInstance);

  const { files, skeleton, workspace } = question;
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
        // Remount if the bundler URL changes
        key={bundlerURL}
        customSetup={{
          environment: 'parcel',
        }}
        files={finalFiles}
        options={{
          bundlerURL,
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
        <SandpackTimeout
          instance={sandpackO11yInstance}
          onTimeout={() => changeToFallbackUrl('timeout')}
        />
        <SandpackObservability
          bundlerURL={bundlerURL}
          instance={sandpackO11yInstance}
        />
      </SandpackProvider>
    </CodingPreferencesProvider>
  );
}
