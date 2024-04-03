import type { ProjectsSkillMetadata } from 'contentlayer/generated';
import {
  allProjectsChallengeMetadata,
  allProjectsSkillMetadata,
} from 'contentlayer/generated';
import { sumBy } from 'lodash-es';

import {
  challengeItemAddTrackMetadata,
  fetchChallengeAccessForUserGroupedBySlug,
} from '~/db/projects/ProjectsReader';
import prisma from '~/server/prisma';

import { skillsRoadmapConfig } from './ProjectsSkillRoadmapConfigData';
import type {
  ProjectsSkillKey,
  ProjectsSkillRoadmapSectionData,
} from '../types';
import type { ProjectsChallengeItem } from '../../challenges/types';

import type { ProjectsChallengeSessionStatus } from '@prisma/client';

export async function fetchProjectsSkillsRoadmapSectionData(
  targetUserId?: string,
): Promise<ProjectsSkillRoadmapSectionData> {
  const challenges = allProjectsChallengeMetadata.filter((challengeItem) =>
    challengeItem._raw.flattenedPath.endsWith('en-US'),
  );

  const skillsChallengeStatus =
    await fetchChallengeStatusForUserGroupedBySkills(targetUserId);

  return skillsRoadmapConfig.map((difficulty) => ({
    ...difficulty,
    items: difficulty.items.map((parentSkillItem) => {
      const items = parentSkillItem.items.map((skillKey) => {
        const skillRoadmapChallenges = challenges.filter((challengeItem) =>
          challengeItem.skills.includes(skillKey),
        );
        const skillRoadmapChallengeSlugs = new Set(
          skillRoadmapChallenges.map((challengeItem) => challengeItem.slug),
        );

        const skillReputation = sumBy(
          skillRoadmapChallenges,
          (challengeItem) => challengeItem.points,
        );

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

      const totalReputation = sumBy(items, (item) => item.points);
      const totalCompletedChallenges = sumBy(
        items,
        (item) => item.completedChallenges,
      );
      const totalChallenges = sumBy(items, (item) => item.totalChallenges);

      return {
        completedChallenges: totalCompletedChallenges,
        description: parentSkillItem.description,
        items,
        key: parentSkillItem.key,
        points: totalReputation,
        premium: parentSkillItem.premium,
        tagClassname: parentSkillItem.tagClassname,
        totalChallenges,
      };
    }),
  }));
}

export async function readProjectsSkillMetadata(
  slugParam: string,
  requestedLocale = 'en-US',
): Promise<
  Readonly<{
    loadedLocale: string;
    skillMetadata: ProjectsSkillMetadata;
  }>
> {
  // So that we handle typos like extra characters.
  const slug = decodeURIComponent(slugParam).replaceAll(/[^a-zA-Z-]/g, '');

  return {
    loadedLocale: requestedLocale,
    skillMetadata: allProjectsSkillMetadata.find(
      (skillMetadataItem) =>
        skillMetadataItem.slug === slug && skillMetadataItem._raw.flattenedPath,
    )!,
  };
}

export async function readProjectsChallengesForSkill(
  slugParam: string,
  requestedLocale = 'en-US',
  userId?: string | null,
): Promise<
  Readonly<{
    challenges: ReadonlyArray<ProjectsChallengeItem>;
    loadedLocale: string;
  }>
> {
  // So that we handle typos like extra characters.
  const slug = decodeURIComponent(slugParam).replaceAll(/[^a-zA-Z-]/g, '');

  const [challengeStatuses, challengeAccessSet] = await Promise.all([
    fetchChallengeStatusForUserFilteredBySkillsGroupedBySlug(slugParam, userId),
    fetchChallengeAccessForUserGroupedBySlug(userId),
  ]);

  const challenges = allProjectsChallengeMetadata
    .filter((challengeItem) =>
      challengeItem._raw.flattenedPath.endsWith(requestedLocale),
    )
    .filter((challengeItem) => challengeItem.skills.includes(slug))
    .map((challengeMetadata) =>
      challengeItemAddTrackMetadata({
        completedCount: null,
        completedProfiles: [],
        metadata: challengeMetadata,
        status: challengeStatuses?.[challengeMetadata.slug] ?? null,
        userUnlocked: challengeAccessSet?.has(challengeMetadata.slug) ?? null,
      }),
    );

  return {
    challenges,
    loadedLocale: requestedLocale,
  };
}

export async function fetchChallengeStatusForUserFilteredBySkillsGroupedBySlug(
  skillSlug: string,
  userId?: string | null,
): Promise<Record<string, ProjectsChallengeSessionStatus> | null> {
  if (userId == null) {
    return null;
  }

  const sessionsForUserGrouped: Record<string, ProjectsChallengeSessionStatus> =
    {};

  const [sessionsForUser, submissions] = await Promise.all([
    prisma.projectsChallengeSession.findMany({
      orderBy: {
        createdAt: 'asc',
      },
      where: {
        projectsProfile: {
          userProfile: {
            id: userId,
          },
        },
        roadmapSkills: {
          has: skillSlug,
        },
        status: {
          not: 'STOPPED',
        },
      },
    }),
    prisma.projectsChallengeSubmission.findMany({
      distinct: ['slug'],
      where: {
        projectsProfile: {
          userId,
        },
        roadmapSkills: {
          has: skillSlug,
        },
      },
    }),
  ]);

  sessionsForUser?.forEach((session) => {
    sessionsForUserGrouped[session.slug] = session.status;
  });

  submissions.forEach((submission) => {
    sessionsForUserGrouped[submission.slug] = 'COMPLETED';
  });

  return sessionsForUserGrouped;
}

/**
 * For each skill, contains a map of challenge slug -> status.
 * Note that challenge slugs can be outside of the skill plan's
 * recommended challenges since any skill can be added to submissions.
 */
export async function fetchChallengeStatusForUserGroupedBySkills(
  userId?: string | null,
): Promise<
  Record<ProjectsSkillKey, Record<string, ProjectsChallengeSessionStatus>>
> {
  if (userId == null) {
    return {};
  }

  const skillsChallengeStatus: Record<
    ProjectsSkillKey,
    Record<string, ProjectsChallengeSessionStatus>
  > = {};

  const [sessionsForUser, submissions] = await Promise.all([
    prisma.projectsChallengeSession.findMany({
      orderBy: {
        createdAt: 'asc',
      },
      where: {
        projectsProfile: {
          userProfile: {
            id: userId,
          },
        },
        status: {
          not: 'STOPPED',
        },
      },
    }),
    prisma.projectsChallengeSubmission.findMany({
      distinct: ['slug'],
      where: {
        projectsProfile: {
          userId,
        },
      },
    }),
  ]);

  sessionsForUser?.forEach((session) => {
    session.roadmapSkills.forEach((skill) => {
      if (!skillsChallengeStatus[skill]) {
        skillsChallengeStatus[skill] = {};
      }

      skillsChallengeStatus[skill][session.slug] = session.status;
    });
  });

  submissions.forEach((submission) => {
    submission.roadmapSkills.forEach((skill) => {
      if (!skillsChallengeStatus[skill]) {
        skillsChallengeStatus[skill] = {};
      }

      skillsChallengeStatus[skill][submission.slug] = 'COMPLETED';
    });
  });

  return skillsChallengeStatus;
}
