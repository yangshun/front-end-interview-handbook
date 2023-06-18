import clsx from 'clsx';

import { useQuestionFormatLists } from '~/data/QuestionFormats';

import QuestionsProgressPanel from '~/components/questions/listings/stats/QuestionsProgressPanel';
import { themeLineColor } from '~/components/ui/theme';

import type { QuestionCompletionCount } from '~/db/QuestionsCount';

type Props = Readonly<{
  questionCompletionCount?: QuestionCompletionCount;
}>;

export default function PreparationOverallCompletionProgress({
  questionCompletionCount = {},
}: Props) {
  const questionFormats = useQuestionFormatLists();

  return (
    <div
      className={clsx(
        'grid gap-y-4 gap-x-12 rounded-lg border py-4 px-6 md:grid-cols-3',
        themeLineColor,
      )}>
      {[
        {
          completedQuestions:
            Object.keys(questionCompletionCount.javascript ?? {}).length +
            Object.keys(questionCompletionCount['user-interface'] ?? {}).length,
          gradient: questionFormats.coding.themeGradient,
          icon: questionFormats.coding.icon,
          title: questionFormats.coding.name,
          totalQuestions: 116,
        },
        {
          completedQuestions: Object.keys(questionCompletionCount.quiz ?? {})
            .length,
          gradient: questionFormats.quiz.themeGradient,
          icon: questionFormats.quiz.icon,
          title: questionFormats.quiz.name,
          totalQuestions: 116,
        },
        {
          completedQuestions: Object.keys(
            questionCompletionCount['system-design'] ?? {},
          ).length,
          gradient: questionFormats['system-design'].themeGradient,
          icon: questionFormats['system-design'].icon,
          title: questionFormats['system-design'].name,
          totalQuestions: 116,
        },
      ].map(({ completedQuestions, icon, gradient, title, totalQuestions }) => (
        <QuestionsProgressPanel
          key={title}
          completedQuestions={completedQuestions}
          icon={icon}
          progressBarClassName={gradient}
          title={title}
          totalQuestions={totalQuestions}
          variant="default"
        />
      ))}
    </div>
  );
}
