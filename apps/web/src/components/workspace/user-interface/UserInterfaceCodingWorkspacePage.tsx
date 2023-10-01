'use client';

import type {
  QuestionFramework,
  QuestionMetadata,
  QuestionUserInterfaceV2,
} from '~/components/questions/common/QuestionsTypes';
import type { QuestionUserInterfaceMode } from '~/components/questions/common/QuestionUserInterfacePath';
import {
  questionUserInterfaceDescriptionPath,
  questionUserInterfaceSolutionPath,
} from '~/components/questions/content/user-interface/QuestionUserInterfaceRoutes';

import { useI18nRouter } from '~/next-i18nostic/src';

import UserInterfaceCodingWorkspaceSection from './UserInterfaceCodingWorkspaceSection';

type Props = Readonly<{
  canViewPremiumContent: boolean;
  embed?: boolean;
  mode: QuestionUserInterfaceMode;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  question: QuestionUserInterfaceV2;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
}>;

export default function UserInterfaceCodingWorkspacePage(props: Props) {
  const router = useI18nRouter();
  const {
    question: { metadata },
  } = props;

  return (
    <UserInterfaceCodingWorkspaceSection
      {...props}
      embed={false}
      fillViewportHeight={true}
      timeoutLoggerInstance="workspace.ui"
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
            ? questionUserInterfaceDescriptionPath(metadata, frameworkValue)
            : questionUserInterfaceSolutionPath(metadata, frameworkValue),
        );
      }}
    />
  );
}
