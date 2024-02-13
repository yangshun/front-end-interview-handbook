import { z } from 'zod';

import { projectsSkillListInputSchemaServer } from '~/components/projects/skills/form/ProjectsSkillListInputSchema';
import { projectsChallengeSubmissionDeploymentUrlsSchemaServer } from '~/components/projects/submissions/form/fields/ProjectsChallengeSubmissionDeploymentUrlsSchema';
import { projectsChallengeSubmissionImplementationSchemaServer } from '~/components/projects/submissions/form/fields/ProjectsChallengeSubmissionImplementationSchema';
import { projectsChallengeSubmissionRepositoryUrlSchemaServer } from '~/components/projects/submissions/form/fields/ProjectsChallengeSubmissionRepositoryUrlSchema';
import { projectsChallengeSubmissionSummarySchemaServer } from '~/components/projects/submissions/form/fields/ProjectsChallengeSubmissionSummarySchema';
import { projectsChallengeSubmissionTitleSchemaServer } from '~/components/projects/submissions/form/fields/ProjectsChallengeSubmissionTitleSchema';

import prisma from '~/server/prisma';
import {
  deleteScreenshot,
  generateScreenshots,
} from '~/utils/projects/screenshotUtils';

import { projectsUserProcedure } from './procedures';
import { publicProcedure, router } from '../../trpc';

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
  roadmapSkills: projectsSkillListInputSchemaServer,
  summary: projectsChallengeSubmissionSummarySchemaServer,
  techStackSkills: projectsSkillListInputSchemaServer,
  title: projectsChallengeSubmissionTitleSchemaServer,
});

export const projectsChallengeSubmissionItemRouter = router({
  create: projectsChallengeProcedure
    .input(projectsChallengeSubmissionFormSchema)
    .mutation(
      async ({
        input: {
          slug,
          title,
          summary,
          roadmapSkills,
          techStackSkills,
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

        // Write to database first
        const txRes = await prisma.$transaction(async (tx) => {
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
              roadmapSkills,
              slug,
              summary,
              techStackSkills,
              title,
            },
          });
        });

        // Non-blocking request to take screenshots and update database
        generateScreenshots(txRes.id, txRes.deploymentUrls).then(
          async (screenshots) => {
            await prisma.projectsChallengeSubmission.update({
              data: {
                deploymentUrls: screenshots,
              },
              where: {
                id: txRes.id,
              },
            });
          },
        );

        return txRes;
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
  incrementView: publicProcedure
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
  takeScreenshot: publicProcedure
    .input(
      z.object({
        submissionId: z.string().uuid(),
      }),
    )
    .mutation(async ({ input: { submissionId } }) => {
      const submission = await prisma.projectsChallengeSubmission.findUnique({
        where: {
          id: submissionId,
        },
      });

      if (submission == null) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Submission not found',
        });
      }

      const screenshots = await generateScreenshots(
        submissionId,
        submission.deploymentUrls,
      );

      await prisma.projectsChallengeSubmission.update({
        data: {
          deploymentUrls: screenshots,
        },
        where: {
          id: submissionId,
        },
      });

      return screenshots;
    }),
  unpin: projectsUserProcedure
    .input(
      z.object({
        submissionIds: z.array(z.string().uuid()),
      }),
    )
    .mutation(
      async ({ input: { submissionIds }, ctx: { projectsProfileId } }) => {
        await prisma.projectsChallengeSubmissionPin.deleteMany({
          where: {
            profileId: projectsProfileId,
            submissionId: {
              in: submissionIds,
            },
          },
        });
      },
    ),
  unvote: projectsUserProcedure
    .input(
      z.object({
        submissionId: z.string().uuid(),
      }),
    )
    .mutation(
      async ({ input: { submissionId }, ctx: { projectsProfileId } }) => {
        await prisma.projectsChallengeSubmissionVote.deleteMany({
          where: {
            profileId: projectsProfileId,
            submissionId,
          },
        });

        return null;
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
          roadmapSkills,
          techStackSkills,
          summary,
          deploymentUrls,
          repositoryUrl,
          implementation,
        },
        ctx: { projectsProfileId },
      }) => {
        const oldDeploymentUrls =
          await prisma.projectsChallengeSubmission.findUnique({
            select: {
              deploymentUrls: true,
            },
            where: {
              id: submissionId,
            },
          });

        const res = await prisma.projectsChallengeSubmission.update({
          data: {
            deploymentUrls: deploymentUrls as Prisma.JsonArray,
            editedAt: new Date(),
            implementation,
            repositoryUrl,
            roadmapSkills,
            summary,
            techStackSkills,
            title,
          },
          where: {
            id: submissionId,
            profileId: projectsProfileId,
          },
        });

        // For deleted pages, remove files from the bucket
        const newDeploymentUrls = res.deploymentUrls;

        oldDeploymentUrls?.deploymentUrls.forEach(async (oldDeploymentUrl) => {
          if (
            !newDeploymentUrls.some(
              (newDeploymentUrl) =>
                newDeploymentUrl.label === oldDeploymentUrl.label,
            )
          ) {
            await deleteScreenshot(submissionId, oldDeploymentUrl.href);
          }
        });

        // Update deploymentUrls field with new screenshots
        generateScreenshots(submissionId, newDeploymentUrls).then(
          async (screenshots) => {
            await prisma.projectsChallengeSubmission.update({
              data: {
                deploymentUrls: screenshots,
              },
              where: {
                id: submissionId,
              },
            });
          },
        );

        return res;
      },
    ),
  userCompletedTimes: projectsChallengeProcedure.query(
    async ({ input: { slug }, ctx: { projectsProfileId } }) => {
      return await prisma.projectsChallengeSubmission.count({
        where: {
          profileId: projectsProfileId,
          slug,
        },
      });
    },
  ),
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
