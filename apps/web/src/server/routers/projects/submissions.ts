import { z } from 'zod';

import { yoeReplacementSchema } from '~/components/projects/misc';
import type { ProjectsSkillKey } from '~/components/projects/skills/types';
import { projectsChallengeSubmissionListAugmentChallengeWithCompletionStatus } from '~/components/projects/submissions/lists/ProjectsChallengeSubmissionListUtil';
import {
  ProjectsChallengeSubmissionSortField,
  ProjectsChallengeSubmissionTabType,
  ProjectsChallengeSubmissionYOEFilter,
} from '~/components/projects/submissions/types';
import type { ProjectsYoeReplacement } from '~/components/projects/types';

import prisma from '~/server/prisma';

import { projectsUserProcedure, publicProjectsProcedure } from './procedures';
import { publicProcedure, router } from '../../trpc';

import { Prisma, ProjectsChallengeSessionStatus } from '@prisma/client';

const projectsChallengeProcedure = projectsUserProcedure.input(
  z.object({
    challengeSlug: z.string(),
  }),
);

function whereClauseForSubmissions(
  query: string,
  isStatusNotEmpty: boolean,
  projectsProfileId: string | null,
  roadmapSkills: Array<ProjectsSkillKey>,
  techSkills: Array<ProjectsSkillKey>,
  statusWithoutNotStarted: Array<ProjectsChallengeSessionStatus>,
  hasNotStarted: boolean,
  challenges: Array<string>,
  startDateFilters: Array<{
    startWorkDate: { gte?: Date | undefined; lt?: Date | undefined };
  }>,
  profileStatus: Array<ProjectsYoeReplacement>,
  hasClientFilterApplied: boolean,
) {
  // Challenges that I have not started at all
  const notStartedChallenges = {
    NOT: {
      challengeDetails: {
        sessions: {
          some: {
            OR: [
              { status: 'IN_PROGRESS' },
              { status: 'COMPLETED' },
              { status: 'STOPPED' },
            ],
            profileId: projectsProfileId,
          },
        },
      },
    },
  };

  return [
    {
      // Filter by session title or summary
      OR: [
        { title: { contains: query, mode: 'insensitive' as const } },
        { summary: { contains: query, mode: 'insensitive' as const } },
        { implementation: { contains: query, mode: 'insensitive' as const } },
      ],
      // Filter users submissions of projects I have completed or in progress or not started
      ...(isStatusNotEmpty &&
        projectsProfileId &&
        (hasNotStarted
          ? notStartedChallenges
          : {
              challengeDetails: {
                sessions: {
                  some: {
                    profileId: projectsProfileId,
                    status: { in: statusWithoutNotStarted },
                  },
                },
              },
            })),
      projectsProfile: {
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
      // Filter by selected roadmap skills
      ...(roadmapSkills.length > 0 && {
        roadmapSkills: {
          hasSome: roadmapSkills,
        },
      }),
      // Filter by selected tech skills
      ...(techSkills.length > 0 && {
        techStackSkills: {
          hasSome: techSkills,
        },
      }),
    },
  ];
}

function getSubmissionsListStartDateFilter(
  yoeExperience: Array<ProjectsChallengeSubmissionYOEFilter>,
) {
  return yoeExperience.map((experience) => {
    const currentDate = new Date();
    const filterYears = {
      max: 0,
      min: 0,
    };

    const numberOfDaysInCurrentMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    ).getDate();

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
            lte: new Date(
              currentDate.getFullYear() - filterYears.min,
              currentDate.getMonth(),
              numberOfDaysInCurrentMonth,
            ),
          }
        : {};
    const maxFilterYears =
      filterYears.max > 0
        ? {
            gte: new Date(
              // Check for experience years + additional year removing the current month
              // because 2 years 11 months is also considered 2 YOE
              currentDate.getFullYear() - filterYears.max - 1,
              currentDate.getMonth() + 1,
              1,
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
}

function getSubmissionsListOrderbyFilter(
  sort: {
    field: ProjectsChallengeSubmissionSortField | null;
    isAscendingOrder: boolean;
  },
  submissionType: ProjectsChallengeSubmissionTabType,
) {
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

  if (sort.field === 'difficulty') {
    return {
      challengeDetails: {
        difficulty: sort.isAscendingOrder ? 'asc' : 'desc',
      },
    } as const;
  }

  if (submissionType === 'all') {
    return {
      recommendationAll: {
        score: 'desc',
      },
    } as const;
  }

  if (submissionType === 'learn') {
    return {
      recommendationLearn: {
        score: 'desc',
      },
    } as const;
  }

  if (submissionType === 'mentor') {
    return {
      recommendationMentor: {
        score: 'desc',
      },
    } as const;
  }
}

export const projectsChallengeSubmissionListRouter = router({
  list: publicProjectsProcedure
    .input(
      z.object({
        filter: z.object({
          challengeSessionStatus: z.array(
            z.nativeEnum({
              ...ProjectsChallengeSessionStatus,
              NOT_STARTED: 'NOT_STARTED',
            }),
          ),
          challenges: z.array(z.string()),
          hasClientFilterApplied: z.boolean(),
          profileStatus: z.array(yoeReplacementSchema),
          query: z.string().nullable(),
          roadmapSkills: z.array(z.string()),
          submissionType: z.enum(ProjectsChallengeSubmissionTabType),
          techSkills: z.array(z.string()),
          yoeExperience: z.array(z.enum(ProjectsChallengeSubmissionYOEFilter)),
        }),
        pagination: z.object({
          limit: z
            .number()
            .int()
            .positive()
            .transform((val) => Math.min(30, val)),
          page: z.number().int().positive(),
        }),
        sort: z.object({
          field: z.enum(ProjectsChallengeSubmissionSortField),
          isAscendingOrder: z.boolean(),
        }),
      }),
    )
    .query(
      async ({
        input: { filter, pagination, sort },
        ctx: { viewer, projectsProfileId },
      }) => {
        const {
          challenges,
          challengeSessionStatus,
          profileStatus,
          yoeExperience,
          query,
          roadmapSkills,
          techSkills,
          submissionType,
          hasClientFilterApplied,
        } = filter;
        const { limit, page } = pagination;

        const hasNotStarted = challengeSessionStatus.includes('NOT_STARTED');
        const statusWithoutNotStarted = challengeSessionStatus.filter(
          (item) => item !== 'NOT_STARTED',
        ) as Array<ProjectsChallengeSessionStatus>;

        const startDateFilters =
          getSubmissionsListStartDateFilter(yoeExperience);

        const isStatusNotEmpty = challengeSessionStatus.length > 0;

        const orderBy:
          | Array<Prisma.ProjectsChallengeSubmissionOrderByWithRelationInput>
          | Prisma.ProjectsChallengeSubmissionOrderByWithRelationInput
          | undefined = getSubmissionsListOrderbyFilter(sort, submissionType);

        let userProfile = null;

        // Check if user is logged in
        if (
          (submissionType === 'learn' || submissionType === 'mentor') &&
          viewer
        ) {
          userProfile = await prisma.profile.findUnique({
            include: {
              projectsProfile: true,
            },
            where: {
              id: viewer.id,
            },
          });
        }

        // If not logged in and filtering by my challenge status
        // If not logged in and if it is learn or mentor tab, because it has some default status filter applied for which we need profileId
        // return empty as there will be no challenges with status for non-logged in user
        if (
          !projectsProfileId &&
          (isStatusNotEmpty ||
            submissionType === 'learn' ||
            submissionType === 'mentor')
        ) {
          return {
            submissions: [],
            totalCount: 0,
          };
        }

        const commonWhere = whereClauseForSubmissions(
          query ?? '',
          isStatusNotEmpty,
          projectsProfileId,
          roadmapSkills,
          techSkills,
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
                      // Filter challenge working on or completed
                      ...(projectsProfileId && {
                        challengeDetails: {
                          sessions: {
                            some: {
                              profileId: projectsProfileId,
                              status: {
                                in: inProgressAndCompletedSessionsStatus,
                              },
                            },
                          },
                        },
                      }),
                      projectsProfile: {
                        // User who has more YOE than current user
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
                      // Filter challenge working on
                      // TODO(projects): Add filter for reviewed before
                      ...(projectsProfileId && {
                        challengeDetails: {
                          sessions: {
                            some: {
                              profileId: projectsProfileId,
                              status: { in: inProgressSessionsStatus },
                            },
                          },
                        },
                      }),
                      projectsProfile: {
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
                      company: true,
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
            skip: (page - 1) * limit,
            take: limit,
            where,
          }),
        ]);

        const submissionsAugmented =
          await projectsChallengeSubmissionListAugmentChallengeWithCompletionStatus(
            viewer?.id ?? null,
            submissions,
          );

        return {
          submissions: submissionsAugmented,
          totalCount,
        };
      },
    ),
  listCompleted: publicProjectsProcedure
    .input(
      z.object({
        challengeSlug: z.string().optional(),
        orderBy: z.nativeEnum(Prisma.SortOrder).optional(),
        userId: z.string().optional(),
      }),
    )
    .query(
      async ({
        input: { challengeSlug, orderBy, userId },
        ctx: { viewer },
      }) => {
        const submissions = await prisma.projectsChallengeSubmission.findMany({
          include: {
            _count: {
              select: {
                votes: true,
              },
            },
          },
          orderBy: {
            createdAt: orderBy,
          },
          where: {
            projectsProfile: {
              userProfile: {
                // List for target user, otherwise own.
                id: userId ?? viewer?.id,
              },
            },
            slug: challengeSlug,
          },
        });

        return await projectsChallengeSubmissionListAugmentChallengeWithCompletionStatus(
          null,
          submissions,
        );
      },
    ),
  listInterested: publicProcedure
    .input(
      z.object({
        challengeSlug: z.string(),
      }),
    )
    .query(async ({ input: { challengeSlug }, ctx: { viewer } }) => {
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
          viewer?.id == null
            ? { slug: challengeSlug }
            : {
                projectsProfile: {
                  isNot: {
                    userProfile: {
                      id: viewer?.id,
                    },
                  },
                },
                slug: challengeSlug,
              },
      });

      return await projectsChallengeSubmissionListAugmentChallengeWithCompletionStatus(
        viewer?.id ?? null,
        submissions,
      );
    }),
  listLatest: projectsUserProcedure
    .input(
      z.object({
        limit: z
          .number()
          .int()
          .positive()
          .transform((val) => Math.min(30, val)),
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
                  company: true,
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
        take: limit,
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
    .query(async ({ ctx: { viewer }, input: { projectsProfileId } }) => {
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
        viewer?.id ?? null,
        submissions,
      );
    }),
  listReference: projectsChallengeProcedure.query(
    async ({ input: { challengeSlug } }) => {
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
                  company: true,
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
          slug: challengeSlug,
        },
      });
    },
  ),
});
