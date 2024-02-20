import clsx from 'clsx';

import Text from '~/components/ui/Text';
import { themeBackgroundEmphasized } from '~/components/ui/theme';

import { projectsSkillLabel } from './data/ProjectsSkillListData';
import type { ProjectsSkillKey } from './types';

type Props = Readonly<{
  className?: string;
  skill: {
    key: ProjectsSkillKey;
    repIncrease: number;
    repTotal: number;
  };
  subSkills: Array<
    Readonly<{
      key: ProjectsSkillKey;
      repIncrease: number;
    }>
  >;
}>;

export default function ProjectsSkillProgressBreakdownCard({
  className,
  skill,
  subSkills,
}: Props) {
  return (
    <div
      className={clsx(
        'flex flex-col rounded-lg border-2 p-4',
        'border-neutral-600 dark:border-neutral-400',
        className,
      )}>
      <Text size="body3" weight="bold">
        {projectsSkillLabel(skill.key)}
      </Text>
      <Text className="text-2xs mt-2" color="subtle" size="inherit">
        +100 rep
      </Text>
      <div
        className={clsx(
          'mt-1.5 h-2 rounded-full',
          'bg-neutral-600 dark:bg-neutral-400',
        )}
      />
      <div className="mt-4 flex flex-col gap-1">
        {subSkills.map((subSkill) => (
          <div key={subSkill.key} className="flex items-center justify-between">
            <Text size="body3" weight="medium">
              {projectsSkillLabel(subSkill.key)}
            </Text>
            <Text
              className={clsx(
                'rounded-full px-2.5 py-0.5',
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
