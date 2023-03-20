import type { Metadata } from 'next/types';

import type { QuestionFramework } from '~/components/questions/common/QuestionsTypes';
import QuestionsFrameworkPage from '~/components/questions/listings/QuestionsFrameworkPage';

import { fetchCodingQuestionsForFramework } from '~/db/QuestionsListReader';
import defaultMetadata from '~/seo/defaultMetadata';

const framework: QuestionFramework = 'react';

export async function generateMetadata(): Promise<Metadata> {
  return defaultMetadata({
    description:
      'Top React front end interview coding questions to practice, with detailed solutions and explanations by ex-interviewers at FAANG.',
    pathname: `/questions/${framework}`,
    title: 'Practice React Interview Questions with Solutions',
  });
}

export default async function Page() {
  const questionList = await fetchCodingQuestionsForFramework(framework);

  return (
    <QuestionsFrameworkPage
      description="Top React coding interview questions to build the most commonly-asked front end UI components and applications."
      framework={framework}
      questionList={questionList}
      title="React Coding Questions"
    />
  );
}
