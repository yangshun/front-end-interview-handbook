'use client';

import { useState } from 'react';

import {
  useQuestionTechnologyLists,
  useQuestionUserFacingFormatData,
} from '~/data/QuestionFormats';

import TabsUnderline from '~/components/ui/Tabs/TabsUnderline';

import InterviewsQuestionsFrameworkPage from './InterviewsQuestionsFrameworkPage';
import type {
  QuestionLanguage,
  QuestionMetadata,
  QuestionUserFacingFormat,
} from '../../common/QuestionsTypes';

type Props = Omit<
  React.ComponentProps<typeof InterviewsQuestionsFrameworkPage>,
  'description' | 'framework' | 'questionList' | 'searchPlaceholder' | 'title'
> &
  Readonly<{
    language: QuestionLanguage;
    questionsCoding: ReadonlyArray<QuestionMetadata>;
    questionsQuiz: ReadonlyArray<QuestionMetadata>;
  }>;

export default function InterviewsQuestionsFrameworkLanguagePage({
  language,
  questionsCoding,
  questionsQuiz,
  ...props
}: Props) {
  const formats = useQuestionUserFacingFormatData();
  const tech = useQuestionTechnologyLists();
  const [selectedTab, setSelectedTab] = useState<QuestionUserFacingFormat>(
    formats.coding.id,
  );

  const filteredQuestions =
    selectedTab === formats.coding.id ? questionsCoding : questionsQuiz;

  const categoryTabs = (
    <TabsUnderline
      size="sm"
      tabs={[
        {
          label: formats.coding.label,
          value: formats.coding.id,
        },
        {
          label: formats.quiz.label,
          value: formats.quiz.id,
        },
      ]}
      value={selectedTab}
      onSelect={setSelectedTab}
    />
  );

  return (
    <InterviewsQuestionsFrameworkPage
      categoryTabs={categoryTabs}
      description={tech[language].description}
      framework={language}
      questionList={filteredQuestions}
      searchPlaceholder={tech[language].searchPlaceholder}
      title={tech[language].longName}
      {...props}
    />
  );
}
