import clsx from 'clsx';
import { useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Text from '~/components/ui/Text';
import { themeBackgroundColor, themeGlassyBorder } from '~/components/ui/theme';

import type { QuestionDifficulty } from '../common/QuestionsTypes';

type QuestionDifficultyBreakdownBarProps = Readonly<{
  difficulty: QuestionDifficulty;
  questionCount: number;
  totalQuestionCount: number;
}>;

const DifficultyBackgroundClasses: Record<QuestionDifficulty, string> = {
  easy: 'bg-green',
  hard: 'bg-red-400',
  medium: 'bg-orange-400',
};

const DifficultyLabelClasses: Record<QuestionDifficulty, string> = {
  easy: 'text-green',
  hard: 'text-red-400',
  medium: 'text-orange-400',
};

function QuestionDifficultyBreakdownBar({
  difficulty,
  questionCount,
  totalQuestionCount,
}: QuestionDifficultyBreakdownBarProps) {
  const widthPercentage = Math.round(
    (questionCount / totalQuestionCount) * 100,
  );

  return (
    <div className="relative h-1.5 w-full rounded-full bg-neutral-200/70 dark:bg-neutral-800">
      <div
        className={clsx(
          'absolute h-full rounded-full',
          DifficultyBackgroundClasses[difficulty],
        )}
        style={{
          width: `${widthPercentage}%`,
        }}
      />
    </div>
  );
}

type QuestionListingDifficultySummaryItemProps = Readonly<{
  difficulty: QuestionDifficulty;
  questionCount: number;
  totalQuestionCount: number;
}>;

function QuestionListingDifficultySummaryItem({
  difficulty,
  questionCount,
  totalQuestionCount,
}: QuestionListingDifficultySummaryItemProps) {
  const intl = useIntl();

  const barLabel = useMemo(() => {
    switch (difficulty) {
      case 'easy':
        return intl.formatMessage({
          defaultMessage: 'Easy',
          description:
            'Easy difficulty label for question difficulty summary in question listing',
          id: 'lz6hfa',
        });
      case 'medium':
        return intl.formatMessage({
          defaultMessage: 'Medium',
          description:
            'Medium difficulty label for question difficulty summary in question listing',
          id: 'KhP4uM',
        });
      case 'hard':
        return intl.formatMessage({
          defaultMessage: 'Hard',
          description:
            'Hard difficulty label for question difficulty summary in question listing',
          id: 'S+iQW8',
        });
    }
  }, [difficulty, intl]);

  return (
    <>
      <div className="grid gap-1 pb-2">
        <Text
          className={DifficultyLabelClasses[difficulty]}
          color="inherit"
          size="body3"
          weight="medium">
          {barLabel}
        </Text>
        <QuestionDifficultyBreakdownBar
          difficulty={difficulty}
          questionCount={questionCount}
          totalQuestionCount={totalQuestionCount}
        />
      </div>
      <div>
        <Text color="secondary" size="body2">
          <FormattedMessage
            defaultMessage="<count>{questionCount}</count> questions"
            description="Questions label for question difficulty summary in question listing"
            id="gO1Ygd"
            values={{
              count: (chunks) => (
                <Text size="body" weight="bold">
                  {chunks}
                </Text>
              ),
              questionCount,
            }}
          />
        </Text>
      </div>
    </>
  );
}

type Props = Readonly<Record<QuestionDifficulty, number>>;

export default function QuestionListingDifficultySummary({
  easy,
  hard,
  medium,
}: Props) {
  const total = easy + hard + medium;

  return (
    <div
      className={clsx(
        'flex overflow-clip rounded-lg bg-white dark:bg-neutral-800/40',
        themeBackgroundColor,
        themeGlassyBorder,
      )}>
      <div
        aria-hidden="true"
        className="h-full w-1.5 bg-neutral-200 dark:bg-neutral-600"
      />
      <div className="grid flex-1 py-3 pl-2.5 pr-4">
        <div className="grid grid-cols-2 items-end gap-y-1 gap-x-4">
          <QuestionListingDifficultySummaryItem
            difficulty="easy"
            questionCount={easy}
            totalQuestionCount={total}
          />
          <QuestionListingDifficultySummaryItem
            difficulty="medium"
            questionCount={medium}
            totalQuestionCount={total}
          />
          <QuestionListingDifficultySummaryItem
            difficulty="hard"
            questionCount={hard}
            totalQuestionCount={total}
          />
        </div>
      </div>
    </div>
  );
}
