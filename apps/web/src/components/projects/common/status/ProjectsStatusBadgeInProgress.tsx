import clsx from 'clsx';
import { RiLoader2Line } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import Badge from '~/components/ui/Badge';
import Chip from '~/components/ui/Chip';
import { themeTextWarningColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import type {
  ProjectsStatusBadgeType,
  ProjectsStatusBadgeVariant,
} from './types';

type Props = Readonly<{
  entity: ProjectsStatusBadgeType;
  variant?: ProjectsStatusBadgeVariant;
}>;

const Icon = RiLoader2Line;

export default function ProjectsStatusBadgeInProgress({
  entity,
  variant = 'badge',
}: Props) {
  const intl = useIntl();

  const tooltip = (() => {
    switch (entity) {
      case 'challenge':
        return intl.formatMessage({
          defaultMessage: 'You are currently working on this challenge',
          description: 'Description for projects in progress status',
          id: 'SNCrTv',
        });
      case 'track':
        return intl.formatMessage({
          defaultMessage: 'You are currently working on this track',
          description: 'Description for projects track in progress status',
          id: '6fcExT',
        });

      case 'skill':
        return intl.formatMessage({
          defaultMessage: 'You are currently working on this skill',
          description: 'Description for projects skill in progress status',
          id: 'mH6g90',
        });
    }
  })();

  const label = intl.formatMessage({
    defaultMessage: 'In progress',
    description: 'Challenge completion label',
    id: 'GZLfaL',
  });

  return (
    <Tooltip label={tooltip} triggerClassName="inline-flex">
      {variant === 'badge' && (
        <Badge icon={Icon} label={label} size="sm" variant="warning" />
      )}
      {variant === 'icon' && (
        <Icon
          aria-label={label}
          className={clsx('size-5 shrink-0', themeTextWarningColor)}
        />
      )}
      {variant === 'chip' && (
        <Chip
          icon={Icon}
          isLabelHidden={true}
          label={label}
          size="sm"
          variant="warning"
        />
      )}
    </Tooltip>
  );
}
