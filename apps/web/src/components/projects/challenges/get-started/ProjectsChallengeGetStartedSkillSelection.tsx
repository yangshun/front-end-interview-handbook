import { useIntl } from '~/components/intl';
import { getProjectsTechStackInputAttributes } from '~/components/projects/skills/form/ProjectsSkillListInputSchema';

import { getProjectsRoadmapSkillsInputAttributes } from '../../skills/form/ProjectsSkillListInputSchema';
import ProjectsSkillRoadmapSelectionInput from '../../skills/form/ProjectsSkillRoadmapSelectionInput';
import ProjectsSkillTechStackInput from '../../skills/form/ProjectsSkillTechStackInput';
import type { ProjectsSkillKey } from '../../skills/types';
import type { ProjectsChallengeSessionSkillsFormValues } from '../types';

type Props = Readonly<{
  challengeDefaultSkills: ReadonlyArray<ProjectsSkillKey>;
  onChangeSkills: (skills: ProjectsChallengeSessionSkillsFormValues) => void;
  skills: ProjectsChallengeSessionSkillsFormValues;
}>;

export default function ProjectsChallengeGetStartedSkillSelection({
  challengeDefaultSkills,
  onChangeSkills,
  skills,
}: Props) {
  const intl = useIntl();
  const roadmapSkillsAttrs = getProjectsRoadmapSkillsInputAttributes(
    intl,
    false,
  );
  const techStackSkillsAttrs = getProjectsTechStackInputAttributes(intl, false);

  return (
    <form className="flex flex-col gap-y-6">
      <ProjectsSkillRoadmapSelectionInput
        challengeDefaultSkills={challengeDefaultSkills}
        description={roadmapSkillsAttrs.description}
        label={roadmapSkillsAttrs.label}
        placeholder={roadmapSkillsAttrs.placeholder}
        value={skills.roadmapSkills}
        onChange={(roadmapSkills) => {
          onChangeSkills({
            ...skills,
            roadmapSkills: roadmapSkills.slice(),
          });
        }}
      />
      <ProjectsSkillTechStackInput
        description={techStackSkillsAttrs.description}
        label={techStackSkillsAttrs.label}
        placeholder={techStackSkillsAttrs.placeholder}
        value={skills.techStackSkills}
        onChange={(techStackSkills) => {
          onChangeSkills({
            ...skills,
            techStackSkills: (techStackSkills ?? []).slice(),
          });
        }}
      />
    </form>
  );
}
