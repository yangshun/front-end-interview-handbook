import Prisma from '../server/prisma';

async function test() {
  // Async function addPointsToUser({
  //   key,
  //   profileId,
  //   points,
  // }: Readonly<{
  //   key: string;
  //   points: number;
  //   profileId: string;
  // }>) {
  //   const fields = {
  //     key,
  //     profileId,
  //   };

  //   return await Prisma.projectsReputationPoint.createMany({
  //     data: {
  //       ...fields,
  //       points,
  //     },
  //   });
  // }

  return await Prisma.projectsProfile.update({
    data: {
      reputation: {
        connectOrCreate: [
          {
            create: {
              key: 'profile.bio',
              points: 100,
            },
            where: {
              profileId_key: {
                key: 'profile.bio',
                profileId: '84ca339a-5636-4749-ae9a-8357e3d9ae62',
              },
            },
          },
          {
            create: {
              key: 'profile.linkedin',
              points: 200,
            },
            where: {
              profileId_key: {
                key: 'profile.linkedin',
                profileId: '84ca339a-5636-4749-ae9a-8357e3d9ae62',
              },
            },
          },
        ],
      },
    },
    where: {
      id: '84ca339a-5636-4749-ae9a-8357e3d9ae62',
    },
  });
}

test();
