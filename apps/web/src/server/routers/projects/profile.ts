import nullthrows from 'nullthrows';
import { z } from 'zod';

import { base64toBlob } from '~/lib/imageUtils';

import { profileUserNameSchemaServer } from '~/components/profile/fields/ProfileUsernameSchema';
import { useProjectsProfileGitHubSchemaServer } from '~/components/projects/profile/fields/ProjectsProfileGithubSchema';
import { projectsJobTitleInputSchemaServer } from '~/components/projects/profile/fields/ProjectsProfileJobSchema';
import { useProjectsProfileLinkedInSchemaServer } from '~/components/projects/profile/fields/ProjectsProfileLinkedInSchema';
import { projectsProfileWebsiteSchemaServer } from '~/components/projects/profile/fields/ProjectsProfileWebsiteSchema';
import { projectsProfileRecalculatePoints } from '~/components/projects/reputation/ProjectsProfileRecalculatePoints';
import { projectsSkillListInputOptionalSchemaServer } from '~/components/projects/skills/form/ProjectsSkillListInputSchema';
import { getOrCreateUserProfileWithProjectsProfile } from '~/components/projects/utils/ProjectsProfileUtils';

import prisma from '~/server/prisma';
import { createSupabaseAdminClientGFE_SERVER_ONLY } from '~/supabase/SupabaseServerGFE';

import { projectsProfileBioSchemaServer } from '../../../components/projects/profile/fields/ProjectsProfileBioSchema';
import { publicProcedure, router, userProcedure } from '../../trpc';
import { projectsUserProcedure } from './procedures';

async function fetchProjectsProfileStatistics(projectsProfileId: string) {
  const [
    codeReviews,
    completedChallenges,
    submissionUpvotes,
    discussionUpvotes,
    submissionViews,
  ] = await Promise.all([
    prisma.projectsDiscussionComment.count({
      where: {
        author: {
          id: projectsProfileId,
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
    prisma.projectsDiscussionCommentVote.count({
      where: {
        comment: {
          author: {
            id: projectsProfileId,
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
  hovercard: publicProcedure
    .input(
      z.object({
        userId: z.string().uuid(),
      }),
    )
    .query(async ({ input: { userId } }) => {
      const submissionCount = 2;
      const [profile, pinnedSubmissions, latestSubmissions] = await Promise.all(
        [
          prisma.profile.findUnique({
            include: {
              projectsProfile: {
                select: {
                  id: true,
                  points: true,
                  premium: true,
                },
              },
            },
            where: {
              id: userId,
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
                    userId,
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
                userId,
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
  onboard: userProcedure
    .input(
      z.object({
        avatarUrl: z.string().optional(),
        company: z.string().optional().nullable(),
        currentStatus: z.string().optional().nullable(),
        motivations: z.array(z.string()),
        name: z.string(),
        startWorkDate: z.date().optional().nullable(),
        title: projectsJobTitleInputSchemaServer,
        username: profileUserNameSchemaServer,
      }),
    )
    .mutation(
      async ({
        input: {
          currentStatus,
          name,
          title,
          startWorkDate,
          avatarUrl,
          motivations,
          username,
          company,
        },
        ctx: { viewer },
      }) => {
        const projectsProfileFields = {
          motivations,
        };
        const userProfile = nullthrows(
          await prisma.profile.update({
            data: {
              avatarUrl,
              company,
              currentStatus,
              name,
              projectsProfile: {
                upsert: {
                  create: projectsProfileFields,
                  update: projectsProfileFields,
                },
              },
              startWorkDate,
              title,
              username,
            },
            include: {
              projectsProfile: true,
            },
            where: {
              id: viewer.id,
            },
          }),
        );

        const projectsProfile = nullthrows(
          await projectsProfileRecalculatePoints(
            userProfile.projectsProfile?.id,
          ),
        );

        return { ...userProfile, projectsProfile };
      },
    ),
  update: projectsUserProcedure
    .input(
      z
        .object({
          avatarUrl: z.string().optional(),
          bio: projectsProfileBioSchemaServer,
          company: z.string().optional().nullable(),
          currentStatus: z.string().optional().nullable(),
          githubUsername: useProjectsProfileGitHubSchemaServer,
          linkedInUsername: useProjectsProfileLinkedInSchemaServer,
          motivations: z.array(z.string()),
          name: z.string(),
          skillsProficient: projectsSkillListInputOptionalSchemaServer,
          skillsToGrow: projectsSkillListInputOptionalSchemaServer,
          startWorkDate: z.date().optional().nullable(),
          title: projectsJobTitleInputSchemaServer,
          username: profileUserNameSchemaServer,
          website: projectsProfileWebsiteSchemaServer,
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
          avatarUrl,
          username,
          company,
        },
        ctx: { viewer },
      }) => {
        const projectsProfileFields = {
          motivations,
          skillsProficient,
          skillsToGrow,
        };

        const userProfile = nullthrows(
          await prisma.profile.update({
            data: {
              avatarUrl,
              bio,
              company,
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
              username,
              website,
            },
            include: {
              projectsProfile: true,
            },
            where: {
              id: viewer.id,
            },
          }),
        );

        const projectsProfile = nullthrows(
          await projectsProfileRecalculatePoints(
            userProfile.projectsProfile?.id,
          ),
        );

        return {
          ...userProfile,
          projectsProfile,
        };
      },
    ),
  uploadProfilePhoto: userProcedure
    .input(
      z.object({
        imageFile: z.string(),
      }),
    )
    .mutation(async ({ input: { imageFile }, ctx: { viewer } }) => {
      const supabaseAdmin = createSupabaseAdminClientGFE_SERVER_ONLY();

      const blob = base64toBlob(imageFile);

      const storagePath =
        viewer.id + '-' + String(new Date().getTime()) + '.jpg';
      const { error } = await supabaseAdmin.storage
        .from('user-avatars')
        .upload(storagePath, blob, {
          upsert: true,
        });

      if (error) {
        throw error;
      }

      const { data: imageUrl } = supabaseAdmin.storage
        .from('user-avatars')
        .getPublicUrl(storagePath);

      return imageUrl.publicUrl;
    }),
  usernameExists: userProcedure
    .input(
      z.object({
        username: z.string(),
      }),
    )
    .query(async ({ input: { username }, ctx: { viewer } }) => {
      const profile = await prisma.profile.findUnique({
        where: {
          username,
        },
      });

      return profile != null && profile.id !== viewer.id;
    }),
  viewer: publicProcedure
    .input(
      z.object({
        createProjectsProfileIfNotFound: z.boolean().default(true),
      }),
    )
    .query(
      async ({
        ctx: { viewer },
        input: { createProjectsProfileIfNotFound },
      }) => {
        // Non-logged in
        if (viewer == null) {
          return null;
        }

        return await getOrCreateUserProfileWithProjectsProfile(
          viewer,
          createProjectsProfileIfNotFound,
        );
      },
    ),
});
