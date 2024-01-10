import { z } from 'zod';

import prisma from '~/server/prisma';

import { projectsUserProcedure } from './procedures';
import { router } from '../../trpc';

const projectsChallengeProcedure = projectsUserProcedure.input(
  z.object({
    slug: z.string(),
  }),
);

export const projectsChallengesRouter = router({
  submit: projectsChallengeProcedure
    .input(
      z.object({
        deploymentUrl: z.string().url(),
        repositoryUrl: z.string().url(),
        summary: z.string().trim(),
        title: z.string().trim(),
      }),
    )
    .mutation(
      async ({
        input: { slug, title, summary, deploymentUrl, repositoryUrl },
        ctx: { projectsProfileId },
      }) => {
        const existingSession = await prisma.projectsChallengeSession.findFirst(
          {
            where: {
              profileId: projectsProfileId,
              slug,
              status: 'IN_PROGRESS',
            },
          },
        );

        // TODO(projects): Wrap in transaction.
        if (existingSession == null) {
          await prisma.projectsChallengeSession.create({
            data: {
              profileId: projectsProfileId,
              slug,
              status: 'COMPLETED',
            },
          });
        } else {
          await prisma.projectsChallengeSession.updateMany({
            data: {
              status: 'COMPLETED',
            },
            where: {
              profileId: projectsProfileId,
              slug,
              status: 'IN_PROGRESS',
            },
          });
        }

        return await prisma.projectsChallengeSubmission.create({
          data: {
            deploymentUrl,
            profileId: projectsProfileId,
            repositoryUrl,
            slug,
            summary,
            title,
          },
        });
      },
    ),
});
