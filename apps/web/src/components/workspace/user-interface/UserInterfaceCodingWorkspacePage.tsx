'use client';

import { questionHrefWithListType } from '~/components/interviews/questions/common/QuestionHrefUtils';
import type {
  QuestionFramework,
  QuestionMetadata,
  QuestionUserInterface,
} from '~/components/interviews/questions/common/QuestionsTypes';
import type { QuestionUserInterfaceMode } from '~/components/interviews/questions/common/QuestionUserInterfacePath';
import {
  questionUserInterfaceDescriptionPath,
  questionUserInterfaceSolutionPath,
} from '~/components/interviews/questions/content/user-interface/QuestionUserInterfaceRoutes';
import { useQuestionsListTypeCurrent } from '~/components/interviews/questions/listings/utils/useQuestionsListDataForType';

import { useI18nRouter } from '~/next-i18nostic/src';

import UserInterfaceCodingWorkspaceSection from './UserInterfaceCodingWorkspaceSection';

type Props = Readonly<{
  canViewPremiumContent: boolean;
  embed?: boolean;
  mode: QuestionUserInterfaceMode;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  question: QuestionUserInterface;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
  studyListKey?: string;
}>;

export default function UserInterfaceCodingWorkspacePage({
  studyListKey,
  ...props
}: Props) {
  const router = useI18nRouter();
  const {
    question: { metadata },
  } = props;

  const listType = useQuestionsListTypeCurrent(studyListKey);

  return (
    <UserInterfaceCodingWorkspaceSection
      {...props}
      embed={false}
      sandpackO11yInstance="workspace.ui"
      studyListKey={studyListKey}
      onFrameworkChange={(value, contentType) => {
        const frameworkValue = value as QuestionFramework;
        const frameworkItem = metadata.frameworks.find(
          ({ framework: frameworkItemValue }) =>
            frameworkItemValue === frameworkValue,
        );

        if (frameworkItem == null) {
          return;
        }

        const href =
          contentType === 'description'
            ? questionUserInterfaceDescriptionPath(metadata, frameworkValue)
            : questionUserInterfaceSolutionPath(metadata, frameworkValue);

        router.push(questionHrefWithListType(href, listType));
      }}
    />
  );
}
