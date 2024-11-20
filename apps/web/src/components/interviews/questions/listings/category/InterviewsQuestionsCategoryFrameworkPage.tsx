'use client';

import { useState } from 'react';

import { useQuestionFrameworksData } from '~/data/QuestionCategories';

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
  'category' | 'categoryValue' | 'description' | 'list' | 'questionList' | 'searchPlaceholder' | 'title'
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
      category="framework"
      categoryTabs={questionsQuiz.length > 0 ? categoryTabs : undefined}
      categoryValue={framework}
      description={frameworks[framework].getDescription(totalQuestionsCount)}
      questionList={filteredQuestions}
      searchPlaceholder={frameworks[framework].getSearchPlaceholder(
        totalQuestionsCount,
      )}
      title={frameworks[framework].longName}
      {...props}
    />
  );
}
