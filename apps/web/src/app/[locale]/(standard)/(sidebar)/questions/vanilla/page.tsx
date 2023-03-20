import type { Metadata } from 'next/types';

import type { QuestionFramework } from '~/components/questions/common/QuestionsTypes';
import QuestionsFrameworkPage from '~/components/questions/listings/QuestionsFrameworkPage';

import { fetchCodingQuestionsForFramework } from '~/db/QuestionsListReader';
import defaultMetadata from '~/seo/defaultMetadata';

const framework: QuestionFramework = 'vanilla';

export async function generateMetadata(): Promise<Metadata> {
  return defaultMetadata({
    description:
      'Top Vanilla JavaScript UI front end interview coding questions to practice, with detailed solutions and explanations by ex-interviewers at FAANG.',
    pathname: `/questions/${framework}`,
    title: 'Practice Vanilla JavaScript UI Interview Questions with Solutions',
  });
}

export default async function Page() {
  const questionList = await fetchCodingQuestionsForFramework(framework);

  return (
    <QuestionsFrameworkPage
      description="Top Vanilla JavaScript UI coding interview questions."
      framework={framework}
      questionList={questionList}
      title="Vanilla JavaScript User Interface Questions"
    />
  );
}
