import { allProjectsChallengeMetadata } from 'contentlayer/generated';

import { fetchChallengeStatusForUserGroupedBySkills } from '~/db/projects/ProjectsReader';

import { skillsRoadmapConfig } from './ProjectsSkillRoadmapConfigData';
import type { ProjectsSkillRoadmapSectionData } from '../types';

export async function projectsSkillsRoadmapSectionData(
  targetUserId?: string,
): Promise<ProjectsSkillRoadmapSectionData> {
  const challenges = allProjectsChallengeMetadata.filter((challengeItem) =>
    challengeItem._raw.flattenedPath.endsWith('en-US'),
  );

  const skillsChallengeStatus =
    await fetchChallengeStatusForUserGroupedBySkills(targetUserId);

  return skillsRoadmapConfig.map((difficulty) => ({
    ...difficulty,
    items: difficulty.items.map((groupItem) => {
      let totalReputation = 0;
      const challengesSlugsAllSet = new Set();
      const challengesSlugsCompletedSet = new Set();

      const items = groupItem.items.map((skillKey) => {
        const skillRoadmapChallenges = challenges.filter((challengeItem) =>
          challengeItem.skills.includes(skillKey),
        );
        const skillRoadmapChallengeSlugs = new Set(
          skillRoadmapChallenges.map((challengeItem) => challengeItem.slug),
        );

        skillRoadmapChallenges.forEach((challengeMetadata) => {
          challengesSlugsAllSet.add(challengeMetadata.slug);
        });

        const skillReputation = skillRoadmapChallenges.reduce(
          (acc, item) => item.points + acc,
          0,
        );

        totalReputation += skillReputation;

        const skillTotalChallenges = skillRoadmapChallenges.length;
        const challengeStatusesForSkill = skillsChallengeStatus[skillKey] ?? {};
        const skillCompletedChallengesSet = new Set();
        const skillInProgressChallengesSet = new Set();

        // Filter out only the challenges on this skill's roadmap.
        Object.entries(challengeStatusesForSkill).map(
          ([challengeSlug, status]) => {
            // This challenge is not relevant to the skill, can be ignored.
            if (!skillRoadmapChallengeSlugs.has(challengeSlug)) {
              return;
            }

            if (status === 'COMPLETED') {
              challengesSlugsCompletedSet.add(challengeSlug);
              skillCompletedChallengesSet.add(challengeSlug);
            }

            if (status === 'IN_PROGRESS') {
              skillInProgressChallengesSet.add(challengeSlug);
            }
          },
        );

        return {
          completedChallenges: skillCompletedChallengesSet.size,
          inProgressChallenges: skillInProgressChallengesSet.size,
          key: skillKey,
          points: skillReputation,
          totalChallenges: skillTotalChallenges,
        };
      });

      return {
        completedChallenges: challengesSlugsCompletedSet.size,
        description: groupItem.description,
        items,
        key: groupItem.key,
        points: totalReputation,
        tagClassname: groupItem.tagClassname,
        totalChallenges: challengesSlugsAllSet.size,
      };
    }),
  }));
}
