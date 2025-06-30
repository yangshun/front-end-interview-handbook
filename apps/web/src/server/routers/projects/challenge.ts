import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import ProjectsPremiumAccessControl from '~/components/projects/challenges/premium/ProjectsPremiumAccessControl';
import { projectsChallengeCalculateTotalCreditsNeededForChallenge } from '~/components/projects/challenges/utils/ProjectsChallengeUtils.server';
import fetchViewerProjectsChallengeAccess from '~/components/projects/utils/fetchViewerProjectsChallengeAccess';
import fetchViewerProjectsProfile from '~/components/projects/utils/fetchViewerProjectsProfile';

import {
  readProjectsChallengeInfoDict,
  readProjectsChallengeItem,
  readProjectsChallengeMetadata,
  readProjectsChallengeMetadataDict,
} from '~/db/projects/ProjectsReader';
import prisma from '~/server/prisma';
import { publicProcedure, router } from '~/server/trpc';
import { createSupabaseAdminClientGFE_SERVER_ONLY } from '~/supabase/SupabaseServerGFE';

import { projectsUserProcedure } from './procedures';

export const projectsChallengeRouter = router({
  canAccessAllSteps: projectsUserProcedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .query(async ({ ctx: { projectsProfileId }, input: { slug } }) => {
      const sessions = await prisma.projectsChallengeSession.count({
        where: {
          profileId: projectsProfileId,
          slug,
          status: {
            in: ['IN_PROGRESS', 'COMPLETED'],
          },
        },
      });

      return sessions > 0;
    }),
  downloadDesignFiles: projectsUserProcedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .mutation(async ({ ctx: { viewer }, input: { slug } }) => {
      const challengeMetadata = await readProjectsChallengeMetadata(slug);
      const [{ viewerProjectsProfile }, viewerUnlockedAccess] =
        await Promise.all([
          fetchViewerProjectsProfile(viewer),
          fetchViewerProjectsChallengeAccess(slug, viewer),
        ]);

      const viewerAccess = ProjectsPremiumAccessControl(
        challengeMetadata.access,
        viewerProjectsProfile,
        viewerUnlockedAccess,
      );

      if (
        viewerAccess.downloadStarterFiles !== 'ACCESSIBLE_TO_EVERYONE' &&
        viewerAccess.downloadStarterFiles !== 'UNLOCKED'
      ) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Not authorized to download file',
        });
      }

      const supabaseAdmin = createSupabaseAdminClientGFE_SERVER_ONLY();

      const { data: detachedData } = await supabaseAdmin.storage
        .from('projects')
        .createSignedUrl(
          `challenges/${challengeMetadata.slug}/${challengeMetadata.slug}-detached.fig`,
          300,
          {
            download: `${challengeMetadata.slug}-figma.fig`,
          },
        );

      if (detachedData != null) {
        return detachedData;
      }

      const { data, error } = await supabaseAdmin.storage
        .from('projects')
        .createSignedUrl(
          `challenges/${challengeMetadata.slug}/${challengeMetadata.slug}.fig`,
          300,
          {
            download: `${challengeMetadata.slug}-figma.fig`,
          },
        );

      if (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Error creating signed URL',
        });
      }

      return data;
    }),
  downloadStarterFiles: projectsUserProcedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .mutation(async ({ ctx: { viewer }, input: { slug } }) => {
      const challengeMetadata = await readProjectsChallengeMetadata(slug);
      const [{ viewerProjectsProfile }, viewerUnlockedAccess] =
        await Promise.all([
          fetchViewerProjectsProfile(viewer),
          fetchViewerProjectsChallengeAccess(slug, viewer),
        ]);

      const viewerAccess = ProjectsPremiumAccessControl(
        challengeMetadata.access,
        viewerProjectsProfile,
        viewerUnlockedAccess,
      );

      if (
        viewerAccess.downloadStarterFiles !== 'ACCESSIBLE_TO_EVERYONE' &&
        viewerAccess.downloadStarterFiles !== 'UNLOCKED'
      ) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Not authorized to download file',
        });
      }

      const supabaseAdmin = createSupabaseAdminClientGFE_SERVER_ONLY();
      const { data, error } = await supabaseAdmin.storage
        .from('projects')
        .createSignedUrl(
          `challenges/${challengeMetadata.slug}/${challengeMetadata.slug}.zip`,
          300,
          {
            download: `${challengeMetadata.slug}-starter.zip`,
          },
        );

      if (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Error creating signed URL',
        });
      }

      return data;
    }),
  hovercard: publicProcedure
    .input(
      z.object({
        locale: z.string(),
        slug: z.string(),
      }),
    )
    .query(async ({ ctx: { viewer }, input: { locale, slug } }) => {
      const challengeResult = await readProjectsChallengeItem(
        slug,
        locale,
        viewer?.id,
      );

      if (!challengeResult) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Challenge not found',
        });
      }

      const { challenge } = challengeResult;

      return {
        ...challenge,
        // Don't display status in hovercard.
        status: null,
      };
    }),
  unlockAccess: projectsUserProcedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .mutation(
      async ({ ctx: { projectsProfileId, viewer }, input: { slug } }) => {
        const projectsProfile = await prisma.projectsProfile.findFirstOrThrow({
          select: {
            credits: true,
            premium: true,
          },
          where: {
            id: projectsProfileId,
          },
        });

        if (!projectsProfile.premium) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Non-premium user',
          });
        }

        const [challengeMetadataDict, { challengesToUnlock, creditsRequired }] =
          await Promise.all([
            readProjectsChallengeMetadataDict(),
            projectsChallengeCalculateTotalCreditsNeededForChallenge(
              slug,
              viewer,
            ),
          ]);

        if (projectsProfile.credits - creditsRequired < 0) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Insufficient credits remaining',
          });
        }

        return await prisma.$transaction(
          challengesToUnlock.map((challengeSlug) =>
            prisma.projectsChallengeCreditTransaction.create({
              data: {
                access: {
                  create: {
                    profileId: projectsProfileId,
                    slug: challengeSlug,
                  },
                },
                amount: challengeMetadataDict[challengeSlug].baseCredits,
                profileId: projectsProfileId,
                type: 'DEBIT',
              },
            }),
          ),
        );
      },
    ),
  unlockCreditsDetails: projectsUserProcedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .query(async ({ ctx: { viewer }, input: { slug } }) => {
      const data =
        await projectsChallengeCalculateTotalCreditsNeededForChallenge(
          slug,
          viewer,
        );

      const [challengeMetadataDict, { challengeInfoDict }] = await Promise.all([
        readProjectsChallengeMetadataDict(),
        readProjectsChallengeInfoDict(),
      ]);

      return {
        ...data,
        challengesToUnlock: data.challengesToUnlock.map((challengeSlug) => ({
          info: challengeInfoDict[challengeSlug],
          metadata: challengeMetadataDict[challengeSlug],
        })),
      };
    }),
});
