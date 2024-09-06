import type { Metadata } from 'next/types';

import { fetchQuestionCompletionCount } from '~/db/QuestionsCount';
import {
  fetchQuestionsListCount,
  fetchQuestionsListQuiz,
} from '~/db/QuestionsListReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

import InterviewsDashboardPrepareQuizPage from './InterviewsDashboardPrepareQuizPage';

// TODO(interviews): disable to do A/B test.
// export const dynamic = 'force-static';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const [intl, { questions: quizQuestions }] = await Promise.all([
    getIntlServerOnly(locale),
    fetchQuestionsListQuiz(locale),
  ]);

  return defaultMetadata({
    description: intl.formatMessage(
      {
        defaultMessage:
          'Top {questionCount} front end interview coding questions to practice, with detailed solutions and explanations by ex-interviewers at FAANG.',
        description: 'Description of Interview Preparation Quiz page',
        id: 'K/Nz6V',
      },
      {
        questionCount: quizQuestions.length,
      },
    ),
    locale,
    pathname: '/prepare/quiz',
    title: intl.formatMessage({
      defaultMessage:
        'Practice Front End Quiz Interview Questions With Solutions',
      description: 'Title of Interview Preparation Quiz page',
      id: 'CXs8z4',
    }),
  });
}

export default async function Page({ params }: Props) {
  const { locale } = params;
  const [
    { questions: quizQuestions },
    questionCompletionCount,
    questionTotalAvailableCount,
  ] = await Promise.all([
    fetchQuestionsListQuiz(locale),
    fetchQuestionCompletionCount(['quiz']),
    fetchQuestionsListCount(),
  ]);

  return (
    <InterviewsDashboardPrepareQuizPage
      questionCompletionCount={questionCompletionCount}
      questionTotalAvailableCount={questionTotalAvailableCount}
      questions={quizQuestions}
    />
  );
}
