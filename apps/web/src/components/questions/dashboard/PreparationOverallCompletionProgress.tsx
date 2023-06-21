import clsx from 'clsx';

import { trpc } from '~/hooks/trpc';

import { useQuestionFormatLists } from '~/data/QuestionFormats';

import QuestionsProgressPanel from '~/components/questions/listings/stats/QuestionsProgressPanel';
import { themeLineColor } from '~/components/ui/theme';

import type { QuestionTotalAvailableCount } from '~/db/QuestionsListReader';
import { categorizeQuestionsProgress } from '~/db/QuestionsUtils';

type Props = Readonly<{
  questionTotalAvailableCount: QuestionTotalAvailableCount;
}>;

export default function PreparationOverallCompletionProgress({
  questionTotalAvailableCount,
}: Props) {
  const { data: questionProgressParam } =
    trpc.questionProgress.getAll.useQuery();
  const questionsProgressAll = categorizeQuestionsProgress(
    questionProgressParam,
  );
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
            questionsProgressAll.javascript.size +
            questionsProgressAll['user-interface'].size,
          gradient: questionFormats.coding.themeGradient,
          icon: questionFormats.coding.icon,
          title: questionFormats.coding.name,
          totalQuestions:
            questionTotalAvailableCount.javascript +
            questionTotalAvailableCount['user-interface'],
        },
        {
          completedQuestions: questionsProgressAll.quiz.size,
          gradient: questionFormats.quiz.themeGradient,
          icon: questionFormats.quiz.icon,
          title: questionFormats.quiz.name,
          totalQuestions: questionTotalAvailableCount.quiz,
        },
        {
          completedQuestions: questionsProgressAll['system-design'].size,
          gradient: questionFormats['system-design'].themeGradient,
          icon: questionFormats['system-design'].icon,
          title: questionFormats['system-design'].name,
          totalQuestions: questionTotalAvailableCount['system-design'],
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
