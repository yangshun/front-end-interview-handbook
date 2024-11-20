'use client';

import { useState } from 'react';

import { useQuestionLanguagesData } from '~/data/QuestionLists';

import { useIntl } from '~/components/intl';
import TabsUnderline from '~/components/ui/Tabs/TabsUnderline';

import InterviewsQuestionsCategoryPage from './InterviewsQuestionsCategoryPage';
import type {
  QuestionLanguage,
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
    language: QuestionLanguage;
    questionsCoding: ReadonlyArray<QuestionMetadata>;
    questionsQuiz: ReadonlyArray<QuestionMetadata>;
  }>;

export default function InterviewsQuestionsCategoryLanguagePage({
  language,
  questionsCoding,
  questionsQuiz,
  ...props
}: Props) {
  const intl = useIntl();
  const languages = useQuestionLanguagesData();
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
      categoryTabs={categoryTabs}
      description={languages[language].getDescription(totalQuestionsCount)}
      frameworkOrLanguage={language}
      questionList={filteredQuestions}
      searchPlaceholder={languages[language].getSearchPlaceholder(
        totalQuestionsCount,
      )}
      selectedCategoryTab={selectedTab}
      title={languages[language].longName}
      {...props}
    />
  );
}
