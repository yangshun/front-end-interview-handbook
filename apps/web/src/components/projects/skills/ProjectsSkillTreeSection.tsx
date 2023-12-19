import Text from '~/components/ui/Text';

import ProjectsSkillTree from './ProjectsSkillTree';
import {
  foundationalSkillTree,
  intermediateSkillTree,
} from './ProjectsSkillTreeData';

export default function ProjectsSkillTreeSection() {
  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col gap-4">
        <Text size="body2" weight="bold">
          Foundational skills
        </Text>
        <div className="px-4">
          <ProjectsSkillTree tree={foundationalSkillTree} />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Text size="body2" weight="bold">
          Intermediate skills
        </Text>
        <div className="px-4">
          <ProjectsSkillTree tree={intermediateSkillTree} />
        </div>
      </div>
    </div>
  );
}
