'use client';

import { SandpackProvider } from '@codesandbox/sandpack-react';
import type { QuestionUserInterfaceSave } from '@prisma/client';
import clsx from 'clsx';

import CodingPreferencesProvider from '~/components/global/CodingPreferencesProvider';
import { useColorSchemePreferences } from '~/components/global/color-scheme/ColorSchemePreferencesProvider';
import type {
  QuestionFramework,
  QuestionMetadata,
  QuestionUserInterface,
} from '~/components/interviews/questions/common/QuestionsTypes';
import {
  questionUserInterfaceDescriptionPath,
  questionUserInterfaceSolutionPath,
} from '~/components/interviews/questions/content/user-interface/QuestionUserInterfaceRoutes';
import SandpackObservability from '~/components/workspace/common/sandpack/SandpackObservability';
import { SandpackTimeout } from '~/components/workspace/common/sandpack/SandpackTimeout';
import { useSandpackBundlerURL } from '~/components/workspace/common/sandpack/useSandpackBundlerURL';

import { useI18nRouter } from '~/next-i18nostic/src';

import UserInterfaceCodingWorkspace from './UserInterfaceCodingWorkspace';
import { UserInterfaceCodingWorkspaceSavesContextProvider } from './UserInterfaceCodingWorkspaceSaveContext';

type Props = Readonly<{
  canViewPremiumContent: boolean;
  embed?: boolean;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  question: QuestionUserInterface;
  save: QuestionUserInterfaceSave;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
}>;

const sandpackO11yInstance = 'workspace.ui.saves';

export default function UserInterfaceCodingWorkspaceSavesPage({
  canViewPremiumContent,
  embed = false,
  nextQuestions,
  question,
  save,
  similarQuestions,
}: Props) {
  const router = useI18nRouter();
  const { colorScheme } = useColorSchemePreferences();
  const [bundlerURL, changeToFallbackUrl] =
    useSandpackBundlerURL(sandpackO11yInstance);

  const { metadata, skeletonBundle } = question;
  const { files: defaultFiles, workspace } = skeletonBundle;

  return (
    <CodingPreferencesProvider>
      <UserInterfaceCodingWorkspaceSavesContextProvider save={save}>
        <SandpackProvider
          // Remount if the bundler URL changes
          key={bundlerURL}
          customSetup={{
            environment: workspace?.environment,
          }}
          files={JSON.parse(save.files)}
          options={{
            activeFile: workspace?.activeFile,
            bundlerURL,
            classes: {
              'sp-input': 'touch-none select-none pointer-events-none',
              'sp-layout': 'h-full',
              'sp-stack': 'h-full',
              'sp-wrapper': clsx(
                '!w-full !text-sm flex-1',
                '!bg-neutral-50 dark:!bg-[#070708] !pt-3 !h-[calc(100vh_-_var(--global-sticky-height))]',
              ),
            },
            visibleFiles: workspace?.visibleFiles ?? undefined,
          }}
          theme={colorScheme === 'dark' ? 'dark' : undefined}>
          <UserInterfaceCodingWorkspace
            activeTabScrollIntoView={true}
            canViewPremiumContent={canViewPremiumContent}
            defaultFiles={defaultFiles}
            embed={embed}
            loadedFilesFromLocalStorage={false}
            mode="practice"
            nextQuestions={nextQuestions}
            question={question}
            similarQuestions={similarQuestions}
            onFrameworkChange={(value, contentType) => {
              const frameworkValue = value as QuestionFramework;
              const frameworkItem = metadata.frameworks.find(
                ({ framework: frameworkItemValue }) =>
                  frameworkItemValue === frameworkValue,
              );

              if (frameworkItem == null) {
                return;
              }

              // TODO(interviews): support study list URLs for cloud save pages
              router.push(
                contentType === 'description'
                  ? questionUserInterfaceDescriptionPath(
                      metadata,
                      frameworkValue,
                    )
                  : questionUserInterfaceSolutionPath(metadata, frameworkValue),
              );
            }}
          />
          <SandpackTimeout
            instance={sandpackO11yInstance}
            onTimeout={changeToFallbackUrl}
          />
          <SandpackObservability
            bundlerURL={bundlerURL}
            instance={sandpackO11yInstance}
          />
        </SandpackProvider>
      </UserInterfaceCodingWorkspaceSavesContextProvider>
    </CodingPreferencesProvider>
  );
}
