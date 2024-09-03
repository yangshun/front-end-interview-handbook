import { fetchProjectsChallengeMetadata } from '~/db/contentlayer/projects/ProjectsChallengeMetadataReader';
import {
  fetchSessionsForUserGroupedBySlug,
  fetchSubmissionCommentCountsGroupedById,
  readProjectsChallengeInfoDict,
} from '~/db/projects/ProjectsReader';

import type { ProjectsChallengeSubmissionAugmented as ProjectsChallengeSubmissionAugmented } from '../types';

export async function projectsChallengeSubmissionListAugmentChallenge<
  T extends ProjectsChallengeSubmissionAugmented,
>(submissions: ReadonlyArray<T>) {
  const { challengeInfoDict } = await readProjectsChallengeInfoDict();

  const finalSubmissions = await Promise.all(
    submissions.map(async (submission) => {
      const challengeMetadata = await fetchProjectsChallengeMetadata(
        submission.slug,
      );

      return {
        ...submission,
        challenge: {
          info: challengeInfoDict[submission.slug],
          metadata: challengeMetadata!,
          status: null,
        },
      };
    }),
  );

  return finalSubmissions;
}

export async function projectsChallengeSubmissionListAugmentChallengeWithCompletionStatus<
  T extends ProjectsChallengeSubmissionAugmented,
>(userId: string | null, submissions: ReadonlyArray<T>) {
  const submissionIds = submissions.map(({ id }) => id);
  const [
    submissionsWithChallenge,
    sessionsForUserGroupedBySlug,
    commentCountsGroupedBySubmissionId,
  ] = await Promise.all([
    projectsChallengeSubmissionListAugmentChallenge(submissions),
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
