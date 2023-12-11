import clsx from 'clsx';

import Text from '~/components/ui/Text';
import { themeBackgroundEmphasized } from '~/components/ui/theme';

import type { ProjectSkillDifficulty, ProjectsSkill } from './types';

const difficultyClasses: Record<
  ProjectSkillDifficulty,
  {
    card: string;
    progressBar: string;
  }
> = {
  easy: {
    card: 'border-success',
    progressBar: 'bg-success',
  },
  hard: {
    card: 'border-danger',
    progressBar: 'bg-danger',
  },
  medium: {
    card: 'border-warning',
    progressBar: 'bg-warning',
  },
  unknown: {
    card: 'border-neutral-600 dark:border-neutral-400',
    progressBar: 'bg-neutral-600 dark:bg-neutral-400',
  },
};

type Props = Readonly<{
  className?: string;
  skill: ProjectsSkill & {
    repIncrease: number;
    repTotal: number;
  };
  subSkills: Array<
    ProjectsSkill & {
      repIncrease: number;
    }
  >;
}>;

export default function ProjectsSkillProgressBreakdownCard({
  className,
  skill,
  subSkills,
}: Props) {
  const { card, progressBar } =
    difficultyClasses[skill.difficulty ?? 'unknown'];

  return (
    <div
      className={clsx(
        'p-4 border-2 rounded-lg flex flex-col',
        card,
        className,
      )}>
      <Text size="body3" weight="bold">
        {skill.label}
      </Text>

      <Text className="text-2xs mt-2" color="subtle" size="custom">
        +100 rep
      </Text>
      <div className={clsx('h-2 mt-1.5 rounded-full', progressBar)} />
      <div className="flex flex-col mt-4 gap-1">
        {subSkills.map((subSkill) => (
          <div key={subSkill.key} className="flex items-center justify-between">
            <Text size="body3" weight="medium">
              {subSkill.label}
            </Text>
            <Text
              className={clsx(
                'px-2.5 py-0.5 rounded-full',
                themeBackgroundEmphasized,
              )}
              size="body3">
              +{subSkill.repIncrease}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
}
