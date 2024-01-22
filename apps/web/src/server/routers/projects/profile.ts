import { z } from 'zod';

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
  getDashboardStatistics: projectsUserProcedure.query(
    async ({ ctx: { projectsProfileId } }) => {
      return await fetchProjectsProfileStatistics(projectsProfileId);
    },
  ),
  getDashboardStatisticsForProfile: publicProcedure
    .input(
      z.object({
        projectsProfileId: z.string().uuid(),
      }),
    )
    .query(async ({ input: { projectsProfileId } }) => {
      return await fetchProjectsProfileStatistics(projectsProfileId);
    }),
  motivationsUpdate: userProcedure
    .input(
      z.object({
        primaryMotivation: z.string().nullable(),
        secondaryMotivation: z.string().nullable(),
      }),
    )
    .mutation(
      async ({
        input: { primaryMotivation, secondaryMotivation },
        ctx: { user },
      }) => {
        return await prisma.projectsProfile.upsert({
          create: {
            primaryMotivation,
            secondaryMotivation,
            userId: user.id,
          },
          update: {
            primaryMotivation,
            secondaryMotivation,
          },
          where: {
            userId: user.id,
          },
        });
      },
    ),
  onboardingStep1Get: userProcedure.query(async ({ ctx: { user } }) => {
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
  onboardingStep2Get: userProcedure.query(async ({ ctx: { user } }) => {
    return await prisma.profile.findUnique({
      select: {
        bio: true,
        githubUsername: true,
        linkedInUsername: true,
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
        githubUsername: z.string().optional(),
        linkedInUsername: z.string().optional(),
        website: z.string().optional(),
      }),
    )
    .mutation(
      async ({
        input: { bio, githubUsername, linkedInUsername, website },
        ctx: { user },
      }) => {
        return await prisma.profile.update({
          data: {
            bio,
            githubUsername,
            linkedInUsername,
            website,
          },
          where: {
            id: user.id,
          },
        });
      },
    ),
  projectsProfileGet: projectsUserProcedure.query(async ({ ctx: { user } }) => {
    return await prisma.profile.findUnique({
      include: {
        projectsProfile: true,
      },
      where: {
        id: user.id,
      },
    });
  }),
  projectsProfileUpdate: projectsUserProcedure
    .input(
      z.object({
        bio: z.string(),
        currentStatus: z.string().optional(),
        githubUsername: z.string().optional(),
        linkedInUsername: z.string().optional(),
        motivationReasons: z.object({
          primaryMotivation: z.string().nullable(),
          secondaryMotivation: z.string().nullable(),
        }),
        name: z.string(),
        startWorkDate: z.date().optional(),
        title: z.string(),
        website: z.string().optional(),
      }),
    )
    .mutation(
      async ({
        input: {
          currentStatus,
          name,
          startWorkDate,
          title,
          motivationReasons,
          bio,
          githubUsername,
          linkedInUsername,
          website,
        },
        ctx: { user },
      }) => {
        const { primaryMotivation, secondaryMotivation } = motivationReasons;

        const transactionResult = await prisma.$transaction(async (prisma_) => {
          const projectsProfile = await prisma_.projectsProfile.upsert({
            create: {
              primaryMotivation,
              secondaryMotivation,
              userId: user.id,
            },
            update: {
              primaryMotivation,
              secondaryMotivation,
            },
            where: {
              userId: user.id,
            },
          });

          const updatedUserProfile = await prisma_.profile.update({
            data: {
              bio,
              currentStatus,
              githubUsername,
              linkedInUsername,
              name,
              startWorkDate,
              title,
              website,
            },
            where: {
              id: user.id,
            },
          });

          return {
            projectsProfile,
            userProfile: updatedUserProfile,
          };
        });

        return transactionResult;
      },
    ),
});
