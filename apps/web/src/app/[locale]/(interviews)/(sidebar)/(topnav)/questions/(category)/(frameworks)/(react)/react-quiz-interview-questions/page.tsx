import type { Metadata } from 'next/types';

import {
  type QuestionFramework,
  QuestionFrameworkLabels,
  type QuestionPracticeFormat,
} from '~/components/interviews/questions/common/QuestionsTypes';
import InterviewsQuestionsCategoryFrameworkPage from '~/components/interviews/questions/listings/category/InterviewsQuestionsCategoryFrameworkPage';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import { readAllFrontEndInterviewGuides } from '~/db/guides/GuidesReader';
import { fetchQuestionsCompletionCount } from '~/db/QuestionsCount';
import { fetchQuestionsList } from '~/db/QuestionsListReader';
import { roundQuestionCountToNearestTen } from '~/db/QuestionsUtils';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

const framework: QuestionFramework = 'react';
const practiceFormat: QuestionPracticeFormat = 'quiz';

export const dynamic = 'force-static';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const [intl, { questions }] = await Promise.all([
    getIntlServerOnly(locale),
    fetchQuestionsList(
      { tab: practiceFormat, type: 'framework', value: framework },
      locale,
    ),
  ]);

  const category = 'React';

  return defaultMetadata({
    description: intl.formatMessage(
      {
        defaultMessage:
          'Practice {questionCount}+ React Quiz Interview Questions. Learn in-browser, with high quality answers written by Big Tech Ex-interviewers',
        description: 'Description of Interview Questions page',
        id: 'yCEIJF',
      },
      {
        questionCount: roundQuestionCountToNearestTen(questions.length),
      },
    ),
    locale,
    ogImagePageType: intl.formatMessage({
      defaultMessage: 'Frameworks or languages',
      description: 'OG image page title of framework and language page',
      id: '+XLpUw',
    }),
    ogImageTitle: intl.formatMessage(
      {
        defaultMessage: '{category} Quiz Interview Questions',
        description: 'OG image title of framework and language page',
        id: 'zs/Ius',
      },
      {
        category,
      },
    ),
    pathname: `/questions/react-quiz-interview-questions`,
    socialTitle: intl.formatMessage(
      {
        defaultMessage:
          '{category} Quiz Interview Questions with Solutions | GreatFrontEnd',
        description: 'Title of React Interview Questions page',
        id: 'jN1v5Q',
      },
      {
        category,
      },
    ),
    title: intl.formatMessage(
      {
        defaultMessage: '{category} Quiz Interview Questions | With Answers',
        description: 'Title of interview questions page',
        id: 'VLBIk4',
      },
      {
        category,
      },
    ),
  });
}

export default async function Page({ params }: Props) {
  const { locale } = params;

  const [intl, { questions }, questionCompletionCount, guides, bottomContent] =
    await Promise.all([
      getIntlServerOnly(locale),
      fetchQuestionsList(
        { tab: practiceFormat, type: 'framework', value: framework },
        locale,
      ),
      fetchQuestionsCompletionCount(['quiz']),
      readAllFrontEndInterviewGuides(locale),
      fetchInterviewListingBottomContent('react-quiz-interview-questions'),
    ]);

  const category = QuestionFrameworkLabels[framework];

  return (
    <InterviewsQuestionsCategoryFrameworkPage
      bottomContent={bottomContent}
      description={intl.formatMessage(
        {
          defaultMessage: 'Q&A quiz-style {category} Interview Questions',
          description: 'Description of interview questions page',
          id: 'zNN/De',
        },
        {
          category,
        },
      )}
      features={['criticalTopics', 'answeredByExInterviewers']}
      framework={framework}
      guides={guides}
      practiceFormat={practiceFormat}
      questionCompletionCount={questionCompletionCount}
      questions={questions}
      showCategoryTabs={false}
      title={intl.formatMessage(
        {
          defaultMessage: '{category} Quiz Interview Questions',
          description: 'Title of interview questions page',
          id: 'ubkZxH',
        },
        {
          category,
        },
      )}
      totalQuestionsCount={questions.length}
    />
  );
}
