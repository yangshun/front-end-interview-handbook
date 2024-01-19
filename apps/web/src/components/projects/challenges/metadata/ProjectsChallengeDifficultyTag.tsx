import clsx from 'clsx';
import { startCase } from 'lodash-es';
import { RiFlashlightLine } from 'react-icons/ri';

import Badge from '~/components/ui/Badge';
import Text from '~/components/ui/Text';
import { themeTextSubtleColor } from '~/components/ui/theme';

import type { ProjectsChallengeDifficulty } from '../types';

type Props = Readonly<{
  difficulty: ProjectsChallengeDifficulty;
  variant?: 'badge' | 'inline';
}>;

export default function ProjectsChallengeDifficultyTag({
  difficulty,
  variant = 'inline',
}: Props) {
  const Icon = RiFlashlightLine;
  const label = startCase(difficulty);

  if (variant === 'badge') {
    {
      /* TODO(projects): Change color according to difficulty. */
    }

    return <Badge icon={Icon} label={label} variant="success" />;
  }

  return (
    <div className="flex items-center gap-1">
      <Icon className={clsx('h-4 w-4', themeTextSubtleColor)} />
      <Text color="subtle" size="body3">
        {label}
      </Text>
    </div>
  );
}
