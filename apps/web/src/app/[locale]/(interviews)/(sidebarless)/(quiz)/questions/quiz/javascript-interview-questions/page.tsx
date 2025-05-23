import { notFound } from 'next/navigation';

import type { QuestionListTypeData } from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionQuizScrollableList from '~/components/interviews/questions/content/quiz/QuestionQuizScrollableList';

import { readQuestionQuizContentsAll } from '~/db/QuestionsContentsReader';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

const listType: QuestionListTypeData = {
  tab: 'quiz',
  type: 'language',
  value: 'js',
};

export default async function Page({ params }: Props) {
  const { locale } = params;

  const quizQuestions = await readQuestionQuizContentsAll(listType, locale);

  if (quizQuestions == null) {
    return notFound();
  }

  return (
    <QuestionQuizScrollableList
      languageOrFramework="js"
      listType={listType}
      questionsList={quizQuestions.map((item) => item.question)}
    />
  );
}
