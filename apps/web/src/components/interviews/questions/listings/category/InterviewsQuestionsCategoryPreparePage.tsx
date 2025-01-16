'use client';

import type { InterviewsListingBottomContent } from 'contentlayer/generated';

import { useQuestionFormatsData } from '~/data/QuestionCategories';

import useInterviewsQuestionsFeatures from '~/components/interviews/common/useInterviewsQuestionsFeatures';
import type {
  QuestionMetadata,
  QuestionPracticeFormat,
} from '~/components/interviews/questions/common/QuestionsTypes';
import InterviewsQuestionsCategoryPage from '~/components/interviews/questions/listings/category/InterviewsQuestionsCategoryPage';
import { useIntl } from '~/components/intl';
import MDXContent from '~/components/mdx/MDXContent';
import Divider from '~/components/ui/Divider';
import TabsUnderline from '~/components/ui/Tabs/TabsUnderline';

import { roundQuestionCountToNearestTen } from '~/db/QuestionsUtils';

type Props = Readonly<{
  bottomContent?: InterviewsListingBottomContent;
  practiceFormat: QuestionPracticeFormat;
  questions: ReadonlyArray<QuestionMetadata>;
  totalQuestionCount: number;
}>;

export default function InterviewsQuestionsCategoryPreparePage({
  bottomContent,
  practiceFormat,
  questions,
  totalQuestionCount,
}: Props) {
  const intl = useIntl();
  const formats = useQuestionFormatsData();

  const categoryTabs = (
    <TabsUnderline
      size="sm"
      tabs={[
        {
          href: '/questions',
          label: intl.formatMessage({
            defaultMessage: 'Coding',
            description: 'Question format',
            id: 'eJU0PN',
          }),
          value: 'coding',
        },
        {
          href: `/questions/${formats['system-design'].value}`,
          label: formats['system-design'].label,
          value: formats['system-design'].value,
        },
        {
          href: `/questions/${formats.quiz.value}`,
          label: formats.quiz.label,
          value: formats.quiz.value,
        },
      ]}
      value={practiceFormat ?? 'coding'}
    />
  );

  const questionFeatures = useInterviewsQuestionsFeatures();
  const features = [
    questionFeatures.solvedByExInterviewers,
    questionFeatures.testCases,
    questionFeatures.codeInBrowser,
  ];

  return (
    <div className="flex flex-col gap-20">
      <InterviewsQuestionsCategoryPage
        categoryTabs={categoryTabs}
        description={`The largest bank of ${roundQuestionCountToNearestTen(totalQuestionCount)}+ practice questions for front end interviews.`}
        features={features}
        listType={{
          tab: practiceFormat,
          type: 'practice',
          value: practiceFormat,
        }}
        longDescription={`Save the trouble of searching the web for front end interview questions. We have ${roundQuestionCountToNearestTen(totalQuestionCount)}+ practice questions in every framework, format, and topic, each with high quality answers and tests from big tech senior / staff engineers.`}
        questionList={questions}
        searchPlaceholder="Search within this list of questions"
        title={intl.formatMessage({
          defaultMessage: 'All Practice Questions',
          description: 'Page title for all practice questions page',
          id: 'ua8BRe',
        })}
      />
      {bottomContent && (
        <>
          <Divider />
          <MDXContent
            components={{
              QuestionsCount: () => (
                <span>
                  {roundQuestionCountToNearestTen(totalQuestionCount)}
                </span>
              ),
            }}
            mdxCode={bottomContent.body.code}
          />
        </>
      )}
    </div>
  );
}
