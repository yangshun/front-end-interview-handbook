import { z } from 'zod';

import prisma from '~/server/prisma';

import { projectsUserProcedure } from './procedures';
import { router } from '../../trpc';

const projectsSessionProcedure = projectsUserProcedure.input(
  z.object({
    slug: z.string(),
  }),
);

export const sessionsRouter = router({
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
  end: projectsSessionProcedure.mutation(async ({ input: { slug } }) => {
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
  getAnySession: projectsUserProcedure.query(async () => {
    return await prisma.projectsProjectSession.findFirst();
  }),
  getLatestInProgress: projectsSessionProcedure.query(
    async ({ input: { slug } }) => {
      return await prisma.projectsProjectSession.findFirst({
        where: {
          slug,
          status: 'IN_PROGRESS',
        },
      });
    },
  ),
});
