'use client';

import type { InterviewsListingBottomContent } from 'contentlayer/generated';

import useInterviewsQuestionsFeatures from '~/components/interviews/common/useInterviewsQuestionsFeatures';
import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import InterviewsQuestionsCategoryPage from '~/components/interviews/questions/listings/category/InterviewsQuestionsCategoryPage';
import { QuestionCountTotal } from '~/components/interviews/questions/listings/stats/QuestionCount';
import { useIntl } from '~/components/intl';
import MDXContent from '~/components/mdx/MDXContent';
import Divider from '~/components/ui/Divider';

import InterviewsQuestionsCategoryPracticeFormatTabs from './InterviewsQuestionsCategoryPracticeFormatTabs';

type Props = Readonly<{
  bottomContent?: InterviewsListingBottomContent;
  listType: React.ComponentProps<
    typeof InterviewsQuestionsCategoryPage
  >['listType'];
  questions: ReadonlyArray<QuestionMetadata>;
}>;

export default function InterviewsQuestionsCategoryPreparePage({
  bottomContent,
  listType,
  questions,
}: Props) {
  const intl = useIntl();
  const questionFeatures = useInterviewsQuestionsFeatures();
  const features = [
    questionFeatures.solvedByExInterviewers,
    questionFeatures.testCases,
    questionFeatures.codeInBrowser,
  ];

  const categoryTabs = (
    <InterviewsQuestionsCategoryPracticeFormatTabs
      baseHref="/questions"
      listType={listType}
    />
  );

  return (
    <div className="flex flex-col gap-20">
      <InterviewsQuestionsCategoryPage
        categoryTabs={categoryTabs}
        description={intl.formatMessage(
          {
            defaultMessage:
              'The largest question bank of {questionCount}+ practice questions for front end interviews',
            description:
              'Description for interview practice by question format',
            id: '8/uZ94',
          },
          {
            questionCount: QuestionCountTotal,
          },
        )}
        features={features}
        listType={listType}
        longDescription={intl.formatMessage(
          {
            defaultMessage:
              'Save the trouble of searching the web for front end interview questions. We have {questionCount}+ practice questions in every framework, format, and topic, each with high quality answers and tests from big tech senior / staff engineers.',
            description:
              'Description for interview practice by question format',
            id: 'e4A6u7',
          },
          {
            questionCount: QuestionCountTotal,
          },
        )}
        questionList={questions}
        searchPlaceholder={intl.formatMessage({
          defaultMessage: 'Search within this list of questions',
          description: 'Search questions placeholder',
          id: '/yPyGR',
        })}
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
              QuestionsCount: () => <span>{QuestionCountTotal}</span>,
            }}
            mdxCode={bottomContent.body.code}
          />
        </>
      )}
    </div>
  );
}
