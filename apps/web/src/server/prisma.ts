/**
 * @link https://prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices
 */
import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient().$extends({
    name: 'ProjectsChallengeSubmission extension',
    result: {
      projectsChallengeSubmission: {
        // TODO(projects): Remove fake fields in future.
        // TODO(projects): Extend with challenge data.
        comments: {
          compute: () => 42,
        },
        deploymentUrls: {
          compute: (submission) =>
            submission.deploymentUrls as Array<
              Readonly<{ href: string; label: string }>
            >,
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
