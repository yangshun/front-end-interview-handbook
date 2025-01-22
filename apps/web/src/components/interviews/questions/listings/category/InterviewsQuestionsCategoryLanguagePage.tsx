'use client';

import type { InterviewsListingBottomContent } from 'contentlayer/generated';

import { useQuestionLanguagesData } from '~/data/QuestionCategories';

import type { QuestionListFeature } from '~/components/interviews/common/useInterviewsQuestionsFeatures';
import useInterviewsQuestionsFeatures from '~/components/interviews/common/useInterviewsQuestionsFeatures';
import MDXContent from '~/components/mdx/MDXContent';
import Divider from '~/components/ui/Divider';

import InterviewsQuestionsCategoryPage from './InterviewsQuestionsCategoryPage';
import InterviewsQuestionsCategoryPracticeFormatTabs from './InterviewsQuestionsCategoryPracticeFormatTabs';
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
  const languages = useQuestionLanguagesData();

  const categoryTabs = showCategoryTabs ? (
    <InterviewsQuestionsCategoryPracticeFormatTabs
      baseHref={languages[language].href}
      listType={listType}
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
