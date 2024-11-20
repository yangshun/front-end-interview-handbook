'use client';

import { useState } from 'react';

import { useQuestionFrameworksData } from '~/data/QuestionLists';

import type { GuideCardMetadata } from '~/components/guides/types';
import { useIntl } from '~/components/intl';
import TabsUnderline from '~/components/ui/Tabs/TabsUnderline';

import InterviewsQuestionsCategoryPage from './InterviewsQuestionsCategoryPage';
import type {
  QuestionFramework,
  QuestionMetadata,
  QuestionUserFacingFormat,
} from '../../common/QuestionsTypes';

type Props = Omit<
  React.ComponentProps<typeof InterviewsQuestionsCategoryPage>,
  | 'description'
  | 'frameworkOrLanguage'
  | 'questionList'
  | 'searchPlaceholder'
  | 'title'
> &
  Readonly<{
    framework: QuestionFramework;
    guides: ReadonlyArray<GuideCardMetadata>;
    questionsCoding: ReadonlyArray<QuestionMetadata>;
    questionsQuiz: ReadonlyArray<QuestionMetadata>;
  }>;

export default function InterviewsQuestionsCategoryFrameworkPage({
  framework,
  questionsCoding,
  questionsQuiz,
  ...props
}: Props) {
  const intl = useIntl();
  const frameworks = useQuestionFrameworksData();
  const [selectedTab, setSelectedTab] =
    useState<QuestionUserFacingFormat>('coding');

  const filteredQuestions =
    selectedTab === 'coding' ? questionsCoding : questionsQuiz;

  const categoryTabs = (
    <TabsUnderline
      size="sm"
      tabs={[
        {
          label: intl.formatMessage({
            defaultMessage: 'Coding',
            description: 'Question format',
            id: 'eJU0PN',
          }),
          value: 'coding',
        },
        {
          label: intl.formatMessage({
            defaultMessage: 'Quiz',
            description: 'Question format',
            id: 'doY6Fg',
          }),
          value: 'quiz',
        },
      ]}
      value={selectedTab}
      onSelect={setSelectedTab}
    />
  );

  const totalQuestionsCount = questionsCoding.length + questionsQuiz.length;

  return (
    <InterviewsQuestionsCategoryPage
      categoryTabs={questionsQuiz.length > 0 ? categoryTabs : undefined}
      description={frameworks[framework].getDescription(totalQuestionsCount)}
      frameworkOrLanguage={framework}
      questionList={filteredQuestions}
      searchPlaceholder={frameworks[framework].getSearchPlaceholder(
        totalQuestionsCount,
      )}
      title={frameworks[framework].longName}
      {...props}
    />
  );
}
