import type { ProjectsChallengeSessionStatus } from '@prisma/client';
import { RiCodeSSlashFill, RiLoader2Line } from 'react-icons/ri';

import { useIntl } from '~/components/intl';

export default function useProjectsAllChallengesFilterOptions() {
  const intl = useIntl();

  const options: ReadonlyArray<{
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
    label: string;
    tooltip: string;
    value: ProjectsChallengeSessionStatus;
  }> = [
    {
      icon: RiLoader2Line,
      label: intl.formatMessage({
        defaultMessage: 'In progress',
        description: 'Challenge completion label',
        id: 'GZLfaL',
      }),
      tooltip: intl.formatMessage({
        defaultMessage: 'Show in progress challenges',
        description: 'Description of in progress challenges filter',
        id: 'KIP7Ey',
      }),
      value: 'IN_PROGRESS',
    },
    {
      icon: RiCodeSSlashFill,
      label: intl.formatMessage({
        defaultMessage: 'Completed',
        description: 'Challenge completion label',
        id: 'RO7rPV',
      }),
      tooltip: intl.formatMessage({
        defaultMessage: 'Show completed challenges',
        description: 'Description of completed challenges filter',
        id: 'LChIT/',
      }),
      value: 'COMPLETED',
    },
  ];

  const name = intl.formatMessage({
    defaultMessage: 'Session status',
    description: 'Completed and in progress challenges',
    id: 'o3nhZ8',
  });

  return { name, options };
}
