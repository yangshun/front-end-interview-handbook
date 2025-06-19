import allProjectsChallengeMetadata from '../../.contentlayer/generated/ProjectsChallengeMetadata/_index.json' assert { type: 'json' };
import { projectDifficultyOptions } from '../components/projects/challenges/types';
import Prisma from '../server/prisma';

async function syncChallenges() {
  await Promise.all(
    allProjectsChallengeMetadata.map((challengeMetadata) =>
      Prisma.projectsChallengeDetails.upsert({
        create: {
          difficulty: projectDifficultyOptions.indexOf(
            challengeMetadata.difficulty,
          ),
          slug: challengeMetadata.slug,
        },
        update: {
          difficulty: projectDifficultyOptions.indexOf(
            challengeMetadata.difficulty,
          ),
        },
        where: {
          slug: challengeMetadata.slug,
        },
      }),
    ),
  );
}

syncChallenges();
