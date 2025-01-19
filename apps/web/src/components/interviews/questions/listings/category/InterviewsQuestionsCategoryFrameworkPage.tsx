'use client';

import type { InterviewsListingBottomContent } from 'contentlayer/generated';

import {
  useQuestionFormatsData,
  useQuestionFrameworksData,
} from '~/data/QuestionCategories';

import type { GuideCardMetadata } from '~/components/guides/types';
import type { QuestionListFeature } from '~/components/interviews/common/useInterviewsQuestionsFeatures';
import useInterviewsQuestionsFeatures from '~/components/interviews/common/useInterviewsQuestionsFeatures';
import { useIntl } from '~/components/intl';
import MDXContent from '~/components/mdx/MDXContent';
import Divider from '~/components/ui/Divider';
import TabsUnderline from '~/components/ui/Tabs/TabsUnderline';

import InterviewsQuestionsCategoryPage from './InterviewsQuestionsCategoryPage';
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
  showCategoryTabs = true,
  bottomContent,
  totalQuestionsCount,
  listType,
  ...props
}: Props) {
  const intl = useIntl();
  const frameworks = useQuestionFrameworksData();
  const questionFormats = useQuestionFormatsData();

  const categoryTabs = showCategoryTabs ? (
    <TabsUnderline
      size="sm"
      tabs={[
        {
          href: frameworks[framework].href,
          label: intl.formatMessage({
            defaultMessage: 'Coding',
            description: 'Question format',
            id: 'eJU0PN',
          }),
          value: 'coding',
        },
        {
          href: `${frameworks[framework].href}/quiz`,
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
          description ??
          frameworks[framework].getDescription(totalQuestionsCount)
        }
        features={featureItems}
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
