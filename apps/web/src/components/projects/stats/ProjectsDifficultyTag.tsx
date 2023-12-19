import clsx from 'clsx';
import { startCase } from 'lodash-es';
import { RiFlashlightLine } from 'react-icons/ri';

import Text from '~/components/ui/Text';
import { themeTextSubtleColor } from '~/components/ui/theme';

import type { ProjectsProjectDifficulty } from '../projects/types';

type Props = Readonly<{
  difficulty: ProjectsProjectDifficulty;
}>;

export default function ProjectsDifficultyTag({ difficulty }: Props) {
  return (
    <div className="flex items-center gap-1">
      <RiFlashlightLine className={clsx('h-4 w-4', themeTextSubtleColor)} />
      <Text color="success" size="body2">
        {startCase(difficulty)}
      </Text>
    </div>
  );
}
