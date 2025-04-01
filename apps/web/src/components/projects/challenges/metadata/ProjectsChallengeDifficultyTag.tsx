'use client';

import clsx from 'clsx';
import { startCase } from 'lodash-es';
import { RiFlashlightLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import type { BadgeSize, BadgeVariant } from '~/components/ui/Badge';
import Badge from '~/components/ui/Badge';
import Text from '~/components/ui/Text';
import { themeTextSubtleColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import type { ProjectsChallengeDifficulty } from '../types';

type BaseProps = Readonly<{
  difficulty: ProjectsChallengeDifficulty;
}>;

type Props =
  | (BaseProps &
      Readonly<{
        size?: BadgeSize;
        variant: 'badge';
      }>)
  | (BaseProps &
      Readonly<{
        variant: 'inline';
      }>);

const difficultyColors: Record<
  ProjectsChallengeDifficulty,
  Readonly<{ badgeVariant: BadgeVariant; textColor: string }>
> = {
  mid: { badgeVariant: 'info', textColor: 'text-blue' },
  nightmare: { badgeVariant: 'danger', textColor: 'text-red' },
  senior: { badgeVariant: 'warning', textColor: 'text-yellow-500' },
  starter: { badgeVariant: 'success', textColor: 'text-green' },
};

export default function ProjectsChallengeDifficultyTag({
  difficulty,
  ...props
}: Props) {
  const intl = useIntl();
  const Icon = RiFlashlightLine;
  const label = startCase(difficulty);
  const { badgeVariant, textColor } = difficultyColors[difficulty];

  if (props.variant === 'badge') {
    return (
      <Badge
        icon={Icon}
        label={label}
        size={props.size}
        variant={badgeVariant}
      />
    );
  }

  return (
    <Tooltip
      label={intl.formatMessage({
        defaultMessage: 'Difficulty',
        description: 'Challenge difficulty',
        id: '11MN+F',
      })}>
      <div className="flex items-center gap-1">
        <Icon className={clsx('size-4', themeTextSubtleColor)} />
        <Text
          className={textColor}
          color="inherit"
          size="body3"
          weight="medium">
          {label}
        </Text>
      </div>
    </Tooltip>
  );
}
