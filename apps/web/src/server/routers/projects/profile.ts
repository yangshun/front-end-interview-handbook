import { z } from 'zod';

import { projectsSkillListInputOptionalSchemaServer } from '~/components/projects/skills/form/ProjectsSkillListInputSchema';

import prisma from '~/server/prisma';

import { projectsUserProcedure } from './procedures';
import { publicProcedure, router, userProcedure } from '../../trpc';

async function fetchProjectsProfileStatistics(projectsProfileId: string) {
  const [
    codeReviews,
    completedChallenges,
    submissionUpvotes,
    discussionUpvotes,
    submissionViews,
  ] = await Promise.all([
    prisma.discussionComment.count({
      where: {
        author: {
          projectsProfile: {
            id: projectsProfileId,
          },
        },
        category: 'CODE_REVIEW',
        domain: {
          in: ['PROJECTS_CHALLENGE', 'PROJECTS_SUBMISSION'],
        },
      },
    }),
    prisma.projectsChallengeSubmission.count({
      where: {
        profileId: projectsProfileId,
      },
    }),
    prisma.projectsChallengeSubmissionVote.count({
      where: {
        submission: {
          profileId: projectsProfileId,
        },
      },
    }),
    prisma.discussionCommentVote.count({
      where: {
        comment: {
          author: {
            projectsProfile: {
              id: projectsProfileId,
            },
          },
        },
      },
    }),
    prisma.projectsChallengeSubmission.aggregate({
      _sum: {
        views: true,
      },
      where: {
        profileId: projectsProfileId,
      },
    }),
  ]);

  return {
    codeReviews,
    completedChallenges,
    submissionViews: submissionViews._sum.views,
    upvotes: Number(submissionUpvotes) + Number(discussionUpvotes),
  };
}

