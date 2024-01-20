import { z } from 'zod';

import { readProjectsChallengeItem } from '~/db/projects/ProjectsReader';
import prisma from '~/server/prisma';
import { router } from '~/server/trpc';

import { projectsUserProcedure } from './procedures';

const projectsChallengeProcedure = projectsUserProcedure.input(
  z.object({
    slug: z.string(),
  }),
);

export const projectsChallengesRouter = router({
  getChallenge: projectsChallengeProcedure
    .input(
      z.object({
        locale: z.string(),
        profileId: z.string(),
      }),
    )
    .query(async ({ input: { profileId, slug, locale } }) => {
      const challengeSession = await prisma.projectsChallengeSession.findFirst({
        orderBy: {
          createdAt: 'asc',
        },
        where: {
          profileId,
          slug,
          status: {
            not: 'STOPPED',
          },
        },
      });

      const { challenge } = await readProjectsChallengeItem(slug, locale);

      return {
        ...challenge,
        status: challengeSession?.status || null,
      };
    }),
});
