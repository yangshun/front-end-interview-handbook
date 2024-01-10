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
      // TODO(projects): Validate slug
      return await prisma.projectsProjectSession.create({
        data: {
          profileId: projectsProfileId,
          slug,
        },
      });
    },
  ),
  end: projectsSessionProcedure.mutation(
    async ({ input: { slug }, ctx: { projectsProfileId } }) => {
      return await prisma.projectsProjectSession.updateMany({
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
      return await prisma.projectsProjectSession.findFirst({
        where: {
          profileId: projectsProfileId,
          slug,
          status: 'IN_PROGRESS',
        },
      });
    },
  ),
  startedBefore: projectsUserProcedure.query(
    async ({ ctx: { projectsProfileId } }) => {
      const sessions = await prisma.projectsProjectSession.count({
        where: {
          profileId: projectsProfileId,
        },
      });

      return sessions > 0;
    },
  ),
});
