import { RiCheckFill, RiLoader2Line } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import Chip from '~/components/ui/Chip';

import type { ProjectsChallengeSessionStatus } from '@prisma/client';

type Props = Readonly<{
  label: number;
  status: ProjectsChallengeSessionStatus | 'NOT_STARTED';
}>;

const size = 'sm';
const commonProps = {
  isLabelHidden: true,
  size,
} as const;

export default function ProjectsChallengeStatusChip({ label, status }: Props) {
  const intl = useIntl();

  switch (status) {
    case 'NOT_STARTED':
    case 'STOPPED':
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
          icon={RiLoader2Line}
          label={intl.formatMessage({
            defaultMessage: 'In progress',
            description: 'In progress status',
            id: 'xVBxp3',
          })}
          variant="primary"
          {...commonProps}
        />
      );
  }
}
