import clsx from 'clsx';

import Text from '~/components/ui/Text';

import type { ProjectSkillDifficulty } from './types';

type Props = Readonly<{
  difficulty: ProjectSkillDifficulty;
  label: string;
}>;

const difficultyClasses: Record<ProjectSkillDifficulty, string> = {
  easy: 'bg-success text-success-darker',
  hard: 'bg-danger text-danger-darker',
  medium: 'bg-warning text-warning-darker',
};

export default function ProjectsSkillChip({ label, difficulty }: Props) {
  return (
    <div
      className={clsx(
        'flex h-5 items-center justify-center rounded px-2 text-xs',
        difficultyClasses[difficulty],
      )}>
      <Text color="inherit" size="body3">
        {label}
      </Text>
    </div>
  );
}
