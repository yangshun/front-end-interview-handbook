import { z } from 'zod';

import { yoeReplacementSchema } from '~/components/projects/misc';
import { projectsChallengeSubmissionDeploymentUrlsSchemaServer } from '~/components/projects/submissions/form/fields/ProjectsChallengeSubmissionDeploymentUrlsSchema';
import { projectsChallengeSubmissionImplementationSchemaServer } from '~/components/projects/submissions/form/fields/ProjectsChallengeSubmissionImplementationSchema';
import { projectsChallengeSubmissionRepositoryUrlSchemaServer } from '~/components/projects/submissions/form/fields/ProjectsChallengeSubmissionRepositoryUrlSchema';
import { projectsChallengeSubmissionSummarySchemaServer } from '~/components/projects/submissions/form/fields/ProjectsChallengeSubmissionSummarySchema';
import { projectsChallengeSubmissionTitleSchemaServer } from '~/components/projects/submissions/form/fields/ProjectsChallengeSubmissionTitleSchema';
import { projectsChallengeSubmissionListAugmentChallengeWithCompletionStatus } from '~/components/projects/submissions/lists/ProjectsChallengeSubmissionListUtil';
import type { yoeReplacement } from '~/components/projects/types';

import prisma from '~/server/prisma';

import { projectsUserProcedure } from './procedures';
import { publicProcedure, router } from '../../trpc';

