import { useIntl } from '~/components/intl';
import ProgressBar from '~/components/ui/ProgressBar';

type Props = Readonly<{
  completed: number;
  total: number;
}>;

export default function ProjectsChallengeProgressbar({
  completed,
  total,
}: Props) {
  const intl = useIntl();

  return (
    <ProgressBar
      backgroundClass="bg-neutral-200/70 dark:bg-neutral-700"
      heightClass="h-1.5"
      label={intl.formatMessage(
        {
          defaultMessage:
            'Label for "Completed projects" progress bar of a Projects component track',
          description: '{completedCount} out of {totalCount} challenges',
          id: 'GSfE/S',
        },
        {
          completedCount: completed,
          totalCount: total,
        },
      )}
      total={total}
      value={completed}
    />
  );
}
