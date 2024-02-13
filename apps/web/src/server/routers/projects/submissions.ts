import { z } from 'zod';

import { yoeReplacementSchema } from '~/components/projects/misc';
import { projectsChallengeSubmissionListAugmentChallengeWithCompletionStatus } from '~/components/projects/submissions/lists/ProjectsChallengeSubmissionListUtil';
import type { ProjectsYoeReplacement } from '~/components/projects/types';

import prisma from '~/server/prisma';

import { projectsUserProcedure, publicProjectsProcedure } from './procedures';
import { publicProcedure, router } from '../../trpc';

import type { Prisma, ProjectsChallengeSessionStatus } from '@prisma/client';

const projectsChallengeProcedure = projectsUserProcedure.input(
  z.object({
    slug: z.string(),
  }),
);

function whereClauseForSubmissions(
  query: string,
  isStatusNotEmpty: boolean,
  projectsProfileId: string | null,
  statusWithoutNotStarted: Array<ProjectsChallengeSessionStatus>,
  hasNotStarted: boolean,
  challenges: Array<string>,
  startDateFilters: Array<{
    startWorkDate: { gte?: Date | undefined; lt?: Date | undefined };
  }>,
  profileStatus: Array<ProjectsYoeReplacement>,
  hasClientFilterApplied: boolean,
) {
  return [
    {
      // Filter by session title or summary
      OR: [
        { title: { contains: query, mode: 'insensitive' as const } },
        { summary: { contains: query, mode: 'insensitive' as const } },
      ],
      projectsProfile: {
        // Filter by submissions of projects you have completed or in progress or not started
        ...(isStatusNotEmpty && {
          // Filter with empty id to get empty result if the user is not logged in
          id: projectsProfileId === null ? '' : projectsProfileId,
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
}

export const projectsChallengeSubmissionListRouter = router({
  list: publicProjectsProcedure
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
        ctx: { user, projectsProfileId },
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

        const orderBy:
          | Array<Prisma.ProjectsChallengeSubmissionOrderByWithRelationInput>
          | Prisma.ProjectsChallengeSubmissionOrderByWithRelationInput
          | undefined = (() => {
          if (sort.field === 'votes') {
            return {
              votes: {
                _count: sort.isAscendingOrder ? 'asc' : 'desc',
              } as const,
            };
          }

          if (sort.field === 'createdAt') {
            return {
              createdAt: sort.isAscendingOrder ? 'asc' : 'desc',
            } as const;
          }

          if (submissionType === 'all') {
            return {
              recommendationAll: {
                score: 'desc' as const,
              },
            };
          }

          if (submissionType === 'learn') {
            return {
              recommendationLearn: {
                score: 'desc' as const,
              },
            };
          }

          if (submissionType === 'mentor') {
            return {
              recommendationMentor: {
                score: 'desc' as const,
              },
            };
          }
        })();

        let userProfile = null;

        // Check if user is logged in
        if (
          (submissionType === 'learn' || submissionType === 'mentor') &&
          user
        ) {
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
                      currentStatus: true,
                      id: true,
                      name: true,
                      startWorkDate: true,
                      title: true,
                      username: true,
                    },
                  },
                },
              },
            },
            orderBy: orderBy ?? undefined,
            skip: (currentPage - 1) * itemPerPage,
            take: itemPerPage,
            where,
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
  listCompleted: projectsUserProcedure
    .input(
      z.object({
        challengeSlug: z.string(),
      }),
    )
    .query(async ({ input: { challengeSlug }, ctx: { user } }) => {
      const submissions = await prisma.projectsChallengeSubmission.findMany({
        include: {
          _count: {
            select: {
              votes: true,
            },
          },
        },
        where: {
          projectsProfile: {
            userProfile: {
              id: user?.id,
            },
          },
          slug: challengeSlug,
        },
      });

      return await projectsChallengeSubmissionListAugmentChallengeWithCompletionStatus(
        null,
        submissions,
      );
    }),
  listInterested: publicProcedure
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
  listLatest: projectsUserProcedure
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
                  currentStatus: true,
                  id: true,
                  name: true,
                  startWorkDate: true,
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
  listPinned: publicProcedure
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
  listReference: projectsChallengeProcedure.query(
    async ({ input: { slug } }) => {
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
                  currentStatus: true,
                  id: true,
                  name: true,
                  startWorkDate: true,
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
    },
  ),
});
