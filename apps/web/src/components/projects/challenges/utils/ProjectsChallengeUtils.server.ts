import { sumBy } from 'lodash-es';

import { readProjectsChallengeMetadataDict } from '~/db/projects/ProjectsReader';
import prisma from '~/server/prisma';
import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

export async function projectsChallengeCalculateTotalCreditsNeededForChallenge(
  slug: string,
  userParam?: Readonly<{
    email: string; // User Email.
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

  const challengesInvolved = projectsChallengeDeterminePreReqsRecursively(slug);

  const challengeMetadataDict = readProjectsChallengeMetadataDict();
  // Credits required if no challenges were unlocked.
  const creditsRequiredRaw = sumBy(
    challengesInvolved,
    (challengeSlug) => challengeMetadataDict[challengeSlug].baseCredits,
  );

  // Filter out the free and unlocked challenges.
  const challengesToUnlock = challengesInvolved.filter(
    (challengeSlug) =>
      !(
        challengeMetadataDict[challengeSlug].access === 'free' ||
        challengeMetadataDict[challengeSlug].baseCredits === 0 ||
        challengeUnlockedSet.has(challengeSlug)
      ),
  );

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
function projectsChallengeDeterminePreReqsRecursively(
  slug: string,
): ReadonlyArray<string> {
  const challengeMetadataDict = readProjectsChallengeMetadataDict();

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
