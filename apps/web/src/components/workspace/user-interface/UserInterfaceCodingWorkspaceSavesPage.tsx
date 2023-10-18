'use client';

import clsx from 'clsx';

import footerlessContainerHeight from '~/components/common/FooterlessContainerHeight';
import CodingPreferencesProvider from '~/components/global/CodingPreferencesProvider';
import { useAppThemePreferences } from '~/components/global/dark/AppThemePreferencesProvider';
import type {
  QuestionFramework,
  QuestionMetadata,
  QuestionUserInterface,
} from '~/components/questions/common/QuestionsTypes';
import {
  questionUserInterfaceDescriptionPath,
  questionUserInterfaceSolutionPath,
} from '~/components/questions/content/user-interface/QuestionUserInterfaceRoutes';
import sandpackProviderOptions from '~/components/workspace/common/sandpack/sandpackProviderOptions';

import { useI18nRouter } from '~/next-i18nostic/src';

import UserInterfaceCodingWorkspace from './UserInterfaceCodingWorkspace';
import { UserInterfaceCodingWorkspaceSavesContextProvider } from './UserInterfaceCodingWorkspaceSaveContext';
import SandpackTimeoutLogger from '../common/sandpack/SandpackTimeoutLogger';

import { SandpackProvider } from '@codesandbox/sandpack-react';
import type { QuestionUserInterfaceSave } from '@prisma/client';

type Props = Readonly<{
  canViewPremiumContent: boolean;
  embed?: boolean;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  question: QuestionUserInterface;
  save: QuestionUserInterfaceSave;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
}>;

export default function UserInterfaceCodingWorkspaceSavesPage({
  canViewPremiumContent,
  nextQuestions,
  question,
  save,
  similarQuestions,
  embed = false,
}: Props) {
  const router = useI18nRouter();
  const { metadata, skeletonBundle } = question;

  const { appTheme } = useAppThemePreferences();

  const { files: defaultFiles, workspace } = skeletonBundle;

  return (
    <CodingPreferencesProvider>
      <UserInterfaceCodingWorkspaceSavesContextProvider save={save}>
        <SandpackProvider
          customSetup={{
            environment: workspace?.environment,
          }}
          files={JSON.parse(save.files)}
          options={{
            ...sandpackProviderOptions,
            activeFile: workspace?.activeFile,
            classes: {
              'sp-input': 'touch-none select-none pointer-events-none',
              'sp-layout': 'h-full',
              'sp-stack': 'h-full',
              'sp-wrapper': clsx(
                '!w-full !text-sm flex-1',
                '!bg-neutral-50 dark:!bg-[#070708] !pt-3',
              ),
            },
            visibleFiles: workspace?.visibleFiles ?? undefined,
          }}
          style={{
            height: footerlessContainerHeight,
          }}
          theme={appTheme === 'dark' ? 'dark' : undefined}>
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
          <SandpackTimeoutLogger instance="workspace.ui.saves" />
        </SandpackProvider>
      </UserInterfaceCodingWorkspaceSavesContextProvider>
    </CodingPreferencesProvider>
  );
}
