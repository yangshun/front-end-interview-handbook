import type { Metadata } from 'next/types';

import { fetchQuestionsListQuiz } from '~/db/QuestionsListReader';
import defaultMetadata from '~/seo/defaultMetadata';

import PrepareQuizPage from './PrepareQuizPage';

export async function generateMetadata(): Promise<Metadata> {
  const quizQuestions = await fetchQuestionsListQuiz();

  return defaultMetadata({
    description: `Top ${quizQuestions.length} front end interview coding questions to practice, with detailed solutions and explanations by ex-interviewers at FAANG.`,
    pathname: '/prepare/quiz',
    title: 'Practice Front End Quiz Interview Questions With Solutions',
  });
}

export default async function Page() {
  const quizQuestions = await fetchQuestionsListQuiz();

  return <PrepareQuizPage questions={quizQuestions} />;
}
