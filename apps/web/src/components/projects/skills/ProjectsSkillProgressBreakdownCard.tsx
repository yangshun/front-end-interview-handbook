import clsx from 'clsx';

import Text from '~/components/ui/Text';
import { themeBackgroundEmphasized } from '~/components/ui/theme';

import ProjectsSkillLabel from './metadata/ProjectsSkillLabel';
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
        'p-4 border-2 rounded-lg flex flex-col',
        'border-neutral-600 dark:border-neutral-400',
        className,
      )}>
      <Text size="body3" weight="bold">
        <ProjectsSkillLabel value={skill.key} />
      </Text>
      <Text className="text-2xs mt-2" color="subtle" size="inherit">
        +100 rep
      </Text>
      <div
        className={clsx(
          'h-2 mt-1.5 rounded-full',
          'bg-neutral-600 dark:bg-neutral-400',
        )}
      />
      <div className="flex flex-col mt-4 gap-1">
        {subSkills.map((subSkill) => (
          <div key={subSkill.key} className="flex items-center justify-between">
            <Text size="body3" weight="medium">
              <ProjectsSkillLabel value={subSkill.key} />
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
