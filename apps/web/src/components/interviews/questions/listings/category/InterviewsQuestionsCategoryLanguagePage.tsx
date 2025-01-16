'use client';

import type { InterviewsListingBottomContent } from 'contentlayer/generated';

import {
  useQuestionFormatsData,
  useQuestionLanguagesData,
} from '~/data/QuestionCategories';

import type { QuestionListFeature } from '~/components/interviews/common/useInterviewsQuestionsFeatures';
import useInterviewsQuestionsFeatures from '~/components/interviews/common/useInterviewsQuestionsFeatures';
import { useIntl } from '~/components/intl';
import MDXContent from '~/components/mdx/MDXContent';
import Divider from '~/components/ui/Divider';
import TabsUnderline from '~/components/ui/Tabs/TabsUnderline';

import InterviewsQuestionsCategoryPage from './InterviewsQuestionsCategoryPage';
import type {
  QuestionLanguage,
  QuestionMetadata,
} from '../../common/QuestionsTypes';

type Props = Omit<
  React.ComponentProps<typeof InterviewsQuestionsCategoryPage>,
  | 'description'
  | 'features'
  | 'formatTabs'
  | 'questionList'
  | 'searchPlaceholder'
  | 'title'
> &
  Readonly<{
    bottomContent?: InterviewsListingBottomContent;
    description?: string;
    features?: ReadonlyArray<QuestionListFeature>;
    language: QuestionLanguage;
    listType: React.ComponentProps<
      typeof InterviewsQuestionsCategoryPage
    >['listType'];
    questions: ReadonlyArray<QuestionMetadata>;
    showCategoryTabs?: boolean;
    title?: string;
    totalQuestionsCount: number;
  }>;

const defaultFeatures: ReadonlyArray<QuestionListFeature> = [
  'solvedByExInterviewers',
  'testCases',
  'codeInBrowser',
];

export default function InterviewsQuestionsCategoryLanguagePage({
  title,
  description,
  features = defaultFeatures,
  language,
  questions,
  listType,
  showCategoryTabs = true,
  bottomContent,
  totalQuestionsCount,
  ...props
}: Props) {
  const intl = useIntl();
  const languages = useQuestionLanguagesData();
  const questionFormats = useQuestionFormatsData();

  const categoryTabs = showCategoryTabs ? (
    <TabsUnderline
      size="sm"
      tabs={[
        {
          href: languages[language].href,
          label: intl.formatMessage({
            defaultMessage: 'Coding',
            description: 'Question format',
            id: 'eJU0PN',
          }),
          value: 'coding',
        },
        {
          href: `${languages[language].href}/quiz`,
          label: questionFormats.quiz.label,
          value: 'quiz',
        },
      ]}
      value={listType?.tab ?? 'coding'}
    />
  ) : null;

  const questionFeatures = useInterviewsQuestionsFeatures();
  const featureItems = features.map(
    (featureItem) => questionFeatures[featureItem],
  );

  return (
    <div className="flex flex-col gap-20">
      <InterviewsQuestionsCategoryPage
        categoryTabs={categoryTabs}
        description={
          description ?? languages[language].getDescription(totalQuestionsCount)
        }
        features={featureItems}
        listType={listType}
        questionList={questions}
        searchPlaceholder={languages[language].getSearchPlaceholder(
          totalQuestionsCount,
        )}
        title={title ?? languages[language].longName}
        {...props}
      />
      {bottomContent && (
        <>
          <Divider />
          <MDXContent
            components={{
              QuestionsCount: () => <span>{totalQuestionsCount}</span>,
            }}
            mdxCode={bottomContent.body.code}
          />
        </>
      )}
    </div>
  );
}
