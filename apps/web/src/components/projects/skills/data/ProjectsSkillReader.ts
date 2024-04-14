import type {
  ProjectsSkillInfo,
  ProjectsSkillMetadata,
} from 'contentlayer/generated';
import {
  allProjectsSkillInfos,
  allProjectsSkillMetadata,
} from 'contentlayer/generated';
import { sumBy } from 'lodash-es';

import {
  challengeItemAddTrackMetadata,
  fetchChallengeAccessForUserGroupedBySlug,
  readProjectsChallengeMetadataList,
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
  const { challengeMetadataList } = await readProjectsChallengeMetadataList();

  const skillsChallengeStatus =
    await fetchChallengeStatusForUserGroupedBySkills(targetUserId);

  return skillsRoadmapConfig.map((difficulty) => ({
    ...difficulty,
    items: difficulty.items.map((parentSkillItem) => {
      const items = parentSkillItem.items.map((skillKey) => {
        const { skillItem } = readProjectsSkillItem(skillKey);
        const skillRoadmapChallengeSlugs =
          skillItem.metadata != null ? skillItem.metadata.challenges : [];

        const skillRoadmapChallenges = skillRoadmapChallengeSlugs
          .map((challengeSlug) =>
            challengeMetadataList.find(
              (challengeItem) => challengeItem.slug === challengeSlug,
            ),
          )
          .flatMap((challenge) => (challenge != null ? [challenge] : []));

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
            if (!skillRoadmapChallengeSlugs.includes(challengeSlug)) {
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
          name: skillItem.info?.title || skillKey,
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

export function readProjectsSkillMetadata(
  slugParam: string,
): ProjectsSkillMetadata {
  // So that we handle typos like extra characters.
  const slug = decodeURIComponent(slugParam).replaceAll(/[^a-zA-Z-]/g, '');

  return allProjectsSkillMetadata.find(
    (skillMetadataItem) => skillMetadataItem.slug === slug,
  )!;
}

export function readProjectsSkillInfo(
  slugParam: string,
  requestedLocale = 'en-US',
): Readonly<{
  loadedLocale: string;
  skillInfo: ProjectsSkillInfo;
}> {
  // So that we handle typos like extra characters.
  const slug = decodeURIComponent(slugParam).replaceAll(/[^a-zA-Z-]/g, '');

  const skillInfo = allProjectsSkillInfos.find(
    (infoItem) => infoItem.slug === slug && infoItem.locale === requestedLocale,
  )!;

  return {
    loadedLocale: requestedLocale,
    skillInfo,
  };
}

export function readProjectsSkillItem(
  slugParam: string,
  requestedLocale = 'en-US',
): Readonly<{
  loadedLocale: string;
  skillItem: {
    info: ProjectsSkillInfo;
    metadata: ProjectsSkillMetadata;
  };
}> {
  // So that we handle typos like extra characters.
  const slug = decodeURIComponent(slugParam).replaceAll(/[^a-zA-Z-]/g, '');
  const metadata = readProjectsSkillMetadata(slug);
  const { skillInfo } = readProjectsSkillInfo(slug, requestedLocale);

  return {
    loadedLocale: requestedLocale,
    skillItem: {
      info: skillInfo,
      metadata,
    },
  };
}

export async function readProjectsChallengeItemsForSkill(
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

  const { challengeMetadataList } = await readProjectsChallengeMetadataList();
  const { skillItem } = readProjectsSkillItem(slug);
  const skillRoadmapChallengeSlugs =
    skillItem.metadata != null ? skillItem.metadata.challenges : [];

  const skillRoadmapChallenges = skillRoadmapChallengeSlugs
    .map((challengeSlug) =>
      challengeMetadataList.find(
        (challengeItem) => challengeItem.slug === challengeSlug,
      ),
    )
    .flatMap((challenge) => (challenge != null ? [challenge] : []))
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
    challenges: skillRoadmapChallenges,
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
