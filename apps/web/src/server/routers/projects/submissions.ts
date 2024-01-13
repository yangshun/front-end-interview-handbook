import { allProjectsChallengeMetadata } from 'contentlayer/generated';
import { z } from 'zod';

import { yoeReplacementSchema } from '~/components/projects/misc';
import { projectsChallengeSubmissionDeploymentUrlSchemaServer } from '~/components/projects/submit/fields/ProjectsChallengeSubmissionDeploymentUrlSchema';
import { projectsChallengeSubmissionImplementationSchemaServer } from '~/components/projects/submit/fields/ProjectsChallengeSubmissionImplementationSchema';
import { projectsChallengeSubmissionRepositoryUrlSchemaServer } from '~/components/projects/submit/fields/ProjectsChallengeSubmissionRepositoryUrlSchema';
import { projectsChallengeSubmissionSummarySchemaServer } from '~/components/projects/submit/fields/ProjectsChallengeSubmissionSummarySchema';
import { projectsChallengeSubmissionTitleSchemaServer } from '~/components/projects/submit/fields/ProjectsChallengeSubmissionTitleSchema';

import prisma from '~/server/prisma';

import { projectsUserProcedure } from './procedures';
import { publicProcedure, router } from '../../trpc';

import type { ProjectsChallengeSessionStatus } from '@prisma/client';

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
  list: projectsUserProcedure
    .input(
      z.object({
        challengeSessionStatus: z.array(
          z.enum(['IN_PROGRESS', 'COMPLETED', 'NOT_STARTED'] as const),
        ),
        challenges: z.array(z.string()),
        profileStatus: z.array(yoeReplacementSchema),
        query: z.string(),
        sort: z.object({
          field: z.enum(['createdAt', 'difficulty', 'votes']).nullable(),
          isAscendingOrder: z.boolean(),
        }),
        yoeExperience: z.array(z.string()),
      }),
    )
    .query(
      async ({
        input: {
          challenges,
          challengeSessionStatus,
          profileStatus,
          yoeExperience,
          query,
          sort,
        },
        ctx: { projectsProfileId },
      }) => {
        const hasNotStarted = challengeSessionStatus.includes('NOT_STARTED');
        const statusWithoutNotStarted = challengeSessionStatus.filter(
          (item) => item !== 'NOT_STARTED',
        ) as Array<ProjectsChallengeSessionStatus>;

        const startDateFilters = yoeExperience.map((experience) => {
          const currentDate = new Date();
          const filterYears = {
            max: 0,
            min: 0,
          };

          switch (experience) {
            case 'junior':
              filterYears.min = 1;
              filterYears.max = 2;
              break;
            case 'mid':
              filterYears.min = 3;
              filterYears.max = 5;
              break;
            case 'senior':
              filterYears.min = 6;
              filterYears.max = 0;
              break;

            default:
              filterYears.min = 0; // No filter
              filterYears.max = 0; // No filter
              break;
          }

          const minFilterYears =
            filterYears.min > 0
              ? {
                  lt: new Date(
                    currentDate.getFullYear() - filterYears.min,
                    currentDate.getMonth(),
                    currentDate.getDate(),
                  ),
                }
              : {};
          const maxFilterYears =
            filterYears.max > 0
              ? {
                  gte: new Date(
                    currentDate.getFullYear() - filterYears.max,
                    currentDate.getMonth(),
                    currentDate.getDate(),
                  ),
                }
              : {};

          return {
            startWorkDate: {
              ...minFilterYears,
              ...maxFilterYears,
            },
          };
        });

        const isStatusNotEmpty = challengeSessionStatus.length > 0;

        const sortFilter =
          sort.field === 'votes'
            ? {
                orderBy: {
                  votes: {
                    _count: sort.isAscendingOrder ? 'asc' : 'desc',
                  },
                },
              }
            : sort.field === 'createdAt'
              ? {
                  orderBy: {
                    createdAt: sort.isAscendingOrder ? 'asc' : 'desc',
                  },
                }
              : {
                  orderBy: {
                    createdAt: 'desc',
                  },
                };

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
          take: 6,
          where: {
            OR: [
              { title: { contains: query, mode: 'insensitive' } },
              { summary: { contains: query, mode: 'insensitive' } },
            ],
            projectsProfile: {
              ...(isStatusNotEmpty && {
                id: projectsProfileId,
                sessions: {
                  some: {
                    OR: [
                      {
                        status: { in: statusWithoutNotStarted },
                      },
                      ...(hasNotStarted
                        ? [
                            {
                              NOT: {
                                status: {
                                  in: [
                                    'IN_PROGRESS',
                                    'COMPLETED',
                                    'STOPPED',
                                  ] as Array<ProjectsChallengeSessionStatus>,
                                },
                              },
                            },
                          ]
                        : []),
                    ],
                  },
                },
              }),
              userProfile: {
                ...(profileStatus.length > 0 && {
                  currentStatus: {
                    in: profileStatus,
                  },
                }),
                ...(startDateFilters.length > 0 && { OR: startDateFilters }),
              },
            },
            ...(challenges.length > 0 && {
              slug: {
                in: challenges,
              },
            }),
          },
          ...(sort.field && sortFilter),
        });

        return submissions;
      },
    ),
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
