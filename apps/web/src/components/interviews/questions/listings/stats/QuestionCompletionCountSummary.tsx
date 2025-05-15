'use client';

import clsx from 'clsx';

import { FormattedMessage } from '~/components/intl';
import Text from '~/components/ui/Text';

type Props = Readonly<{
  completed: number;
  isQuestionsProgressLoading: boolean;
  total: number;
}>;

export default function QuestionCompletionCountSummary({
  completed,
  isQuestionsProgressLoading,
  total,
}: Props) {
  const hasCompletedAll = completed === total;

  return (
    <Text
      className={clsx(hasCompletedAll && 'text-success', [
        'transition-opacity duration-500',
        isQuestionsProgressLoading ? 'opacity-0' : 'opacity-100',
      ])}
      color={hasCompletedAll ? 'inherit' : 'secondary'}
      size="body2">
      <FormattedMessage
        defaultMessage="{completed} <bold>/{total} completed</bold>"
        description="Question completion count summary"
        id="76fgBs"
        values={{
          bold: (chunk) => (
            <Text
              className="text-neutral-400 dark:text-neutral-500"
              color="inherit"
              size="body3">
              {chunk}
            </Text>
          ),
          completed,
          total,
        }}
      />
    </Text>
  );
}
