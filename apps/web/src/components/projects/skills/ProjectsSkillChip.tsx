import clsx from 'clsx';

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
    <span
      className={clsx(
        'rounded-[4px] px-2 py-0.5 text-xs',
        difficultyClasses[difficulty],
      )}>
      {label}
    </span>
  );
}
