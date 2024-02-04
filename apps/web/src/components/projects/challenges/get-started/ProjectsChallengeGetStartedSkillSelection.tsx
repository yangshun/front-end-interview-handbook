import type { ProjectsChallengeSessionSkillsFormValues } from '../types';
import ProjectsSkillRoadmapSelectionInput from '../../skills/form/ProjectsSkillRoadmapSelectionInput';
import ProjectsSkillTechStackInput from '../../skills/form/ProjectsSkillTechStackInput';

type Props = Readonly<{
  onChangeSkills: (skills: ProjectsChallengeSessionSkillsFormValues) => void;
  skills: ProjectsChallengeSessionSkillsFormValues;
}>;

export default function ProjectsChallengeGetStartedSkillSelection({
  skills,
  onChangeSkills,
}: Props) {
  return (
    <form className="flex flex-col gap-y-6">
      <ProjectsSkillRoadmapSelectionInput
        value={skills.roadmapSkills}
        onChange={(roadmapSkills) => {
          onChangeSkills({
            ...skills,
            roadmapSkills: roadmapSkills.slice(),
          });
        }}
      />
      <ProjectsSkillTechStackInput
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
