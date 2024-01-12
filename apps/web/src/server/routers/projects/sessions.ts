import { allProjectsChallengeMetadata } from 'contentlayer/generated';
import { z } from 'zod';

import prisma from '~/server/prisma';

import { projectsUserProcedure } from './procedures';
import { router } from '../../trpc';

const projectsSessionProcedure = projectsUserProcedure.input(
  z.object({
    slug: z.string(),
  }),
);

export const projectsSessionsRouter = router({
  create: projectsSessionProcedure.mutation(
    async ({ input: { slug }, ctx: { projectsProfileId } }) => {
      // Don't allow creating multiple sessions.
      const existingSession = await prisma.projectsChallengeSession.findFirst({
        where: {
          profileId: projectsProfileId,
          slug,
          status: 'IN_PROGRESS',
        },
      });

      if (existingSession != null) {
        return existingSession;
      }

      return await prisma.projectsChallengeSession.create({
        data: {
          profileId: projectsProfileId,
          slug,
        },
      });
    },
  ),
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
  getLatestInProgress: projectsSessionProcedure.query(
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
  getMostRecentlyStarted: projectsUserProcedure
    .input(
      z.object({
        limit: z.number().int().positive(),
      }),
    )
    .query(async ({ input: { limit }, ctx: { projectsProfileId } }) => {
      const sessions = await prisma.projectsChallengeSession.findMany({
        orderBy: {
          createdAt: 'desc',
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
  isNewToProjects: projectsUserProcedure.query(
    async ({ ctx: { projectsProfileId } }) => {
      const sessions = await prisma.projectsChallengeSession.count({
        where: {
          profileId: projectsProfileId,
        },
      });

      return sessions === 0;
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
});
