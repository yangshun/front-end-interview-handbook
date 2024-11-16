import clsx from 'clsx';
import type { ReactNode } from 'react';
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
  themeBackgroundCardWhiteOnLightColor,
  themeBackgroundLineEmphasizedColor,
  themeBorderElementColor,
  themeTextColor,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

type Props = Readonly<{
  isQuestionProgressLoading: boolean;
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
  isQuestionProgressLoading,
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
    { completed: number; label: string; tooltip: ReactNode; total: number }
  > = {
    easy: {
      completed: easy.completed,
      label: intl.formatMessage({
        defaultMessage: 'Easy',
        description: 'Easy difficulty label for solved problems',
        id: 'sP54y8',
      }),
      tooltip: (
        <div className="flex flex-col gap-6">
          <div>
            <FormattedMessage
              defaultMessage="Out of {total} easy-level problems, you have solved or marked as complete {completed} across Coding, Quiz, and System Design."
              description="Tooltip for solved problems progress"
              id="dFtRG9"
              values={{
                completed: easy.completed.toLocaleString(),
                total: easy.total.toLocaleString(),
              }}
            />
          </div>

          {/* TODO(interviews): add tooltip for beats when the beats progress work is done */}
          {/* <div>
            <FormattedMessage
              defaultMessage="Your progress surpasses 98.4% of our user base."
              description="Tooltip for solved problems progress"
              id="9IGv9K"
              values={{
                completed: easy.completed.toLocaleString(),
                total: easy.total.toLocaleString(),
              }}
            />
          </div> */}
        </div>
      ),
      total: easy.total,
    },
    hard: {
      completed: hard.completed,
      label: intl.formatMessage({
        defaultMessage: 'Hard',
        description: 'Hard difficulty label for solved problems',
        id: 'Qp/rKd',
      }),
      tooltip: (
        <div className="flex flex-col gap-6">
          <div>
            <FormattedMessage
              defaultMessage="Out of {total} hard-level problems, you have solved or marked as complete {completed} across Coding, Quiz, and System Design."
              description="Tooltip for solved problems progress"
              id="ycp+Vk"
              values={{
                completed: hard.completed.toLocaleString(),
                total: hard.total.toLocaleString(),
              }}
            />
          </div>
          {/* TODO(interviews): add tooltip for beats when the beats progress work is done */}
          {/* <div>
            <FormattedMessage
              defaultMessage="Your progress surpasses 98.4% of our user base."
              description="Tooltip for solved problems progress"
              id="9IGv9K"
              values={{
                completed: easy.completed.toLocaleString(),
                total: easy.total.toLocaleString(),
              }}
            />
          </div> */}
        </div>
      ),
      total: hard.total,
    },
    medium: {
      completed: medium.completed,
      label: intl.formatMessage({
        defaultMessage: 'Medium',
        description: 'Medium difficulty label for solved problems',
        id: '6QxW+/',
      }),
      tooltip: (
        <div className="flex flex-col gap-6">
          <div>
            <FormattedMessage
              defaultMessage="Out of {total} medium-level problems, you have solved or marked as complete {completed} across Coding, Quiz, and System Design."
              description="Tooltip for solved problems progress"
              id="gvhz5x"
              values={{
                completed: medium.completed.toLocaleString(),
                total: medium.total.toLocaleString(),
              }}
            />
          </div>
          {/* TODO(interviews): add tooltip for beats when the beats progress work is done */}
          {/* <div>
            <FormattedMessage
              defaultMessage="Your progress surpasses 98.4% of our user base."
              description="Tooltip for solved problems progress"
              id="9IGv9K"
              values={{
                completed: easy.completed.toLocaleString(),
                total: easy.total.toLocaleString(),
              }}
            />
          </div> */}
        </div>
      ),
      total: medium.total,
    },
  };

  return (
    <div
      className={clsx(
        'flex flex-col gap-6',
        'rounded-lg',
        'px-6 py-5',
        themeBackgroundCardWhiteOnLightColor,
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
            <Tooltip
              label={
                <FormattedMessage
                  defaultMessage="You have solved or marked as complete {completed} out of {total} problems across Coding, Quiz, and System Design."
                  description="Tooltip for solved problems progress"
                  id="uvoNYz"
                  values={{
                    completed: completedCount.toLocaleString(),
                    total: totalCount.toLocaleString(),
                  }}
                />
              }>
              <Heading
                className={clsx(themeTextColor, [
                  'transition-opacity duration-500',
                  isQuestionProgressLoading ? 'opacity-0' : 'opacity-100',
                ])}
                color="custom"
                level="heading5">
                {completedCount}
              </Heading>
            </Tooltip>
            <Text
              className={clsx(themeTextColor, [
                'transition-opacity duration-500',
                isQuestionProgressLoading ? 'opacity-0' : 'opacity-100',
              ])}
              color="subtitle"
              size="body3"
              weight="medium">
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
          ].map(({ label, total, completed, tooltip }) => (
            <div key={label} className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <Text size="body3" weight="medium">
                  {label}
                </Text>
                <Tooltip
                  asChild={true}
                  className={clsx([
                    'transition-opacity duration-500',
                    isQuestionProgressLoading ? 'opacity-0' : 'opacity-100',
                  ])}
                  label={tooltip}>
                  <Text
                    className={clsx([
                      'transition-opacity duration-500',
                      isQuestionProgressLoading ? 'opacity-0' : 'opacity-100',
                    ])}
                    size="body2"
                    weight="bold">
                    {completed}
                    <Text color="secondary" size="body3">
                      /{total}
                    </Text>
                  </Text>
                </Tooltip>
              </div>
              <ProgressBar
                backgroundClass={themeBackgroundLineEmphasizedColor}
                heightClass="h-1.5"
                label={label}
                progressClass={clsx(
                  getProgressBarGradient({
                    total,
                    value: completed,
                  }).className,
                  ['transition-all duration-1000 ease-in-out'],
                )}
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
