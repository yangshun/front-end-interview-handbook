import ProjectsSkillRoadmapGroupCard from '~/components/projects/skills/roadmap/ProjectsSkillRoadmapGroupCard';
import Text from '~/components/ui/Text';

import type { ProjectsSkillRoadmapSectionData } from '../types';

type Props = Readonly<{
  isViewerPremium: boolean;
  isViewingOwnProfile?: boolean;
  skillsRoadmap: ProjectsSkillRoadmapSectionData;
  userProfile: React.ComponentProps<
    typeof ProjectsSkillRoadmapGroupCard
  >['userProfile'];
}>;

export default function ProjectsSkillRoadmapSection({
  isViewerPremium,
  isViewingOwnProfile,
  skillsRoadmap,
  userProfile,
}: Props) {
  return (
    <div className="flex max-w-4xl flex-col gap-10">
      {skillsRoadmap.map((levelItem) => (
        <div key={levelItem.title} className="flex flex-col gap-4">
          <Text size="body2" weight="bold">
            {levelItem.title}
          </Text>
          <div className="flex flex-col gap-4">
            {levelItem.items.map((group) => (
              <ProjectsSkillRoadmapGroupCard
                key={group.key}
                group={group}
                isViewerPremium={isViewerPremium}
                isViewingOwnProfile={isViewingOwnProfile}
                userProfile={userProfile}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
