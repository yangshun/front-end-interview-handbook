import { z } from 'zod';

import prisma from '~/server/prisma';

import { projectsUserProcedure } from './procedures';
import { router } from '../../trpc';

const sessionProcedure = projectsUserProcedure.input(
  z.object({
    slug: z.string(),
  }),
);

export const sessionsRouter = router({
  create: sessionProcedure.mutation(
    async ({ input: { slug }, ctx: { profileId } }) => {
      // TODO(projects): Validate slug
      return await prisma.projectsProjectSession.create({
        data: {
          profileId,
          slug,
        },
      });
    },
  ),
  end: sessionProcedure.mutation(async ({ input: { slug } }) => {
    return await prisma.projectsProjectSession.updateMany({
      data: {
        status: 'STOPPED',
      },
      where: {
        slug,
        status: 'IN_PROGRESS',
      },
    });
  }),
  getLatestInProgress: sessionProcedure.query(async ({ input: { slug } }) => {
    return await prisma.projectsProjectSession.findFirst({
      where: {
        slug,
        status: 'IN_PROGRESS',
      },
    });
  }),
});
