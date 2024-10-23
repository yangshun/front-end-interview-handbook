import type { Metadata } from 'next/types';

import InterviewsDashboardPrepareCodingPage from '~/components/interviews/dashboard/InterviewsDashboardPrepareCodingPage';

import { fetchQuestionCompletionCount } from '~/db/QuestionsCount';
import {
  fetchQuestionsListCoding,
  fetchQuestionsListCount,
} from '~/db/QuestionsListReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

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
    fetchQuestionsListCoding(locale),
  ]);

  return defaultMetadata({
    description: intl.formatMessage(
      {
        defaultMessage:
          'Top {questionCount} front end interview coding questions to practice, with detailed solutions and explanations by ex-interviewers at FAANG.',
        description: 'Description of Interview Preparation Coding page',
        id: 'x8+4jJ',
      },
      {
        questionCount: questions.length,
      },
    ),
    locale,
    pathname: '/prepare/coding',
    title: intl.formatMessage({
      defaultMessage:
        'Practice UI and JavaScript/TypeScript Interview Questions with Solutions',
      description: 'Title of Interview Preparation Coding page',
      id: 'DLky7V',
    }),
  });
}

export default async function Page({ params }: Props) {
  const { locale } = params;
  const [
    { questions: codingQuestions },
    questionCompletionCount,
    questionTotalAvailableCount,
  ] = await Promise.all([
    fetchQuestionsListCoding(locale),
    fetchQuestionCompletionCount(['user-interface', 'javascript']),
    fetchQuestionsListCount(),
  ]);

  return (
    <InterviewsDashboardPrepareCodingPage
      questionCompletionCount={questionCompletionCount}
      questionTotalAvailableCount={questionTotalAvailableCount}
      questions={codingQuestions}
    />
  );
}
