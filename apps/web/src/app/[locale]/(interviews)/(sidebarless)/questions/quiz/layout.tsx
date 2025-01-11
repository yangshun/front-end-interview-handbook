import QuestionsQuizContentLayout from '~/components/interviews/questions/content/quiz/QuestionsQuizContentLayout';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default async function QuizContentLayout({ children }: Props) {
  return <QuestionsQuizContentLayout>{children}</QuestionsQuizContentLayout>;
}
