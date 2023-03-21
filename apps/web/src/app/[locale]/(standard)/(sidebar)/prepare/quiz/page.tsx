import type { Metadata } from 'next/types';

import { fetchQuestionsListQuiz } from '~/db/QuestionsListReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

import PrepareQuizPage from './PrepareQuizPage';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);
  const quizQuestions = await fetchQuestionsListQuiz();

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
    pathname: '/prepare/quiz',
    title: intl.formatMessage({
      defaultMessage:
        'Practice Front End Quiz Interview Questions With Solutions',
      description: 'Title of Interview Preparation Quiz page',
      id: 'CXs8z4',
    }),
  });
}

export default async function Page() {
  const quizQuestions = await fetchQuestionsListQuiz();

  return <PrepareQuizPage questions={quizQuestions} />;
}
