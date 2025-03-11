'use client';

import type { InterviewsListingBottomContent } from 'contentlayer/generated';

import { useQuestionFrameworksData } from '~/data/QuestionCategories';

import type { GuideCardMetadata } from '~/components/guides/types';
import type { QuestionListFeature } from '~/components/interviews/common/useInterviewsQuestionsFeatures';
import useInterviewsQuestionsFeatures from '~/components/interviews/common/useInterviewsQuestionsFeatures';
import MDXContent from '~/components/mdx/MDXContent';
import Divider from '~/components/ui/Divider';

import InterviewsQuestionsCategoryPage from './InterviewsQuestionsCategoryPage';
import InterviewsQuestionsCategoryPracticeFormatTabs from './InterviewsQuestionsCategoryPracticeFormatTabs';
import type {
  QuestionFramework,
  QuestionMetadata,
} from '../../common/QuestionsTypes';

type Props = Omit<
  React.ComponentProps<typeof InterviewsQuestionsCategoryPage>,
  | 'description'
  | 'features'
  | 'list'
  | 'questionList'
  | 'searchPlaceholder'
  | 'title'
> &
  Readonly<{
    bottomContent?: InterviewsListingBottomContent;
    description?: string;
    features?: ReadonlyArray<QuestionListFeature>;
    framework: QuestionFramework;
    guideCardDescription?: string;
    guideCardTitle?: string;
    guides: ReadonlyArray<GuideCardMetadata>;
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
  'testScenarios',
  'codeInBrowser',
];

export default function InterviewsQuestionsCategoryFrameworkPage({
  title,
  description,
  features = defaultFeatures,
  framework,
  questions,
  guideCardTitle,
  guideCardDescription,
  showCategoryTabs = true,
  bottomContent,
  totalQuestionsCount,
  listType,
  ...props
}: Props) {
  const frameworks = useQuestionFrameworksData();

  const categoryTabs = showCategoryTabs ? (
    <InterviewsQuestionsCategoryPracticeFormatTabs
      baseHref={frameworks[framework].href}
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
          description ??
          frameworks[framework].getDescription(totalQuestionsCount)
        }
        features={featureItems}
        guideCardDescription={guideCardDescription}
        guideCardTitle={guideCardTitle}
        listType={listType}
        questionList={questions}
        searchPlaceholder={frameworks[framework].getSearchPlaceholder(
          totalQuestionsCount,
        )}
        title={title ?? frameworks[framework].longName}
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
