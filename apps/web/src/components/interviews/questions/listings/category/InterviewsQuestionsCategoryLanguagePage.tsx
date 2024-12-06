'use client';

import type { InterviewsListingBottomContent } from 'contentlayer/generated';
import { useState } from 'react';

import { useQuestionLanguagesData } from '~/data/QuestionCategories';

import { useIntl } from '~/components/intl';
import MDXContent from '~/components/mdx/MDXContent';
import Divider from '~/components/ui/Divider';
import TabsUnderline from '~/components/ui/Tabs/TabsUnderline';

import InterviewsQuestionsCategoryPage from './InterviewsQuestionsCategoryPage';
import type {
  QuestionLanguage,
  QuestionMetadata,
  QuestionUserFacingFormat,
} from '../../common/QuestionsTypes';

type Props = Omit<
  React.ComponentProps<typeof InterviewsQuestionsCategoryPage>,
  | 'category'
  | 'categoryValue'
  | 'description'
  | 'questionList'
  | 'searchPlaceholder'
  | 'title'
> &
  Readonly<{
    bottomContent?: InterviewsListingBottomContent;
    language: QuestionLanguage;
    questionsCoding: ReadonlyArray<QuestionMetadata>;
    questionsQuiz: ReadonlyArray<QuestionMetadata>;
  }>;

export default function InterviewsQuestionsCategoryLanguagePage({
  language,
  questionsCoding,
  questionsQuiz,
  bottomContent,
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
    <div className="flex flex-col gap-20">
      <InterviewsQuestionsCategoryPage
        category="language"
        categoryTabs={categoryTabs}
        categoryValue={language}
        description={languages[language].getDescription(totalQuestionsCount)}
        questionList={filteredQuestions}
        searchPlaceholder={languages[language].getSearchPlaceholder(
          totalQuestionsCount,
        )}
        selectedCategoryTab={selectedTab}
        title={languages[language].longName}
        {...props}
      />
      {bottomContent && (
        <>
          <Divider />
          <MDXContent
            components={{
              QuestionsCount: () => <span>{totalQuestionsCount}</span>,
              QuizQuestionsCount: () => <span>{questionsQuiz.length}</span>,
            }}
            mdxCode={bottomContent.body.code}
          />
        </>
      )}
    </div>
  );
}
