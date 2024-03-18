import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';

import Text, { textVariants } from '~/components/ui/Text';
import { themeBorderElementColor } from '~/components/ui/theme';

import { projectsSkillLabel } from '../data/ProjectsSkillListData';
import { skillsRoadmap } from '../data/ProjectsSkillRoadmapData';

type Props = Readonly<{
  className?: string;
  isLabelHidden?: boolean;
  label: string;
  skills: ReadonlyArray<string>;
}>;

export default function ProjectsSkillGroupList({
  className,
  isLabelHidden,
  label,
  skills,
}: Props) {
  if (skills.length === 0) {
    return null;
  }

  const skillsSet = new Set(skills);
  const skillGroupsSet = new Set();
  const skillGroupItems: Array<{
    className: string;
    key: string;
  }> = [];

  skillsRoadmap.forEach((levelItem) => {
    levelItem.items.forEach((groupItem) => {
      groupItem.items.forEach((skill) => {
        if (skillsSet.has(skill.key) && !skillGroupsSet.has(groupItem.key)) {
          skillGroupsSet.add(groupItem.key);
          skillGroupItems.push({
            className: groupItem.tagClassname,
            key: groupItem.key,
          });
        }
      });
    });
  });

  return (
    <div
      aria-label={isLabelHidden ? label : undefined}
      className={clsx('flex flex-wrap items-center gap-2', className)}>
      {!isLabelHidden && (
        <Text color="secondary" size="body3">
          {label}
        </Text>
      )}
      <ul className="flex flex-wrap items-center gap-2">
        {skillGroupItems.map((skillGroupItem) => (
          <li
            key={skillGroupItem.key}
            className={clsx(
              'inline-flex items-center rounded px-2 py-0.5',
              skillGroupItem.className,
              textVariants({ size: 'body3', weight: 'bold' }),
            )}>
            {projectsSkillLabel(skillGroupItem.key)}
          </li>
        ))}
      </ul>
    </div>
  );
}
