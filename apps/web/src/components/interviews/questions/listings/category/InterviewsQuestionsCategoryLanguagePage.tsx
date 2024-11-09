'use client';

import { useState } from 'react';

import {
  useQuestionLanguagesData,
  useQuestionUserFacingFormatData,
} from '~/data/QuestionFormats';

import TabsUnderline from '~/components/ui/Tabs/TabsUnderline';

import InterviewsQuestionsCategoryPage from './InterviewsQuestionsCategoryPage';
import type {
  QuestionLanguage,
  QuestionMetadata,
  QuestionUserFacingFormat,
} from '../../common/QuestionsTypes';

type Props = Omit<
  React.ComponentProps<typeof InterviewsQuestionsCategoryPage>,
  'description' | 'framework' | 'questionList' | 'searchPlaceholder' | 'title'
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
  const formats = useQuestionUserFacingFormatData();
  const languages = useQuestionLanguagesData();
  const [selectedTab, setSelectedTab] = useState<QuestionUserFacingFormat>(
    formats.coding.value,
  );

  const filteredQuestions =
    selectedTab === formats.coding.value ? questionsCoding : questionsQuiz;

  const categoryTabs = (
    <TabsUnderline
      size="sm"
      tabs={[
        {
          label: formats.coding.label,
          value: formats.coding.value,
        },
        {
          label: formats.quiz.label,
          value: formats.quiz.value,
        },
      ]}
      value={selectedTab}
      onSelect={setSelectedTab}
    />
  );

  return (
    <InterviewsQuestionsCategoryPage
      categoryTabs={categoryTabs}
      description={languages[language].description}
      framework={language}
      questionList={filteredQuestions}
      searchPlaceholder={languages[language].searchPlaceholder}
      title={languages[language].longName}
      {...props}
    />
  );
}
