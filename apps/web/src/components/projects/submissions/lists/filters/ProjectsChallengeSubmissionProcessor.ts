import type {
  ProjectsChallengeInfo,
  ProjectsChallengeMetadata,
} from 'contentlayer/generated';

export function filterProjectsChallengeSubmission<
  T extends ProjectsChallengeMetadata,
>(
  challengeMetadataList: ReadonlyArray<T>,
  challengeInfoDict: Record<string, ProjectsChallengeInfo>,
  filters: ReadonlyArray<
    (challengeMetadata: T, challengeInfo: ProjectsChallengeInfo) => boolean
  >,
): ReadonlyArray<T> {
  return challengeMetadataList.filter((challengeMetadataItem) =>
    filters.every((filterOp) =>
      filterOp(
        challengeMetadataItem,
        challengeInfoDict[challengeMetadataItem.slug],
      ),
    ),
  );
}
