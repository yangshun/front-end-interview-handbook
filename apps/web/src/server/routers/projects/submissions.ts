import { allProjectsChallengeMetadata } from 'contentlayer/generated';
import { z } from 'zod';

import { projectsChallengeSubmissionDeploymentUrlSchemaServer } from '~/components/projects/submit/fields/ProjectsChallengeSubmissionDeploymentUrlSchema';
import { projectsChallengeSubmissionImplementationSchemaServer } from '~/components/projects/submit/fields/ProjectsChallengeSubmissionImplementationSchema';
import { projectsChallengeSubmissionRepositoryUrlSchemaServer } from '~/components/projects/submit/fields/ProjectsChallengeSubmissionRepositoryUrlSchema';
import { projectsChallengeSubmissionSummarySchemaServer } from '~/components/projects/submit/fields/ProjectsChallengeSubmissionSummarySchema';
import { projectsChallengeSubmissionTitleSchemaServer } from '~/components/projects/submit/fields/ProjectsChallengeSubmissionTitleSchema';

import prisma from '~/server/prisma';

import { projectsUserProcedure } from './procedures';
import { publicProcedure, router } from '../../trpc';

const projectsChallengeProcedure = projectsUserProcedure.input(
  z.object({
    slug: z.string(),
  }),
);

const projectsChallengeSubmissionFormSchema = z.object({
  deploymentUrl: projectsChallengeSubmissionDeploymentUrlSchemaServer,
  implementation: projectsChallengeSubmissionImplementationSchemaServer,
  repositoryUrl: projectsChallengeSubmissionRepositoryUrlSchemaServer,
  summary: projectsChallengeSubmissionSummarySchemaServer,
  title: projectsChallengeSubmissionTitleSchemaServer,
});

export const projectsChallengeSubmissionRouter = router({
  create: projectsChallengeProcedure
    .input(projectsChallengeSubmissionFormSchema)
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

        return await prisma.$transaction(async (prisma_) => {
          // TODO(projects): Wrap in transaction.
          if (existingSession == null) {
            await prisma_.projectsChallengeSession.create({
              data: {
                profileId: projectsProfileId,
                slug,
                status: 'COMPLETED',
              },
            });
          } else {
            await prisma_.projectsChallengeSession.updateMany({
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

          return await prisma_.projectsChallengeSubmission.create({
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
        });
      },
    ),
  delete: projectsUserProcedure
    .input(
      z.object({
        submissionId: z.string().uuid(),
      }),
    )
    .mutation(
      async ({ input: { submissionId }, ctx: { projectsProfileId } }) => {
        await prisma.projectsChallengeSubmission.delete({
          where: {
            id: submissionId,
            profileId: projectsProfileId,
          },
        });

        return null;
      },
    ),
  getLatestSubmitted: projectsUserProcedure
    .input(
      z.object({
        limit: z.number().int().positive(),
      }),
    )
    .query(async ({ input: { limit }, ctx: { projectsProfileId } }) => {
      const submissions = await prisma.projectsChallengeSubmission.findMany({
        include: {
          _count: {
            select: {
              votes: true,
            },
          },
          projectsProfile: {
            include: {
              userProfile: {
                select: {
                  avatarUrl: true,
                  id: true,
                  name: true,
                  title: true,
                  username: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: Math.min(limit, 10),
        where: {
          NOT: {
            profileId: projectsProfileId,
          },
        },
      });

      return submissions.map((submission) => {
        const challenge = allProjectsChallengeMetadata.find(
          (project) => project.slug === submission.slug,
        );

        return {
          ...submission,
          challenge,
        };
      });
    }),
  list: projectsUserProcedure.query(async () => {
    return await prisma.projectsChallengeSubmission.findMany({
      include: {
        _count: {
          select: {
            votes: true,
          },
        },
        projectsProfile: {
          include: {
            userProfile: {
              select: {
                avatarUrl: true,
                id: true,
                name: true,
                title: true,
                username: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 6,
    });
  }),
  reference: projectsChallengeProcedure.query(async ({ input: { slug } }) => {
    return await prisma.projectsChallengeSubmission.findMany({
      include: {
        _count: {
          select: {
            votes: true,
          },
        },
        projectsProfile: {
          include: {
            userProfile: {
              select: {
                avatarUrl: true,
                id: true,
                name: true,
                title: true,
                username: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 6,
      where: {
        slug,
      },
    });
  }),
  update: projectsUserProcedure
    .input(
      projectsChallengeSubmissionFormSchema.partial().extend({
        submissionId: z.string().uuid(),
      }),
    )
    .mutation(
      async ({
        input: {
          submissionId,
          title,
          summary,
          deploymentUrl,
          repositoryUrl,
          implementation,
        },
        ctx: { projectsProfileId },
      }) => {
        return await prisma.projectsChallengeSubmission.update({
          data: {
            deploymentUrl,
            implementation,
            repositoryUrl,
            summary,
            title,
          },
          where: {
            id: submissionId,
            profileId: projectsProfileId,
          },
        });
      },
    ),
  view: publicProcedure
    .input(
      z.object({
        submissionId: z.string().uuid(),
      }),
    )
    .mutation(async ({ input: { submissionId } }) => {
      await prisma.projectsChallengeSubmission.update({
        data: {
          views: {
            increment: 1,
          },
        },
        where: {
          id: submissionId,
        },
      });

      return null;
    }),
});
