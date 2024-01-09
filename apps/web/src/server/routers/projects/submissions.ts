import { z } from 'zod';

import prisma from '~/server/prisma';

import { projectsUserProcedure } from './procedures';
import { router } from '../../trpc';

export const submissionsRouter = router({
  projectSubmissionsGetOthers: projectsUserProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input: { id } }) => {
      return await prisma.projectsProjectSubmission.findMany({
        where: {
          projectsProfile: {
            userProfile: {
              id,
            },
          },
        },
      });
    }),

  projectSubmissionsGetSelf: projectsUserProcedure.query(
    async ({ ctx: { profileId } }) => {
      return await prisma.projectsProjectSubmission.findMany({
        where: {
          profileId,
        },
      });
    },
  ),
});
