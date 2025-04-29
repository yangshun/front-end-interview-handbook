import clsx from 'clsx';

import getProgressBarGradient from '~/components/interviews/common/utils';
import type {
  InterviewsQuestionItemMinimal,
  QuestionSlug,
} from '~/components/interviews/questions/common/QuestionsTypes';
import { FormattedMessage, useIntl } from '~/components/intl';
import ProgressBar from '~/components/ui/ProgressBar';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardWhiteOnLightColor,
  themeBackgroundLineEmphasizedColor,
  themeBorderElementColor,
  themeGradientPinkPurple,
  themeGradientPurpleGreen,
  themeGradientYellowGreen,
} from '~/components/ui/theme';

import { categorizeQuestionsProgress } from '~/db/QuestionsUtils';

import QuestionCompletionCountSummary from '../../questions/listings/stats/QuestionCompletionCountSummary';

type Props = Readonly<{
  isQuestionsProgressLoading: boolean;
  questions: {
    codingQuestions: ReadonlyArray<InterviewsQuestionItemMinimal>;
    quizQuestions: ReadonlyArray<InterviewsQuestionItemMinimal>;
    systemDesignQuestions: ReadonlyArray<InterviewsQuestionItemMinimal>;
  };
  questionsProgress: ReadonlyArray<
    Readonly<{ format: string; id: string; slug: QuestionSlug }>
  > | null;
}>;

export default function InterviewsDashboardSolvedByQuestionType({
  questions,
  questionsProgress,
  isQuestionsProgressLoading,
}: Props) {
  const intl = useIntl();

  const questionsProgressAll = categorizeQuestionsProgress(questionsProgress);
  const questionsData = [
    {
      completedQuestions:
        questionsProgressAll.algo.size +
        questionsProgressAll.javascript.size +
        questionsProgressAll['user-interface'].size,
      gradient: themeGradientPurpleGreen.className,
      title: intl.formatMessage({
        defaultMessage: 'Coding',
        description: 'Tile for coding question type',
        id: 'Dc5QrJ',
      }),
      totalQuestions: questions.codingQuestions.length,
    },
    {
      completedQuestions: questionsProgressAll.quiz.size,
      gradient: themeGradientPinkPurple.className,
      title: intl.formatMessage({
        defaultMessage: 'Quizzes',
        description: 'Tile for quiz question type',
        id: 'QqddKP',
      }),
      totalQuestions: questions.quizQuestions.length,
    },
    {
      completedQuestions: questionsProgressAll['system-design'].size,
      gradient: themeGradientYellowGreen.className,
      title: intl.formatMessage({
        defaultMessage: 'System Design',
        description: 'Tile for system design question type',
        id: '62/edi',
      }),
      totalQuestions: questions.systemDesignQuestions.length,
    },
  ];

  return (
    <div
      className={clsx(
        'flex flex-col gap-6',
        'rounded-lg',
        'px-6 py-5',
        themeBackgroundCardWhiteOnLightColor,
        ['border', themeBorderElementColor],
      )}>
      <div className="flex items-center justify-between gap-2">
        <Text size="body1" weight="medium">
          <FormattedMessage
            defaultMessage="Solved by question type"
            description="Title for solved by question type"
            id="LWEEN+"
          />
        </Text>
      </div>
      <div className="flex flex-col gap-4">
        {questionsData.map((item) => {
          return (
            <div key={item.title} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Text size="body3" weight="medium">
                    {item.title}
                  </Text>
                  <QuestionCompletionCountSummary
                    completed={item.completedQuestions}
                    isQuestionsProgressLoading={isQuestionsProgressLoading}
                    total={item.totalQuestions}
                  />
                </div>
                <Text
                  className={clsx([
                    'transition-opacity duration-500',
                    isQuestionsProgressLoading ? 'opacity-0' : 'opacity-100',
                  ])}
                  color="subtitle"
                  size="body2"
                  weight="medium">
                  {intl.formatNumber(
                    item.completedQuestions / item.totalQuestions,
                    {
                      maximumFractionDigits: 0,
                      style: 'percent',
                    },
                  )}
                </Text>
              </div>
              <ProgressBar
                backgroundClass={themeBackgroundLineEmphasizedColor}
                heightClass="h-1.5"
                label={item.title}
                progressClass={clsx(
                  getProgressBarGradient({
                    total: item.totalQuestions,
                    value: item.completedQuestions,
                  }).className,
                  ['transition-all duration-1000 ease-in-out'],
                )}
                total={item.totalQuestions}
                value={item.completedQuestions}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
