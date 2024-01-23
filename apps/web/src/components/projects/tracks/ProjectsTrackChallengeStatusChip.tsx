import { RiCheckFill, RiLoader4Line, RiLockLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import Chip from '~/components/ui/Chip';

type Props = Readonly<{
  label: number;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'NOT_STARTED' | 'PREMIUM';
}>;

const size = 'sm';
const commonProps = {
  isLabelHidden: true,
  size,
} as const;

export default function ProjectsTrackChallengeStatusChip({
  label,
  status = 'NOT_STARTED',
}: Props) {
  const intl = useIntl();

  switch (status) {
    case 'NOT_STARTED':
      return <Chip label={String(label)} size={size} variant="neutral" />;
    case 'COMPLETED':
      return (
        <Chip
          icon={RiCheckFill}
          label={intl.formatMessage({
            defaultMessage: 'Completed',
            description: 'Completed status',
            id: 'fKFJZE',
          })}
          variant="success"
          {...commonProps}
        />
      );
    case 'IN_PROGRESS':
      return (
        <Chip
          icon={RiLoader4Line}
          label={intl.formatMessage({
            defaultMessage: 'In progress',
            description: 'In progress status',
            id: 'xVBxp3',
          })}
          variant="primary"
          {...commonProps}
        />
      );
    case 'PREMIUM':
      return (
        <Chip
          icon={RiLockLine}
          label={intl.formatMessage({
            defaultMessage: 'Locked',
            description: 'Locked status',
            id: 'X1lkot',
          })}
          variant="special"
          {...commonProps}
        />
      );
  }
}
