import QuestionsQuizContentLayout from '~/components/interviews/questions/content/quiz/QuestionsQuizContentLayout';
import { sortQuestionsMultiple } from '~/components/interviews/questions/listings/filters/QuestionsProcessor';

import { fetchQuestionsListQuiz } from '~/db/QuestionsListReader';

type Props = Readonly<{
  children: React.ReactNode;
  params: Readonly<{
    locale: string;
  }>;
}>;

export default async function QuizContentLayout({ children, params }: Props) {
  const { locale } = params;
  const { questions: quizQuestions } = await fetchQuestionsListQuiz(locale);

  return (
    <QuestionsQuizContentLayout
      // Keep in sync with layout.
      questionList={sortQuestionsMultiple(quizQuestions, [
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
