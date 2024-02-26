import { allProjectsChallengeMetadata } from 'contentlayer/generated';
import { z } from 'zod';

import { projectsReputationFirstSessionConfig } from '~/components/projects/reputation/ProjectsReputationPointsConfig';
import { projectsSkillListInputOptionalSchemaServer } from '~/components/projects/skills/form/ProjectsSkillListInputSchema';

import {
  readProjectsChallengeList,
  readProjectsTrackList,
} from '~/db/projects/ProjectsReader';
import prisma from '~/server/prisma';

import { projectsUserProcedure } from './procedures';
import { publicProcedure } from '../../trpc';
import { router } from '../../trpc';

const projectsSessionProcedure = projectsUserProcedure.input(
  z.object({
    slug: z.string(),
  }),
);

export const projectsSessionsRouter = router({
  end: projectsSessionProcedure.mutation(
    async ({ input: { slug }, ctx: { projectsProfileId } }) => {
      return await prisma.projectsChallengeSession.updateMany({
        data: {
          status: 'STOPPED',
          stoppedAt: new Date(),
        },
        where: {
          profileId: projectsProfileId,
          slug,
          status: 'IN_PROGRESS',
        },
      });
    },
  ),
  latestInProgress: projectsSessionProcedure.query(
    async ({ input: { slug }, ctx: { projectsProfileId } }) => {
      return await prisma.projectsChallengeSession.findFirst({
        where: {
          profileId: projectsProfileId,
          slug,
          status: 'IN_PROGRESS',
        },
      });
    },
  ),
  list: publicProcedure
    .input(
      z.object({
        orderBy: z.enum(['asc', 'desc']).optional(),
        statuses: z
          .array(z.enum(['COMPLETED', 'IN_PROGRESS', 'STOPPED']))
          .nonempty()
          .optional(),
        userId: z.string().uuid().optional(),
      }),
    )
    .query(async ({ input: { orderBy, statuses, userId }, ctx: { user } }) => {
      const sessions = await prisma.projectsChallengeSession.findMany({
        orderBy: {
          createdAt: orderBy,
        },
        where: {
          projectsProfile: {
            userId: userId ?? user?.id,
          },
          status: statuses
            ? {
                in: statuses,
              }
            : undefined,
        },
      });

      const { challenges: projectsChallengeList } =
        await readProjectsChallengeList();

      return sessions.map((session) => {
        const challenge = projectsChallengeList.find(
          (project) => project.metadata.slug === session.slug,
        );

        return {
          ...session,
          challenge,
        };
      });
    }),
  listRecent: projectsUserProcedure
    .input(
      z.object({
        limit: z.number().int().positive(),
      }),
    )
    .query(async ({ input: { limit }, ctx: { projectsProfileId } }) => {
      const sessions = await prisma.projectsChallengeSession.findMany({
        orderBy: {
          updatedAt: 'desc',
        },
        take: limit,
        where: {
          profileId: projectsProfileId,
          status: 'IN_PROGRESS',
        },
      });

      return sessions.map((session) => {
        const challenge = allProjectsChallengeMetadata.find(
          (project) => project.slug === session.slug,
        );

        return {
          ...session,
          challenge,
        };
      });
    }),
  skillsUpdate: projectsSessionProcedure
    .input(
      z.object({
        roadmapSkills: projectsSkillListInputOptionalSchemaServer,
        sessionId: z.string().uuid(),
        techStackSkills: projectsSkillListInputOptionalSchemaServer,
      }),
    )
    .mutation(
      async ({
        input: { sessionId, roadmapSkills, techStackSkills, slug },
        ctx: { projectsProfileId },
      }) => {
        return await prisma.projectsChallengeSession.update({
          data: {
            roadmapSkills,
            techStackSkills,
          },
          where: {
            id: sessionId,
            profileId: projectsProfileId,
            slug,
          },
        });
      },
    ),
  start: projectsSessionProcedure
    .input(
      z.object({
        roadmapSkills: projectsSkillListInputOptionalSchemaServer,
        techStackSkills: projectsSkillListInputOptionalSchemaServer,
      }),
    )
    .mutation(
      async ({
        input: { slug, roadmapSkills, techStackSkills },
        ctx: { projectsProfileId },
      }) => {
        // Don't allow creating multiple sessions.
        const existingSession = await prisma.projectsChallengeSession.findFirst(
          {
            where: {
              profileId: projectsProfileId,
              slug,
              status: 'IN_PROGRESS',
            },
          },
        );

        // If session exists, just update the skills.
        if (existingSession != null) {
          return await prisma.projectsChallengeSession.update({
            data: {
              roadmapSkills,
              techStackSkills,
            },
            where: {
              id: existingSession.id,
            },
          });
        }

        const repConfig = projectsReputationFirstSessionConfig();
        const reputationFields = {
          key: repConfig.key,
          profileId: projectsProfileId,
        };

        const [
          session,
          // _rep,
        ] = await prisma.$transaction([
          prisma.projectsChallengeSession.create({
            data: {
              profileId: projectsProfileId,
              roadmapSkills,
              slug,
              techStackSkills,
            },
          }),
          prisma.projectsReputationPoint.upsert({
            create: {
              ...reputationFields,
              points: repConfig.points,
            },
            update: {},
            where: {
              profileId_key: reputationFields,
            },
          }),
        ]);

        return session;
      },
    ),
  startedBefore: projectsUserProcedure.query(
    async ({ ctx: { projectsProfileId } }) => {
      const sessions = await prisma.projectsChallengeSession.count({
        where: {
          profileId: projectsProfileId,
        },
      });

      return sessions > 0;
    },
  ),
  tracksWithMostProgress: projectsUserProcedure
    .input(
      z.object({
        limit: z.number().int().positive(),
      }),
    )
    .query(async ({ input: { limit }, ctx: { projectsProfileId } }) => {
      const { tracks } = await readProjectsTrackList();
      const completedSessions = await prisma.projectsChallengeSession.findMany({
        where: {
          profileId: projectsProfileId,
          status: 'COMPLETED',
        },
      });

      const userTracksData = tracks.map((track) => {
        const completedChallengesForTrack = track.challenges.filter(
          (challenge) =>
            completedSessions.some(
              (session) => session.slug === challenge.slug,
            ),
        );
        const pointsCompleted = completedChallengesForTrack.reduce(
          (total, challenge) => total + challenge.points,
          0,
        );
        const totalPoints = track.challenges.reduce(
          (total, challenge) => total + challenge.points,
          0,
        );
        const percentageCompleted = (pointsCompleted / totalPoints) * 100;
        const numChallengesCompleted = completedChallengesForTrack.length;
        const numChallenges = track.challenges.length;

        return {
          ...track,
          numChallenges,
          numChallengesCompleted,
          percentageCompleted,
        };
      });

      return userTracksData
        .filter((track) => track.percentageCompleted < 100)
        .sort((a, b) => b.percentageCompleted - a.percentageCompleted)
        .slice(0, limit);
    }),
});
