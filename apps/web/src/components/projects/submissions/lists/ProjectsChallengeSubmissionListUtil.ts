import { allProjectsChallengeMetadata } from 'contentlayer/generated';

import {
  fetchSessionsForUserGroupedBySlug,
  fetchSubmissionCommentCountsGroupedById,
} from '~/db/projects/ProjectsReader';

import type { ProjectsChallengeSubmissionAugmented as ProjectsChallengeSubmissionAugmented } from '../types';

export function projectsChallengeSubmissionListAugmentChallenge<
  T extends ProjectsChallengeSubmissionAugmented,
>(submissions: ReadonlyArray<T>) {
  return submissions.map((submission) => {
    const challengeMetadata = allProjectsChallengeMetadata.find(
      (project) => project.slug === submission.slug,
    )!;

    return {
      ...submission,
      challenge: {
        metadata: challengeMetadata,
        status: null,
      },
    };
  });
}

export async function projectsChallengeSubmissionListAugmentChallengeWithCompletionStatus<
  T extends ProjectsChallengeSubmissionAugmented,
>(userId: string | null, submissions: ReadonlyArray<T>) {
  const submissionsWithChallenge =
    projectsChallengeSubmissionListAugmentChallenge(submissions);
  const submissionIds = submissions.map(({ id }) => id);
  const [sessionsForUserGroupedBySlug, commentCountsGroupedBySubmissionId] =
    await Promise.all([
      fetchSessionsForUserGroupedBySlug(userId),
      fetchSubmissionCommentCountsGroupedById(submissionIds),
    ]);

  return submissionsWithChallenge.map((submission) => {
    return {
      ...submission,
      challenge: {
        ...submission.challenge,
        status:
          sessionsForUserGroupedBySlug?.[submission.challenge.metadata.slug] ??
          null,
      },
      comments: commentCountsGroupedBySubmissionId?.[submission.id] ?? null,
    };
  });
}
