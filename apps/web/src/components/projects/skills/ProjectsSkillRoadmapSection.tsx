import ProjectsSkillFamilyCard from '~/components/projects/skills/ProjectsSkillFamilyCard';
import Text from '~/components/ui/Text';

import {
  foundationalSkills,
  intermediateSkills,
} from './ProjectsSkillRoadmapData';

export default function ProjectsSkillRoadmapSection() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <Text size="body2" weight="bold">
          Foundational skills
        </Text>
        <div className="flex flex-col gap-4">
          {foundationalSkills.map((skill) => (
            <ProjectsSkillFamilyCard key={Math.random()} skill={skill} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Text size="body2" weight="bold">
          Intermediate skills
        </Text>
        <div className="flex flex-col gap-4">
          {intermediateSkills.map((skill) => (
            <ProjectsSkillFamilyCard key={Math.random()} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  );
}
