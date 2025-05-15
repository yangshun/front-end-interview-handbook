/**
 * @link https://prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices
 */

import { PrismaClient } from '@prisma/client';
import { kebabCase, lowerCase } from 'lodash-es';

import type { ProjectsChallengeSubmissionDeploymentUrls } from '~/components/projects/submissions/types';

const prismaClientSingleton = () => {
  return new PrismaClient().$extends({
    name: 'Projects extensions',
    result: {
      projectsChallengeSubmission: {
        deploymentUrls: {
          compute: (submission) =>
            (
              submission.deploymentUrls as ProjectsChallengeSubmissionDeploymentUrls
            )?.map((page) => ({
              ...page,
              updatedAt: page.updatedAt ? new Date(page.updatedAt) : null,
            })),
        },
        hrefs: {
          compute: (submission) => {
            const shortIdAndSlug =
              kebabCase(lowerCase(submission.title)) +
              '-' +
              String(submission.shortId);

            return {
              detail: `/projects/s/${shortIdAndSlug}`,
              edit: `/projects/s/${shortIdAndSlug}/edit`,
            };
          },
        },
        imgSrc: {
          compute: (submission) => {
            const deploymentPages =
              submission.deploymentUrls as ProjectsChallengeSubmissionDeploymentUrls;

            // Find main page or first page if there's no main.
            return (
              deploymentPages.find((page) => page.label === 'main')?.images
                ?.desktop ?? deploymentPages[0].images?.desktop
            );
          },
        },
      },
      projectsProfile: {
        completed: {
          compute: (projectsProfile) => projectsProfile.motivations?.length > 0,
        },
      },
    },
  });
};

export type PrismaClientGFE = ReturnType<typeof prismaClientSingleton>;

// https://stackoverflow.com/a/77859316
export type PrismaTransactionClient = Omit<
  PrismaClientGFE,
  '$connect' | '$disconnect' | '$extends' | '$on' | '$transaction' | '$use'
>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientGFE | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
