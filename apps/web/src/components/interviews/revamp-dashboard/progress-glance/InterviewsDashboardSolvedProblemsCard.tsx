import clsx from 'clsx';
import { useMemo } from 'react';

import getProgressBarGradient from '~/components/interviews/common/utils';
import type {
  QuestionDifficulty,
  QuestionMetadata,
  QuestionSlug,
} from '~/components/interviews/questions/common/QuestionsTypes';
import { countQuestionsCompletionByDifficulty } from '~/components/interviews/questions/listings/filters/QuestionsProcessor';
import { FormattedMessage, useIntl } from '~/components/intl';
import GradientProgressBar from '~/components/ui/GradientProgressBar/GradientProgressBar';
import Heading from '~/components/ui/Heading';
import ProgressBar from '~/components/ui/ProgressBar';
import Text from '~/components/ui/Text';
import {
  themeBackgroundLineEmphasizedColor,
  themeBorderElementColor,
  themeTextColor,
} from '~/components/ui/theme';

type Props = Readonly<{
  questions: {
    codingQuestions: ReadonlyArray<QuestionMetadata>;
    quizQuestions: ReadonlyArray<QuestionMetadata>;
    systemDesignQuestions: ReadonlyArray<QuestionMetadata>;
  };
  questionsProgress: ReadonlyArray<
    Readonly<{ format: string; id: string; slug: QuestionSlug }>
  > | null;
}>;

export default function InterviewsDashboardSolvedProblemsCard({
  questions,
  questionsProgress,
}: Props) {
  const intl = useIntl();

  const { easy, medium, hard } = useMemo(
    () =>
      countQuestionsCompletionByDifficulty(
        [
          ...questions.codingQuestions,
          ...questions.quizQuestions,
          ...questions.systemDesignQuestions,
        ],
        questionsProgress,
      ),
    [questions, questionsProgress],
  );

  const completedCount = easy.completed + medium.completed + hard.completed;
  const totalCount = easy.total + medium.total + hard.total;

  const progressPercentage =
    totalCount === 0 ? 0 : (completedCount / totalCount) * 100;

  const difficultyItems: Record<
    QuestionDifficulty,
    { completed: number; label: string; total: number }
  > = {
    easy: {
      completed: easy.completed,
      label: intl.formatMessage({
        defaultMessage: 'Easy',
        description: 'Easy difficulty label for solved problems',
        id: 'sP54y8',
      }),
      total: easy.total,
    },
    hard: {
      completed: hard.completed,
      label: intl.formatMessage({
        defaultMessage: 'Hard',
        description: 'Hard difficulty label for solved problems',
        id: 'Qp/rKd',
      }),
      total: hard.total,
    },
    medium: {
      completed: medium.completed,
      label: intl.formatMessage({
        defaultMessage: 'Medium',
        description: 'Medium difficulty label for solved problems',
        id: '6QxW+/',
      }),
      total: medium.total,
    },
  };

  return (
    <div
      className={clsx(
        'flex flex-col gap-6',
        'rounded-lg',
        'px-6 py-5',
        'bg-neutral-200/40 dark:bg-neutral-800/40',
        ['border', themeBorderElementColor],
      )}>
      <Text size="body1" weight="medium">
        <FormattedMessage
          defaultMessage="Solved problems"
          description="Title for solved problems card"
          id="JQK0y8"
        />
      </Text>
      <div className="flex flex-col gap-8 md:flex-row md:items-center">
        <GradientProgressBar
          className="size-28"
          gradient={getProgressBarGradient({
            total: totalCount,
            value: completedCount,
          })}
          progressPercentage={progressPercentage}
          reverseGradient={true}>
          <>
            <Heading className={themeTextColor} color="custom" level="heading5">
              {completedCount}
            </Heading>
            <Text color="subtitle" size="body3" weight="medium">
              <FormattedMessage
                defaultMessage="Solved"
                description="Label for number of solved problems"
                id="RHA+8L"
              />
            </Text>
          </>
        </GradientProgressBar>

        <div className="flex flex-1 flex-col gap-4">
          {[
            difficultyItems.easy,
            difficultyItems.medium,
            difficultyItems.hard,
          ].map(({ label, total, completed }) => (
            <div key={label} className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <Text size="body3" weight="medium">
                  {label}
                </Text>
                <Text size="body2" weight="bold">
                  {completed}
                  <Text color="secondary" size="body3">
                    /{total}
                  </Text>
                </Text>
              </div>
              <ProgressBar
                backgroundClass={themeBackgroundLineEmphasizedColor}
                heightClass="h-1.5"
                label={label}
                progressClass={
                  getProgressBarGradient({
                    total,
                    value: completed,
                  }).className
                }
                total={total}
                value={completed}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
