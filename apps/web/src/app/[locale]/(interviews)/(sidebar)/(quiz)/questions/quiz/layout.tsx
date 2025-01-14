import FeedbackWidget from '~/components/global/feedback/FeedbackWidget';
import QuestionsQuizContentLayout from '~/components/interviews/questions/content/quiz/QuestionsQuizContentLayout';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default async function QuizContentLayout({ children }: Props) {
  return (
    <QuestionsQuizContentLayout>
      {children}
      <FeedbackWidget bottomClassname="bottom-12" />
    </QuestionsQuizContentLayout>
  );
}
