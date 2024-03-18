import type { ProjectsChallengeSessionSkillsFormValues } from '../types';
import ProjectsSkillRoadmapSelectionInput from '../../skills/form/ProjectsSkillRoadmapSelectionInput';
import ProjectsSkillTechStackInput from '../../skills/form/ProjectsSkillTechStackInput';
import type { ProjectsSkillKey } from '../../skills/types';

type Props = Readonly<{
  challengeDefaultSkills: ReadonlyArray<ProjectsSkillKey>;
  onChangeSkills: (skills: ProjectsChallengeSessionSkillsFormValues) => void;
  skills: ProjectsChallengeSessionSkillsFormValues;
}>;

export default function ProjectsChallengeGetStartedSkillSelection({
  challengeDefaultSkills,
  skills,
  onChangeSkills,
}: Props) {
  return (
    <form className="flex flex-col gap-y-6">
      <ProjectsSkillRoadmapSelectionInput
        challengeDefaultSkills={challengeDefaultSkills}
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
