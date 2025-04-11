import type { Metadata } from 'next';

import type { QuestionListTypeData } from '~/components/interviews/questions/common/QuestionsTypes';
import InterviewsQuestionsCategoryPreparePage from '~/components/interviews/questions/listings/category/InterviewsQuestionsCategoryPreparePage';
import { QuestionCountTotal } from '~/components/interviews/questions/listings/stats/QuestionCount';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import { fetchQuestionsList } from '~/db/QuestionsListReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

export const dynamic = 'force-static';

const listType: QuestionListTypeData = {
  tab: 'coding',
  type: 'practice',
  value: 'practice',
};

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    description: intl.formatMessage({
      defaultMessage:
        'Prepare for front end interviews with a vast question bank covering every format and popular frameworks/languages. Includes solutions and tests from ex-interviewers.',
      description: 'Page description for focus areas listing',
      id: 'cNg7I1',
    }),
    locale,
    ogImageTitle: intl.formatMessage({
      defaultMessage: 'Front End Interview Practice Questions',
      description: 'Title for front end interview questions page',
      id: 'QF5mIO',
    }),
    pathname: '/questions',
    socialTitle: intl.formatMessage({
      defaultMessage: 'Front End Interview Practice Questions | GreatFrontEnd',
      description: 'Social title for all practice questions page',
      id: '5cEMDJ',
    }),
    title: intl.formatMessage(
      {
        defaultMessage:
          '{questionCount}+ Front End Interview Questions and Answers',
        description: 'Page title for practice questions page',
        id: 'nHYQlP',
      },
      {
        questionCount: QuestionCountTotal,
      },
    ),
  });
}

export default async function Page({ params }: Props) {
  const { locale } = params;

  const [{ questions: codingQuestions }, bottomContent] = await Promise.all([
    fetchQuestionsList(listType, locale),
    fetchInterviewListingBottomContent('questions/coding', locale),
  ]);

  return (
    <InterviewsQuestionsCategoryPreparePage
      bottomContent={bottomContent}
      listType={listType}
      questions={codingQuestions}
    />
  );
}
