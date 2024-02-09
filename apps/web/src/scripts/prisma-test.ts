import Prisma from '../server/prisma';

async function test() {
  // Example of sorting using a score field on a related view.
  const res = await Prisma.projectsChallengeSubmission.findMany({
    orderBy: {
      recommendation: {
        score: 'desc',
      },
    },
    select: {
      id: true,
      recommendation: {
        select: {
          score: true,
        },
      },
      views: true,
    },
  });

  console.info(res);
}

test();
