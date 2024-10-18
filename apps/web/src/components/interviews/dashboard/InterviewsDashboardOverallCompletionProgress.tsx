import clsx from 'clsx';

import { trpc } from '~/hooks/trpc';

import { useQuestionUserFacingFormatData } from '~/data/QuestionFormats';

import QuestionsProgressPanel from '~/components/interviews/questions/listings/stats/QuestionsProgressPanel';
import {
  themeBackgroundCardWhiteOnLightColor,
  themeGlassyBorder,
} from '~/components/ui/theme';

import type { QuestionTotalAvailableCount } from '~/db/QuestionsListReader';
import { categorizeQuestionsProgress } from '~/db/QuestionsUtils';

import { useUser } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  questionTotalAvailableCount: QuestionTotalAvailableCount;
}>;

export default function InterviewsDashboardOverallCompletionProgress({
  questionTotalAvailableCount,
}: Props) {
  const user = useUser();
  const { data: questionProgressParam } = trpc.questionProgress.getAll.useQuery(
    undefined,
    {
      enabled: !!user,
    },
  );
  const questionsProgressAll = categorizeQuestionsProgress(
    questionProgressParam,
  );
  const questionFormats = useQuestionUserFacingFormatData();

  return (
    <div
      className={clsx(
        'relative grid gap-x-12 gap-y-4 rounded-lg px-6 py-4 md:grid-cols-3',
        themeGlassyBorder,
        themeBackgroundCardWhiteOnLightColor,
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
      ].map(({ completedQuestions, gradient, title, totalQuestions }) => (
        <QuestionsProgressPanel
          key={title}
          completedQuestions={completedQuestions}
          progressBarClassName={gradient}
          title={title}
          totalQuestions={totalQuestions}
          variant="default"
        />
      ))}
    </div>
  );
}
