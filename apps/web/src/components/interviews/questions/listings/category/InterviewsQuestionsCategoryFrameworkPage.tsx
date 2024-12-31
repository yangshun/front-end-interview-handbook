'use client';

import type { InterviewsListingBottomContent } from 'contentlayer/generated';

import {
  useQuestionFormatsData,
  useQuestionFrameworksData,
} from '~/data/QuestionCategories';

import type { GuideCardMetadata } from '~/components/guides/types';
import { useIntl } from '~/components/intl';
import MDXContent from '~/components/mdx/MDXContent';
import Divider from '~/components/ui/Divider';
import TabsUnderline from '~/components/ui/Tabs/TabsUnderline';

import InterviewsQuestionsCategoryPage from './InterviewsQuestionsCategoryPage';
import type {
  QuestionFramework,
  QuestionMetadata,
  QuestionUserFacingFormat,
} from '../../common/QuestionsTypes';

type Props = Omit<
  React.ComponentProps<typeof InterviewsQuestionsCategoryPage>,
  | 'category'
  | 'categoryValue'
  | 'description'
  | 'list'
  | 'questionList'
  | 'searchPlaceholder'
  | 'title'
> &
  Readonly<{
    bottomContent?: InterviewsListingBottomContent;
    framework: QuestionFramework;
    guides: ReadonlyArray<GuideCardMetadata>;
    questions: ReadonlyArray<QuestionMetadata>;
    totalQuestionsCount: number;
    userFacingFormat?: QuestionUserFacingFormat;
  }>;

export default function InterviewsQuestionsCategoryFrameworkPage({
  framework,
  questions,
  bottomContent,
  userFacingFormat = 'coding',
  totalQuestionsCount,
  ...props
}: Props) {
  const intl = useIntl();
  const frameworks = useQuestionFrameworksData();
  const questionFormats = useQuestionFormatsData();

  const categoryTabs = (
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
      value={userFacingFormat ?? 'coding'}
    />
  );

  return (
    <div className="flex flex-col gap-20">
      <InterviewsQuestionsCategoryPage
        categoryTabs={categoryTabs}
        description={frameworks[framework].getDescription(totalQuestionsCount)}
        listType={{ type: 'framework', value: framework }}
        questionList={questions}
        searchPlaceholder={frameworks[framework].getSearchPlaceholder(
          totalQuestionsCount,
        )}
        selectedCategoryTab={userFacingFormat}
        title={frameworks[framework].longName}
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
