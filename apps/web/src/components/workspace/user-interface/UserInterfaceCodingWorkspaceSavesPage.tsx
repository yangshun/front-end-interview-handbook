'use client';

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
import sandpackProviderOptions from '~/components/workspace/common/sandpack/sandpackProviderOptions';

import { useI18nRouter } from '~/next-i18nostic/src';

import UserInterfaceCodingWorkspace from './UserInterfaceCodingWorkspace';
import { UserInterfaceCodingWorkspaceSavesContextProvider } from './UserInterfaceCodingWorkspaceSaveContext';
import SandpackErrorReporting from '../common/sandpack/SandpackErrorReporting';

import { SandpackProvider } from '@codesandbox/sandpack-react';
import type { QuestionUserInterfaceSave } from '@prisma/client';

type Props = Readonly<{
  canViewPremiumContent: boolean;
  embed?: boolean;
  isViewingSave: boolean;
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
  isViewingSave,
  similarQuestions,
  embed = false,
}: Props) {
  const router = useI18nRouter();
  const { metadata, skeletonBundle } = question;

  const { colorScheme } = useColorSchemePreferences();

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
            isViewingSave={isViewingSave}
            loadedFilesFromLocalStorage={false}
            mode="practice"
            nextQuestions={nextQuestions}
            question={question}
            saveFilesToLocalStorage={false}
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
          <SandpackErrorReporting instance="workspace.ui.saves" />
        </SandpackProvider>
      </UserInterfaceCodingWorkspaceSavesContextProvider>
    </CodingPreferencesProvider>
  );
}
