import { SandpackProvider } from '@codesandbox/sandpack-react';
import clsx from 'clsx';
import { NavigationGuardProvider } from 'next-navigation-guard';
import { type ComponentType, useRef } from 'react';
import { Provider } from 'react-redux';

import CodingPreferencesProvider from '~/components/global/CodingPreferencesProvider';
import { useColorSchemePreferences } from '~/components/global/color-scheme/ColorSchemePreferencesProvider';
import type {
  QuestionJavaScript,
  QuestionMetadata,
} from '~/components/interviews/questions/common/QuestionsTypes';
import type { JavaScriptWorkspaceRenderProps } from '~/components/workspace/javascript/JavaScriptCodingWorkspace';
import JavaScriptCodingWorkspace from '~/components/workspace/javascript/JavaScriptCodingWorkspace';
import type { JavaScriptCodingWorkspaceStore } from '~/components/workspace/javascript/store/javascript-store';

import SandpackObservability from '../common/sandpack/SandpackObservability';
import { useSandpackBundlerURL } from '../common/sandpack/useSandpackBundlerURL';
import {
  javaScriptCodingWorkspaceGetInitialFiles,
  javascriptCodingWorkspaceGetInitialSandpackState,
} from './javascriptCodingWorkspaceGetInitialFiles';
import { loadJavaScriptCodingWorkspaceWorkingLanguage } from './JavaScriptCodingWorkspaceWorkingLanguageStorage';
import { makeJavaScriptCodingWorkspaceStore } from './store/javascript-store';

type Props = Readonly<{
  activeTabScrollIntoView?: boolean;
  canViewPremiumContent: boolean;
  embed?: boolean;
  isUserAgentTablet?: boolean;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  question: QuestionJavaScript;
  renderWorkspace: ComponentType<JavaScriptWorkspaceRenderProps>;
  sandpackO11yInstance: string;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
  studyListKey?: string;
}>;

export default function JavaScriptCodingWorkspaceSection({
  activeTabScrollIntoView = true,
  canViewPremiumContent,
  embed = false,
  isUserAgentTablet = false,
  nextQuestions,
  question,
  renderWorkspace,
  sandpackO11yInstance,
  similarQuestions,
  studyListKey,
}: Props) {
  const { workspace } = question;
  const { colorScheme } = useColorSchemePreferences();
  const bundlerURL = useSandpackBundlerURL(sandpackO11yInstance);
  const language = loadJavaScriptCodingWorkspaceWorkingLanguage();
  const { files } = javaScriptCodingWorkspaceGetInitialFiles({
    language,
    question,
  });
  const sandpackState = javascriptCodingWorkspaceGetInitialSandpackState({
    language,
    question,
  });

  // It is necessary to preloaded state to make it work properly on first mount as well.
  // E.g. In multiple places in JavaScriptCodingWorkspace, it need to access data like
  // visibleFiles, activeFile etc. when it mount for the first time to set the tiles layout.
  const storeRef = useRef<JavaScriptCodingWorkspaceStore>(
    makeJavaScriptCodingWorkspaceStore({
      sandpack: sandpackState,
      workspace: {
        language,
        question,
        testFocus: null,
      },
    }),
  );

  return (
    <Provider store={storeRef.current}>
      <NavigationGuardProvider>
        <CodingPreferencesProvider>
          <SandpackProvider
            // Remount if the bundler URL changes
            key={bundlerURL}
            customSetup={{
              environment: 'parcel',
            }}
            files={files}
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
                    : [
                        '!bg-neutral-50 dark:!bg-[#070708]',
                        'lg:!h-[calc(100vh_-_var(--global-sticky-height))] h-full',
                      ],
                ),
              },
              visibleFiles: [workspace.main, workspace.run],
            }}
            theme={colorScheme === 'dark' ? 'dark' : undefined}>
            <JavaScriptCodingWorkspace
              activeTabScrollIntoView={activeTabScrollIntoView}
              canViewPremiumContent={canViewPremiumContent}
              embed={embed}
              isUserAgentTablet={isUserAgentTablet}
              nextQuestions={nextQuestions}
              question={question}
              renderWorkspace={renderWorkspace}
              similarQuestions={similarQuestions}
              studyListKey={studyListKey}
            />
            <SandpackObservability
              bundlerURL={bundlerURL}
              instance={sandpackO11yInstance}
            />
          </SandpackProvider>
        </CodingPreferencesProvider>
      </NavigationGuardProvider>
    </Provider>
  );
}
