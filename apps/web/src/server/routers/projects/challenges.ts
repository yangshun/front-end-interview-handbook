import { z } from 'zod';

import type { ProjectsChallengeHistoricalStatuses } from '~/components/projects/challenges/types';
import {
  fetchProjectsSkillsRoadmapSectionData,
  readProjectsChallengeItemsForSkill,
} from '~/components/projects/skills/data/ProjectsSkillReader';
import {
  fetchProjectsTrackChallengeHistoricalStatuses,
  readProjectsTrackList,
} from '~/components/projects/tracks/data/ProjectsTrackReader';

import prisma from '~/server/prisma';
import { publicProcedure, router } from '~/server/trpc';

export const projectsChallengesRouter = router({
  countUniqueUsingSkill: publicProcedure
    .input(
      z.object({
        skill: z.string(),
      }),
    )
    .query(async ({ ctx: { viewer }, input: { skill } }) => {
      const distinctSlugs = await prisma.projectsChallengeSubmission.findMany({
        distinct: ['slug'],
        where: {
          projectsProfile: {
            userId: viewer?.id,
          },
          roadmapSkills: {
            has: skill,
          },
        },
      });

      return distinctSlugs.length;
    }),
  listForSkills: publicProcedure
    .input(
      z.object({
        locale: z.string().optional(),
        skillSlug: z.string(),
      }),
    )
    .query(async ({ ctx: { viewer }, input: { locale, skillSlug } }) => {
      return readProjectsChallengeItemsForSkill(skillSlug, locale, viewer?.id);
    }),
  progress: publicProcedure
    .input(
      z.object({
        locale: z.string(),
      }),
    )
    .query(async ({ ctx: { viewer }, input: { locale } }) => {
      const [
        skillsRoadmap,
        { tracks },
        challengeHistoricalStatuses,
        completedChallenges,
      ] = await Promise.all([
        fetchProjectsSkillsRoadmapSectionData(viewer?.id),
        readProjectsTrackList(locale, viewer?.id),
        fetchProjectsTrackChallengeHistoricalStatuses(viewer?.id),
        prisma.projectsChallengeSubmission.count({
          where: {
            projectsProfile: {
              userId: viewer?.id,
            },
          },
        }),
      ]);

      return {
        challengeHistoricalStatuses,
        completedChallenges,
        projectTracks: tracks,
        skillsRoadmap,
      };
    }),
  skillPlanProgress: publicProcedure
    .input(
      z.object({
        skillSlug: z.string(),
        userId: z.string(),
      }),
    )
    .query(async ({ input: { skillSlug, userId } }) => {
      const challengeStatuses: ProjectsChallengeHistoricalStatuses = {};

      const [repPoints, challengeSessionRows, submissions] = await Promise.all([
        prisma.projectsReputationPoint.aggregate({
          _sum: {
            points: true,
          },
          where: {
            key: {
              endsWith: `skill.${skillSlug}`,
            },
            projectsProfile: {
              userId,
            },
          },
        }),
        prisma.projectsChallengeSession.findMany({
          orderBy: {
            updatedAt: 'asc',
          },
          select: {
            slug: true,
            status: true,
            updatedAt: true,
          },
          where: {
            projectsProfile: {
              userId,
            },
            roadmapSkills: {
              has: skillSlug,
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

      submissions.forEach((submission) => {
        challengeStatuses[submission.slug] = {
          completedBefore: true,
          currentStatus: 'COMPLETED',
        };
      });

      challengeSessionRows.forEach(({ slug, status }) => {
        if (!challengeStatuses[slug]) {
          challengeStatuses[slug] = {
            completedBefore: false,
            currentStatus: status,
          };
        }

        challengeStatuses[slug].currentStatus = status;
        if (status === 'COMPLETED') {
          challengeStatuses[slug].completedBefore = true;
        }
      });

      return { challengeStatuses, points: repPoints._sum.points };
    }),
});
