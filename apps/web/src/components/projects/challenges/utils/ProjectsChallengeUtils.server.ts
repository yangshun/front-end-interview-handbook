import { sumBy } from 'lodash-es';

import { readProjectsChallengeMetadataDict } from '~/db/projects/ProjectsReader';
import prisma from '~/server/prisma';
import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

export async function projectsChallengeCalculateTotalCreditsNeededForChallenge(
  slug: string,
  userParam?: Readonly<{
    id: string; // User ID.
  }> | null,
) {
  let viewer = userParam ?? null;

  if (viewer == null) {
    viewer = await readViewerFromToken();
  }

  // Fetch challenges unlocked by viewer.
  const challengesUnlocked = (
    await prisma.projectsChallengeAccess.findMany({
      select: {
        slug: true,
      },
      where: {
        projectsProfile: {
          userId: viewer?.id,
        },
      },
    })
  ).map((accessItem) => accessItem.slug);
  const challengeUnlockedSet = new Set(challengesUnlocked);

  const [challengesInvolved, challengeMetadataDict] = await Promise.all([
    projectsChallengeDeterminePreReqsRecursively(slug),
    readProjectsChallengeMetadataDict(),
  ]);

  // Credits required if no challenges were unlocked.
  const creditsRequiredRaw = sumBy(
    challengesInvolved,
    (challengeSlug) => challengeMetadataDict[challengeSlug].baseCredits,
  );

  const challengesToUnlock = challengesInvolved
    // Filter out free challenges.
    .filter(
      (challengeSlug) => challengeMetadataDict[challengeSlug].access !== 'free',
    )
    // Filter out unlocked challenges.
    .filter((challengeSlug) => !challengeUnlockedSet.has(challengeSlug));

  // Credits required taking into account unlocked challenges.
  const creditsRequired = sumBy(
    challengesToUnlock,
    (challengeSlug) => challengeMetadataDict[challengeSlug].baseCredits,
  );

  // Calculate the total remaining needed for non-unlocked challenges.
  return {
    challengesToUnlock,
    creditsRequired,
    creditsRequiredRaw,
  };
}

// Recursively find the challenges needed.
async function projectsChallengeDeterminePreReqsRecursively(
  slug: string,
): Promise<ReadonlyArray<string>> {
  const challengeMetadataDict = await readProjectsChallengeMetadataDict();

  const challengesNeeded = new Set<string>();
  const dfsQueue: Array<string> = [slug];

  while (dfsQueue.length > 0) {
    const currChallengeSlug = dfsQueue.pop()!;

    challengesNeeded.add(currChallengeSlug);

    const challengeMetadata = challengeMetadataDict[currChallengeSlug];

    challengeMetadata.preReqs.forEach((preReqSlug) => {
      if (challengesNeeded.has(preReqSlug)) {
        return;
      }

      dfsQueue.push(preReqSlug);
    });
  }

  return Array.from(challengesNeeded);
}
