/**
 * @link https://prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices
 */

import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient().$extends({
    name: 'ProjectsChallengeSubmission extension',
    result: {
      projectsChallengeSubmission: {
        deploymentUrls: {
          compute: (submission) =>
            submission.deploymentUrls as Array<
              Readonly<{ href: string; label: string }>
            >,
        },
        hrefs: {
          compute: (submission) => ({
            detail: `/projects/s/${submission.id}`,
            edit: `/projects/s/${submission.id}/edit`,
          }),
        },
        imgSrc: {
          compute: () => 'https://source.unsplash.com/random/48x48',
        },
        stack: {
          compute: () => [],
        },
      },
    },
  });
};

export type PrismaClientGFE = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientGFE | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
