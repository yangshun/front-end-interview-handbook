import type { Metadata } from 'next';

import type { QuestionListTypeData } from '~/components/interviews/questions/common/QuestionsTypes';
import InterviewsQuestionsCategoryPreparePage from '~/components/interviews/questions/listings/category/InterviewsQuestionsCategoryPreparePage';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import { fetchQuestionsList } from '~/db/QuestionsListReader';
import { roundQuestionCountToNearestTen } from '~/db/QuestionsUtils';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

export const dynamic = 'force-static';

const listType: QuestionListTypeData = {
  tab: 'quiz',
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
  const [intl, { questions }] = await Promise.all([
    getIntlServerOnly(locale),
    fetchQuestionsList(listType, locale),
  ]);
  const questionCount = roundQuestionCountToNearestTen(questions.length);

  return defaultMetadata({
    description: intl.formatMessage(
      {
        defaultMessage:
          'Practice {questionCount}+ front end quiz interview questions, each with high quality reference answers written by big tech ex-interviewers.',
        description: 'Page description for interview questions listing',
        id: 'r+ed50',
      },
      { questionCount },
    ),
    locale,
    ogImageTitle: intl.formatMessage({
      defaultMessage: 'Front End Interview Practice Questions - Quizzes',
      description: 'Title for front end interview questions page',
      id: 'ffpupd',
    }),
    pathname: '/questions/quiz',
    socialTitle: intl.formatMessage({
      defaultMessage:
        'Front End Interview Practice Questions - Quizzes | GreatFrontEnd',
      description: 'Social title for practice questions page',
      id: 'd4DJw9',
    }),
    title: intl.formatMessage(
      {
        defaultMessage: '{questionCount}+ Front End Interview Quiz Questions',
        description: 'Page title for practice questions page',
        id: 'xiKHPp',
      },
      { questionCount },
    ),
  });
}

export default async function Page({ params }: Props) {
  const { locale } = params;

  const [{ questions: quizQuestions }, bottomContent] = await Promise.all([
    fetchQuestionsList(listType, locale),
    fetchInterviewListingBottomContent('questions-quiz'),
  ]);

  return (
    <InterviewsQuestionsCategoryPreparePage
      bottomContent={bottomContent}
      listType={listType}
      questions={quizQuestions}
    />
  );
}
