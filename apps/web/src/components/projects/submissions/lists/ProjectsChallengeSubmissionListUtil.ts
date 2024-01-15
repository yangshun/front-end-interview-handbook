import { allProjectsChallengeMetadata } from 'contentlayer/generated';

import { fetchSessionsForUserGroupedBySlug } from '~/db/projects/ProjectsReader';

import type { ProjectsChallengeSubmissionWithVotesAuthorChallenge as ProjectsChallengeSubmissionWithVotesAuthorChallenge } from '../types';

export function projectsChallengeSubmissionListAugmentChallenge<
  T extends ProjectsChallengeSubmissionWithVotesAuthorChallenge,
>(submissions: ReadonlyArray<T>) {
  return submissions.map((submission) => {
    const challengeMetadata = allProjectsChallengeMetadata.find(
      (project) => project.slug === submission.slug,
    )!;

    return {
      ...submission,
      challenge: {
        metadata: challengeMetadata,
      },
    };
  });
}

export async function projectsChallengeSubmissionListAugmentChallengeWithCompletionStatus<
  T extends ProjectsChallengeSubmissionWithVotesAuthorChallenge,
>(userId: string | null, submissions: ReadonlyArray<T>) {
  const sessionsForUserGroupedBySlug =
    await fetchSessionsForUserGroupedBySlug(userId);
  const submissionsWithChallenge =
    projectsChallengeSubmissionListAugmentChallenge(submissions);

  return submissionsWithChallenge.map((submission) => {
    return {
      ...submission,
      challenge: {
        ...submission.challenge,
        status:
          sessionsForUserGroupedBySlug?.[submission.challenge.metadata.slug] ??
          null,
      },
    };
  });
}
