import clsx from 'clsx';

import { useIntl } from '~/components/intl';
import Text from '~/components/ui/Text';

import { projectsSkillLabel } from '../data/ProjectsSkillListData';
import { skillsRoadmapConfig } from '../data/ProjectsSkillRoadmapConfigData';
import type { ProjectsSkillKey } from '../types';
import ProjectsSkillChip from './ProjectsSkillChip';
import ProjectsSkillChipDeleteButton from './ProjectsSkillChipDeleteButton';

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
  childSkills,
  parentSkill,
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
        'flex flex-wrap items-center gap-1 rounded',
        'px-1.5 py-1',
        'bg-neutral-100 dark:bg-neutral-950',
      )}>
      <Text className="whitespace-nowrap pe-1" size="body3" weight="medium">
        {projectsSkillLabel(parentSkill)}
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

  skillsRoadmapConfig.forEach((levelItem) => {
    levelItem.items.forEach((parentSkillItem) => {
      const skillsWithinParent = parentSkillItem.items
        .map(({ key }) => key)
        .filter((skillKey) => skills.includes(skillKey));

      if (skillsWithinParent.length > 0) {
        addedRoadmapSkills.push({
          childSkills: skillsWithinParent,
          parentSkill: parentSkillItem.key,
        });
      }
    });
  });

  return (
    <>
      {addedRoadmapSkills.map((item) => (
        <ProjectsSkillParentChip
          key={item.parentSkill}
          childSkills={item.childSkills}
          parentSkill={item.parentSkill}
          {...props}
        />
      ))}
    </>
  );
}
