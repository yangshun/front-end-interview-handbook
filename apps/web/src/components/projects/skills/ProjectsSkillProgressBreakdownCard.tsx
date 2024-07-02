import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';

import Text from '~/components/ui/Text';
import { themeBackgroundChipColor } from '~/components/ui/theme';

import { projectsSkillLabel } from './data/ProjectsSkillListData';
import type { ProjectsSkillKey } from './types';

type Props = Readonly<{
  className?: string;
  skill: {
    key: ProjectsSkillKey;
    points: number;
  };
  subSkills: Array<
    Readonly<{
      key: ProjectsSkillKey;
      points: number;
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
        'min-w-sm flex flex-1 flex-col rounded-lg border-2 p-4',
        'border-neutral-600 dark:border-neutral-400',
        className,
      )}>
      <div className="flex flex-wrap items-center justify-between gap-y-2">
        <Text size="body3" weight="bold">
          {projectsSkillLabel(skill.key)}
        </Text>
        <Text color="subtle" size="body3" weight="normal">
          <FormattedMessage
            defaultMessage="+{points} rep"
            description="Rep gain for parent skill"
            id="+1woLQ"
            values={{
              points: skill.points,
            }}
          />
        </Text>
      </div>

      <div className="mt-4 flex flex-col gap-1">
        {subSkills.map((subSkill) => (
          <div key={subSkill.key} className="flex items-center justify-between">
            <Text color="subtitle" size="body3" weight="medium">
              {projectsSkillLabel(subSkill.key)}
            </Text>
            <Text
              className={clsx(
                'rounded-full px-2.5 py-0.5',
                themeBackgroundChipColor,
              )}
              size="body3">
              +{subSkill.points}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
}
