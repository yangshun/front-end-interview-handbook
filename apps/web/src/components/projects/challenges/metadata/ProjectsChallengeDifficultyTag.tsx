import clsx from 'clsx';
import { startCase } from 'lodash-es';
import { RiFlashlightLine } from 'react-icons/ri';

import type { BadgeVariant } from '~/components/ui/Badge';
import Badge from '~/components/ui/Badge';
import Text from '~/components/ui/Text';
import { themeIconColor, themeTextSecondaryColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import type { ProjectsChallengeDifficulty } from '../types';

type Props = Readonly<{
  difficulty: ProjectsChallengeDifficulty;
  variant?: 'badge' | 'inline';
}>;

const difficultyColors: Record<
  ProjectsChallengeDifficulty,
  Readonly<{ badgeVariant: BadgeVariant; textColor: string }>
> = {
  mid: { badgeVariant: 'info', textColor: 'text-blue' },
  nightmare: { badgeVariant: 'danger', textColor: 'text-red' },
  senior: { badgeVariant: 'warning', textColor: 'text-yellow' },
  starter: { badgeVariant: 'success', textColor: 'text-green' },
};

export default function ProjectsChallengeDifficultyTag({
  difficulty,
  variant = 'inline',
}: Props) {
  const Icon = RiFlashlightLine;
  const label = startCase(difficulty);
  const { badgeVariant, textColor } = difficultyColors[difficulty];

  if (variant === 'badge') {
    return <Badge icon={Icon} label={label} variant={badgeVariant} />;
  }

  return (
    <Tooltip label="Difficulty">
      <div className="flex items-center gap-1">
        <Icon className={clsx('size-4', themeTextSecondaryColor)} />
        <Text className={textColor} color="inherit" size="body3">
          {label}
        </Text>
      </div>
    </Tooltip>
  );
}
