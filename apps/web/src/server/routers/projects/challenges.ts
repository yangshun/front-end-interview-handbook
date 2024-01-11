import { z } from 'zod';

import { projectsChallengeSubmissionDeploymentUrlSchemaServer } from '~/components/projects/submit/fields/ProjectsChallengeSubmissionDeploymentUrlSchema';
import { projectsChallengeSubmissionImplementationSchemaServer } from '~/components/projects/submit/fields/ProjectsChallengeSubmissionImplementationSchema';
import { projectsChallengeSubmissionRepositoryUrlSchemaServer } from '~/components/projects/submit/fields/ProjectsChallengeSubmissionRepositoryUrlSchema';
import { projectsChallengeSubmissionSummarySchemaServer } from '~/components/projects/submit/fields/ProjectsChallengeSubmissionSummarySchema';
import { projectsChallengeSubmissionTitleSchemaServer } from '~/components/projects/submit/fields/ProjectsChallengeSubmissionTitleSchema';

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
        deploymentUrl: projectsChallengeSubmissionDeploymentUrlSchemaServer,
        implementation: projectsChallengeSubmissionImplementationSchemaServer,
        repositoryUrl: projectsChallengeSubmissionRepositoryUrlSchemaServer,
        summary: projectsChallengeSubmissionSummarySchemaServer,
        title: projectsChallengeSubmissionTitleSchemaServer,
      }),
    )
    .mutation(
      async ({
        input: {
          slug,
          title,
          summary,
          deploymentUrl,
          repositoryUrl,
          implementation,
        },
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
            implementation,
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
