'use client';

import clsx from 'clsx';
import { RiCheckboxCircleFill, RiFireLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import Badge from '~/components/ui/Badge';
import {
  themeTextBrandColor,
  themeTextSuccessColor,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

type Props = Readonly<{
  className?: string;
  completed?: boolean;
  points: number;
}>;

export default function ProjectsChallengeReputationBadge({
  className,
  completed,
  points,
}: Props) {
  const intl = useIntl();

  return (
    <Tooltip
      asChild={true}
      label={intl.formatMessage(
        {
          defaultMessage: '{points} Reputation',
          description: 'Tooltip for User reputation in project',
          id: 'SaptIB',
        },
        {
          points: new Intl.NumberFormat().format(points),
        },
      )}>
      <Badge
        className={className}
        icon={completed ? RiCheckboxCircleFill : RiFireLine}
        iconClassName={
          completed
            ? clsx(
                themeTextSuccessColor,
                'animate-in fade-in spin-in-180 zoom-in-150 duration-500 repeat-1',
              )
            : themeTextBrandColor
        }
        label={`+${points}`}
        size="sm"
        variant="neutral-active"
      />
    </Tooltip>
  );
}
