import { useMemo } from 'react';

import { FormattedMessage, useIntl } from '~/components/intl';
import ProgressBar from '~/components/ui/ProgressBar';
import Text from '~/components/ui/Text';

import QuestionListingSideCard from './QuestionListingSideCard';
import type { QuestionDifficulty } from '../../common/QuestionsTypes';

const difficultyBackgroundClasses: Record<QuestionDifficulty, string> = {
  easy: 'bg-green',
  hard: 'bg-red',
  medium: 'bg-orange',
};

const difficultyLabelClasses: Record<QuestionDifficulty, string> = {
  easy: 'text-green',
  hard: 'text-red',
  medium: 'text-orange',
};

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
      <div className="col-span-1 grid gap-1 pb-2 xl:col-span-2">
        <Text
          className={difficultyLabelClasses[difficulty]}
          color="inherit"
          size="body3"
          weight="medium">
          {barLabel}
        </Text>
        <ProgressBar
          heightClass="h-1.5"
          label={barLabel}
          progressClass={difficultyBackgroundClasses[difficulty]}
          total={totalQuestionCount}
          value={questionCount}
        />
      </div>
      <div className="whitespace-nowrap">
        <FormattedMessage
          defaultMessage="<count>{questionCount}</count> <questions>questions</questions>"
          description="Number of questions"
          id="mDcqlX"
          values={{
            count: (chunks) => (
              <Text size="body2" weight="bold">
                {chunks}
              </Text>
            ),
            questionCount,
            questions: (chunks) => (
              <Text color="secondary" size="body3">
                {chunks}
              </Text>
            ),
          }}
        />
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
    <QuestionListingSideCard stripClassName="bg-neutral-200 dark:bg-neutral-600">
      <div className="grid">
        <div className="grid grid-cols-2 items-end gap-x-4 gap-y-1 xl:grid-cols-3">
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
    </QuestionListingSideCard>
  );
}