export const projectsProfileRouter = router({
  dashboardStatistics: publicProcedure
    .input(
      z.object({
        projectsProfileId: z.string().uuid(),
      }),
    )
    .query(async ({ input: { projectsProfileId } }) => {
      return await fetchProjectsProfileStatistics(projectsProfileId);
    }),
  dashboardStatisticsSelf: projectsUserProcedure.query(
    async ({ ctx: { projectsProfileId } }) => {
      return await fetchProjectsProfileStatistics(projectsProfileId);
    },
  ),
  get: projectsUserProcedure.query(async ({ ctx: { user } }) => {
    return await prisma.profile.findUnique({
      include: {
        projectsProfile: true,
      },
      where: {
        id: user.id,
      },
    });
  }),
  hovercard: publicProcedure
    .input(
      z.object({
        profileId: z.string().uuid(),
      }),
    )
    .query(async ({ input: { profileId } }) => {
      const submissionCount = 2;
      const [profile, pinnedSubmissions, latestSubmissions] = await Promise.all(
        [
          prisma.profile.findUnique({
            include: {
              projectsProfile: {
                select: {
                  id: true,
                },
              },
            },
            where: {
              id: profileId,
            },
          }),
          prisma.projectsChallengeSubmission.findMany({
            orderBy: {
              createdAt: 'desc',
            },
            take: submissionCount,
            where: {
              pins: {
                some: {
                  projectsProfile: {
                    userId: profileId,
                  },
                },
              },
            },
          }),
          prisma.projectsChallengeSubmission.findMany({
            orderBy: {
              createdAt: 'desc',
            },
            take: submissionCount,
            where: {
              projectsProfile: {
                userId: profileId,
              },
            },
          }),
        ],
      );

      // TODO(projects): see how we can integrate into the Promise.all().
      const { completedChallenges, upvotes, submissionViews, codeReviews } =
        await fetchProjectsProfileStatistics(
          profile?.projectsProfile?.id ?? '',
        );

      return {
        profile,
        stats: {
          codeReviews,
          completedChallenges,
          submissionViews,
          upvotes,
        },
        submissions:
          pinnedSubmissions.length >= submissionCount
            ? pinnedSubmissions
            : latestSubmissions,
      };
    }),
  motivationsUpdate: userProcedure
    .input(
      z.object({
        motivations: z.array(z.string()),
      }),
    )
    .mutation(async ({ input: { motivations }, ctx: { user } }) => {
      const projectsProfileFields = {
        motivations,
      };

      return await prisma.profile.update({
        data: {
          projectsProfile: {
            upsert: {
              create: projectsProfileFields,
              update: projectsProfileFields,
            },
          },
        },
        where: {
          id: user.id,
        },
      });
    }),
  onboardingStep1: userProcedure.query(async ({ ctx: { user } }) => {
    return await prisma.profile.findUnique({
      select: {
        currentStatus: true,
        name: true,
        startWorkDate: true,
        title: true,
      },
      where: {
        id: user.id,
      },
    });
  }),
  onboardingStep1Update: userProcedure
    .input(
      z.object({
        currentStatus: z.string().optional(),
        name: z.string(),
        startWorkDate: z.date().optional(),
        title: z.string(),
      }),
    )
    .mutation(
      async ({
        input: { currentStatus, name, title, startWorkDate },
        ctx: { user },
      }) => {
        return await prisma.profile.update({
          data: {
            currentStatus,
            name,
            startWorkDate,
            title,
          },
          where: {
            id: user.id,
          },
        });
      },
    ),
  onboardingStep2: userProcedure.query(async ({ ctx: { user } }) => {
    return await prisma.profile.findUnique({
      select: {
        bio: true,
        githubUsername: true,
        linkedInUsername: true,
        projectsProfile: {
          select: {
            skillsProficient: true,
            skillsToGrow: true,
          },
        },
        website: true,
      },
      where: {
        id: user.id,
      },
    });
  }),
  onboardingStep2Update: userProcedure
    .input(
      z.object({
        bio: z.string(),
        githubUsername: z
          .union([z.string().length(0), z.string().url()])
          .transform((val) => (val ? val : null))
          .nullable(),
        linkedInUsername: z
          .union([z.string().length(0), z.string().url()])
          .transform((val) => (val ? val : null))
          .nullable(),
        skillsProficient: projectsSkillListInputOptionalSchemaServer,
        skillsToGrow: projectsSkillListInputOptionalSchemaServer,
        website: z
          .union([z.string().length(0), z.string().url()])
          .transform((val) => (val ? val : null))
          .nullable(),
      }),
    )
    .mutation(
      async ({
        input: {
          bio,
          githubUsername,
          linkedInUsername,
          website,
          skillsProficient,
          skillsToGrow,
        },
        ctx: { user },
      }) => {
        const projectsProfileFields = {
          skillsProficient,
          skillsToGrow,
        };

        return await prisma.profile.update({
          data: {
            bio,
            githubUsername,
            linkedInUsername,
            projectsProfile: {
              upsert: {
                create: projectsProfileFields,
                update: projectsProfileFields,
              },
            },
            website,
          },
          where: {
            id: user.id,
          },
        });
      },
    ),
  update: projectsUserProcedure
    .input(
      z
        .object({
          bio: z.string(),
          currentStatus: z.string().optional(),
          githubUsername: z
            .union([z.string().length(0), z.string().url()])
            .transform((val) => (val ? val : null))
            .nullable(),
          linkedInUsername: z
            .union([z.string().length(0), z.string().url()])
            .transform((val) => (val ? val : null))
            .nullable(),
          motivations: z.array(z.string()),
          name: z.string(),
          skillsProficient: projectsSkillListInputOptionalSchemaServer,
          skillsToGrow: projectsSkillListInputOptionalSchemaServer,
          startWorkDate: z.date().optional(),
          title: z.string(),
          website: z
            .union([z.string().length(0), z.string().url()])
            .transform((val) => (val ? val : null))
            .nullable(),
        })
        .partial(),
    )
    .mutation(
      async ({
        input: {
          bio,
          currentStatus,
          githubUsername,
          linkedInUsername,
          motivations,
          name,
          skillsProficient,
          skillsToGrow,
          startWorkDate,
          title,
          website,
        },
        ctx: { user },
      }) => {
        const projectsProfileFields = {
          motivations,
          skillsProficient,
          skillsToGrow,
        };

        return await prisma.profile.update({
          data: {
            bio,
            currentStatus,
            githubUsername,
            linkedInUsername,
            name,
            projectsProfile: {
              upsert: {
                create: projectsProfileFields,
                update: projectsProfileFields,
              },
            },
            startWorkDate,
            title,
            website,
          },
          where: {
            id: user.id,
          },
        });
      },
    ),
});
