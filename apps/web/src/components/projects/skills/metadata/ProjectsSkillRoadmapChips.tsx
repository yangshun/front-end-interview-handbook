import clsx from 'clsx';
import { useIntl } from 'react-intl';

import Text from '~/components/ui/Text';

import ProjectsSkillChip from './ProjectsSkillChip';
import ProjectsSkillChipDeleteButton from './ProjectsSkillChipDeleteButton';
import ProjectsSkillLabel from './ProjectsSkillLabel';
import { skillsRoadmap } from '../data/ProjectsSkillRoadmapData';
import type { ProjectsSkillKey } from '../types';

type Props =
  | Readonly<{
      onDelete: (deletedSkills: ReadonlyArray<ProjectsSkillKey>) => void;
      readonly: false;
      skills: ReadonlyArray<ProjectsSkillKey>;
    }>
  | Readonly<{
      readonly: true;
      skills: ReadonlyArray<ProjectsSkillKey>;
    }>;

function ProjectsSkillParentChip({
  parentSkill,
  childSkills,
  ...props
}:
  | Readonly<{
      childSkills: ReadonlyArray<ProjectsSkillKey>;
      onDelete: (deletedSkills: ReadonlyArray<ProjectsSkillKey>) => void;
      parentSkill: ProjectsSkillKey;
      readonly: false;
    }>
  | Readonly<{
      childSkills: ReadonlyArray<ProjectsSkillKey>;
      parentSkill: ProjectsSkillKey;
      readonly: true;
    }>) {
  const intl = useIntl();
  const parentSkillName = parentSkill;

  return (
    <span
      className={clsx(
        'flex items-center gap-x-1.5 rounded px-1.5 py-1',
        'bg-neutral-100 dark:bg-neutral-950',
      )}>
      <Text className="whitespace-nowrap" size="body3" weight="medium">
        <ProjectsSkillLabel value={parentSkill} />
      </Text>
      {(childSkills ?? []).map((childSkill) => (
        <ProjectsSkillChip key={childSkill} value={childSkill} {...props} />
      ))}
      {!props.readonly && (
        <ProjectsSkillChipDeleteButton
          label={intl.formatMessage(
            {
              defaultMessage: 'Delete {skill}',
              description: 'Delete a tracked skill',
              id: 'y7pPpV',
            },
            {
              skill: parentSkillName,
            },
          )}
          onClick={() => {
            props.onDelete(childSkills);
          }}
        />
      )}
    </span>
  );
}

export default function ProjectsSkillRoadmapChips({ skills, ...props }: Props) {
  const addedRoadmapSkills: Array<{
    childSkills: ReadonlyArray<ProjectsSkillKey>;
    parentSkill: ProjectsSkillKey;
  }> = [];

  skillsRoadmap.forEach((levelItem) => {
    levelItem.items.forEach((groupItem) => {
      const skillsWithinGroup = groupItem.items
        .map((skill) => skill.key)
        .filter((skillKey) => skills.includes(skillKey));

      if (skillsWithinGroup.length > 0) {
        addedRoadmapSkills.push({
          childSkills: skillsWithinGroup,
          parentSkill: groupItem.key,
        });
      }
    });
  });

  return (
    <div className="flex flex-wrap gap-2">
      {addedRoadmapSkills.map((group) => (
        <ProjectsSkillParentChip
          key={group.parentSkill}
          childSkills={group.childSkills}
          parentSkill={group.parentSkill}
          {...props}
        />
      ))}
    </div>
  );
}
