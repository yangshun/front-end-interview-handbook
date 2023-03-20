import { sortQuestionsMultiple } from '~/components/questions/common/QuestionsProcessor';

import { fetchQuestionsListQuiz } from '~/db/QuestionsListReader';

import QuestionsQuizContentLayout from './QuestionsQuizContentLayout';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default async function QuizContentLayout({ children }: Props) {
  const questionList = await fetchQuestionsListQuiz();

  return (
    <QuestionsQuizContentLayout
      // Keep in sync with layout.
      questionList={sortQuestionsMultiple(questionList, [
        {
          field: 'ranking',
          isAscendingOrder: true,
        },
        {
          field: 'importance',
          isAscendingOrder: false,
        },
      ])}>
      {children}
    </QuestionsQuizContentLayout>
  );
}
