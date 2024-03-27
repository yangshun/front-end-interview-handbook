import { skillsRoadmapConfig } from './ProjectsSkillRoadmapConfigData';
import type { ProjectsSkillRoadmapSectionData } from '../types';

export async function projectsSkillsRoadmapSectionData(
  targetUserId?: string,
): Promise<ProjectsSkillRoadmapSectionData> {
  return skillsRoadmapConfig.map((difficulty) => ({
    ...difficulty,
    items: difficulty.items.map((groupItem) => {
      const reputation = 1337;
      const totalChallenges = 267;
      const completedChallenges = 120;

      return {
        completedChallenges,
        description: groupItem.description,
        items: groupItem.items.map((skillKey) => {
          const skillReputation = 1337;
          const skillTotalChallenges = 266;
          const skillCompletedChallenges = 133;

          return {
            completedChallenges: skillCompletedChallenges,
            key: skillKey,
            reputation: skillReputation,
            totalChallenges: skillTotalChallenges,
          };
        }),
        key: groupItem.key,
        reputation,
        tagClassname: groupItem.tagClassname,
        totalChallenges,
      };
    }),
  }));
}
