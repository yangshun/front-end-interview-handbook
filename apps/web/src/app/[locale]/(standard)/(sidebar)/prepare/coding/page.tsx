import type { Metadata } from 'next/types';

import { fetchQuestionsListCoding } from '~/db/QuestionsListReader';
import defaultMetadata from '~/seo/defaultMetadata';

import PrepareCodingPage from './PrepareCodingPage';

export async function generateMetadata(): Promise<Metadata> {
  const questions = await fetchQuestionsListCoding();

  return defaultMetadata({
    description: `Top ${questions.length} front end interview coding questions to practice, with detailed solutions and explanations by ex-interviewers at FAANG.`,
    pathname: '/prepare/coding',
    title: 'Practice UI and JavaScript Interview Questions with Solutions',
  });
}

export default async function Page() {
  const codingQuestions = await fetchQuestionsListCoding();

  return <PrepareCodingPage questions={codingQuestions} />;
}