import type { ProjectsChallengeSessionStatus } from '@prisma/client';
import type { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';

const projectsChallengeProcedure = projectsUserProcedure.input(
  z.object({
    slug: z.string(),
  }),
);

const projectsChallengeSubmissionFormSchema = z.object({
  deploymentUrls: projectsChallengeSubmissionDeploymentUrlsSchemaServer,
  implementation: projectsChallengeSubmissionImplementationSchemaServer,
  repositoryUrl: projectsChallengeSubmissionRepositoryUrlSchemaServer,
  summary: projectsChallengeSubmissionSummarySchemaServer,
  title: projectsChallengeSubmissionTitleSchemaServer,
});

type QueryMode = 'insensitive';

const whereClauseForSubmissions = (
  query: string,
  isStatusNotEmpty: boolean,
  projectsProfileId: string,
  statusWithoutNotStarted: Array<ProjectsChallengeSessionStatus>,
  hasNotStarted: boolean,
  challenges: Array<string>,
  startDateFilters: Array<{
    startWorkDate: { gte?: Date | undefined; lt?: Date | undefined };
  }>,
  profileStatus: Array<yoeReplacement>,
  hasClientFilterApplied: boolean,
) => {
  return [
    {
      // Filter by session title or summary
      OR: [
        { title: { contains: query, mode: 'insensitive' as QueryMode } },
        { summary: { contains: query, mode: 'insensitive' as QueryMode } },
      ],
      projectsProfile: {
        // Filter by submissions of projects you have completed or in progress or not started
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
        // Filter by the creator’s years of experience or their job status
        userProfile: {
          ...(profileStatus.length > 0 && {
            currentStatus: {
              in: profileStatus,
            },
          }),
          ...(startDateFilters.length > 0 && {
            OR: startDateFilters,
          }),
        },
      },

      // Filter by challenges slug
      ...(hasClientFilterApplied && {
        slug: {
          in: challenges,
        },
      }),
    },
  ];
};

export const projectsChallengeSubmissionRouter = router({
  create: projectsChallengeProcedure
    .input(projectsChallengeSubmissionFormSchema)
    .mutation(
      async ({
        input: {
          slug,
          title,
          summary,
          deploymentUrls,
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

        return await prisma.$transaction(async (tx) => {
          if (existingSession == null) {
            await tx.projectsChallengeSession.create({
              data: {
                profileId: projectsProfileId,
                slug,
                status: 'COMPLETED',
              },
            });
          } else {
            await tx.projectsChallengeSession.updateMany({
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

          return await tx.projectsChallengeSubmission.create({
            data: {
              deploymentUrls: deploymentUrls as Prisma.JsonArray,
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

      return await projectsChallengeSubmissionListAugmentChallengeWithCompletionStatus(
        null,
        submissions,
      );
    }),
  hasVoted: projectsUserProcedure
    .input(
      z.object({
        submissionId: z.string().uuid(),
      }),
    )
    .query(async ({ input: { submissionId }, ctx: { projectsProfileId } }) => {
      // Check if the user has already voted for this submission
      const existingVote =
        await prisma.projectsChallengeSubmissionVote.findFirst({
          where: {
            profileId: projectsProfileId,
            submissionId,
          },
        });

      return existingVote;
    }),
  interested: publicProcedure
    .input(
      z.object({
        challenge: z.string(),
      }),
    )
    .query(async ({ input: { challenge }, ctx: { user } }) => {
      const submissions = await prisma.projectsChallengeSubmission.findMany({
        include: {
          _count: {
            select: {
              votes: true,
            },
          },
        },
        take: 15,
        where:
          user?.id == null
            ? { slug: challenge }
            : {
                projectsProfile: {
                  isNot: {
                    userProfile: {
                      id: user?.id,
                    },
                  },
                },
                slug: challenge,
              },
      });

      return await projectsChallengeSubmissionListAugmentChallengeWithCompletionStatus(
        user?.id ?? null,
        submissions,
      );
    }),
  list: projectsUserProcedure
    .input(
      z.object({
        challengeSessionStatus: z.array(
          z.enum(['IN_PROGRESS', 'COMPLETED', 'NOT_STARTED'] as const),
        ),
        challenges: z.array(z.string()),
        currentPage: z.number(),
        hasClientFilterApplied: z.boolean(),
        itemPerPage: z.number(),
        profileStatus: z.array(yoeReplacementSchema),
        query: z.string(),
        sort: z.object({
          field: z.enum(['createdAt', 'difficulty', 'votes']).nullable(),
          isAscendingOrder: z.boolean(),
        }),
        submissionType: z.enum(['all', 'learn', 'mentor']),
        yoeExperience: z.array(z.enum(['junior', 'mid', 'senior'])),
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
          submissionType,
          itemPerPage,
          currentPage,
          hasClientFilterApplied,
        },
        ctx: { projectsProfileId, user },
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

        const sortFilter = (() => {
          if (sort.field === 'votes') {
            return {
              orderBy: {
                votes: {
                  _count: sort.isAscendingOrder
                    ? ('asc' as const)
                    : ('desc' as const),
                },
              },
            };
          }

          if (sort.field === 'createdAt') {
            return {
              orderBy: {
                createdAt: sort.isAscendingOrder
                  ? ('asc' as const)
                  : ('desc' as const),
              },
            };
          }

          if (submissionType === 'all') {
            return {
              orderBy: {
                createdAt: 'desc' as const,
              },
            };
          }

          if (submissionType === 'learn') {
            return {
              orderBy: {
                votes: {
                  _count: 'desc' as const,
                },
              },
            };
          }

          if (submissionType === 'mentor') {
            return {
              orderBy: {
                votes: {
                  _count: 'asc' as const,
                },
              },
            };
          }
        })();

        let userProfile = null;

        if (submissionType === 'learn' || submissionType === 'mentor') {
          userProfile = await prisma.profile.findUnique({
            include: {
              projectsProfile: true,
            },
            where: {
              id: user.id,
            },
          });
        }

        const commonWhere = whereClauseForSubmissions(
          query,
          isStatusNotEmpty,
          projectsProfileId,
          statusWithoutNotStarted,
          hasNotStarted,
          challenges,
          startDateFilters,
          profileStatus,
          hasClientFilterApplied,
        );

        const inProgressAndCompletedSessionsStatus: Array<ProjectsChallengeSessionStatus> =
          ['IN_PROGRESS', 'COMPLETED'];
        const inProgressSessionsStatus: Array<ProjectsChallengeSessionStatus> =
          ['IN_PROGRESS'];

        const where = {
          AND:
            submissionType === 'all'
              ? [...commonWhere]
              : submissionType === 'learn'
                ? [
                    ...commonWhere,
                    {
                      projectsProfile: {
                        // Filter challenge working on or completed
                        sessions: {
                          some: {
                            status: {
                              in: inProgressAndCompletedSessionsStatus,
                            },
                          },
                        }, // User who has more YOE than current user
                        ...(userProfile && {
                          userProfile: {
                            id: { not: userProfile.id },
                            startWorkDate: userProfile?.startWorkDate
                              ? {
                                  lt: userProfile?.startWorkDate,
                                }
                              : {},
                          },
                        }),
                      },
                    },
                  ]
                : [
                    ...commonWhere,
                    {
                      projectsProfile: {
                        // Filter challenge working on
                        // TODO(projects): Add filter for reviewed before
                        sessions: {
                          some: {
                            status: { in: inProgressSessionsStatus },
                          },
                        },
                        // User who has fewer YOE than current user
                        ...(userProfile && {
                          userProfile: {
                            id: { not: userProfile.id },
                            startWorkDate: userProfile?.startWorkDate
                              ? {
                                  gt: userProfile?.startWorkDate,
                                }
                              : {},
                          },
                        }),
                        // Users who joined later than the current user
                        createdAt: {
                          gt: userProfile?.projectsProfile?.createdAt,
                        },
                      },
                    },
                  ],
        };

        const [totalCount, submissions] = await Promise.all([
          prisma.projectsChallengeSubmission.count({
            where,
          }),
          prisma.projectsChallengeSubmission.findMany({
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
            skip: (currentPage - 1) * itemPerPage,
            take: itemPerPage,
            where,
            ...(sortFilter ? sortFilter : {}),
          }),
        ]);

        const submissionsAugmented =
          await projectsChallengeSubmissionListAugmentChallengeWithCompletionStatus(
            user?.id ?? null,
            submissions,
          );

        return {
          submissions: submissionsAugmented,
          totalCount,
        };
      },
    ),
  pin: projectsUserProcedure
    .input(
      z.object({
        submissionId: z.string().uuid(),
      }),
    )
    .mutation(
      async ({ input: { submissionId }, ctx: { projectsProfileId } }) => {
        const existingPins =
          await prisma.projectsChallengeSubmissionPin.findMany({
            where: {
              profileId: projectsProfileId,
              submissionId,
            },
          });

        if (
          existingPins.map((pin) => pin.submissionId).includes(submissionId)
        ) {
          return; // No-op since already pinned.
        }

        if (existingPins.length > 3) {
          throw 'Unable to pin more than 3 submissions';
        }

        return await prisma.projectsChallengeSubmissionPin.create({
          data: {
            profileId: projectsProfileId,
            submissionId,
          },
        });
      },
    ),
  pinned: publicProcedure
    .input(
      z.object({
        projectsProfileId: z.string().uuid(),
      }),
    )
    .query(async ({ ctx: { user }, input: { projectsProfileId } }) => {
      const submissions = await prisma.projectsChallengeSubmission.findMany({
        include: {
          _count: {
            select: {
              votes: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 3,
        where: {
          pins: {
            some: {
              profileId: projectsProfileId,
            },
          },
        },
      });

      return await projectsChallengeSubmissionListAugmentChallengeWithCompletionStatus(
        user?.id ?? null,
        submissions,
      );
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
  unpin: projectsUserProcedure
    .input(
      z.object({
        submissionId: z.string().uuid(),
      }),
    )
    .mutation(
      async ({ input: { submissionId }, ctx: { projectsProfileId } }) => {
        await prisma.projectsChallengeSubmissionPin.deleteMany({
          where: {
            profileId: projectsProfileId,
            submissionId,
          },
        });
      },
    ),
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
          deploymentUrls,
          repositoryUrl,
          implementation,
        },
        ctx: { projectsProfileId },
      }) => {
        return await prisma.projectsChallengeSubmission.update({
          data: {
            deploymentUrls: deploymentUrls as Prisma.JsonArray,
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
  vote: projectsUserProcedure
    .input(
      z.object({
        submissionId: z.string().uuid(),
      }),
    )
    .mutation(
      async ({ input: { submissionId }, ctx: { projectsProfileId } }) => {
        // Check if the user has already voted for this submission
        const existingVote =
          await prisma.projectsChallengeSubmissionVote.findFirst({
            where: {
              profileId: projectsProfileId,
              submissionId,
            },
          });

        if (existingVote) {
          // User has already voted, handle accordingly (throw an error, update vote, etc.)
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'User has already voted for this submission.',
          });
        }

        // Create a new vote for the submission
        await prisma.projectsChallengeSubmissionVote.create({
          data: {
            profileId: projectsProfileId,
            submissionId,
          },
        });
      },
    ),
});
