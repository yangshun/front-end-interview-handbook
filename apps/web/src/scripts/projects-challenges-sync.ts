import { projectDifficultyOptions } from '../components/projects/challenges/types';
import Prisma from '../server/prisma';
import allProjectsChallengeMetadata from '../../.contentlayer/generated/ProjectsChallengeMetadata/_index.json' assert { type: 'json' };

async function syncChallenges() {
  await Promise.all(
    allProjectsChallengeMetadata
      .filter((challengeItem) =>
        challengeItem._raw.flattenedPath.endsWith('en-US'),
      )
      .map((challengeMetadata) =>
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
