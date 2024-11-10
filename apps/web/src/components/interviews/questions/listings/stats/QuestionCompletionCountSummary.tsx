import clsx from 'clsx';

import Text from '~/components/ui/Text';

type Props = Readonly<{
  completed: number;
  total: number;
}>;

export default function QuestionCompletionCountSummary({
  completed,
  total,
}: Props) {
  const hasCompletedAll = completed === total;

  return (
    <Text
      className={clsx(hasCompletedAll && 'text-success')}
      color={hasCompletedAll ? 'inherit' : 'secondary'}
      size="body2">
      {completed}
      <Text
        className="text-neutral-400 dark:text-neutral-500"
        color="inherit"
        size="body3">
        /{total} completed
      </Text>
    </Text>
  );
}
