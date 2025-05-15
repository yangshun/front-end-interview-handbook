import clsx from 'clsx';

import ProjectsSkillList from '~/components/projects/skills/metadata/ProjectsSkillList';
import Text from '~/components/ui/Text';

import { projectsSkillExtractParents } from '../data/ProjectsSkillUtils';
import type { ProjectsSkillKey } from '../types';
import ProjectsSkillParentSkillList from './ProjectsSkillParentSkillList';

type Props = Readonly<{
  isLabelHidden?: boolean;
  label: string;
  limit?: number;
  roadmapSkills: ReadonlyArray<ProjectsSkillKey>;
  techStackSkills: ReadonlyArray<ProjectsSkillKey>;
}>;

export default function ProjectsSkillSummaryList({
  isLabelHidden,
  label,
  roadmapSkills,
  techStackSkills,
}: Props) {
  const groups = projectsSkillExtractParents(roadmapSkills);

  return (
    <div
      aria-label={isLabelHidden ? label : undefined}
      className={clsx('flex items-center gap-2 overflow-hidden')}>
      {!isLabelHidden && (
        <Text className="whitespace-nowrap" color="secondary" size="body3">
          {label}
        </Text>
      )}
      <div className="shrink-0">
        <ProjectsSkillParentSkillList parentSkills={groups} />
      </div>
      <div className="flex shrink-0 flex-wrap items-center gap-2">
        <ProjectsSkillList
          limit={Math.max(3 - groups.length, 0)}
          skills={techStackSkills}
        />
      </div>
    </div>
  );
}
