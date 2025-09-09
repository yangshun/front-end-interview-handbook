declare const __communitySolutionTabType: unique symbol;

export type CodingWorkspaceTabCommunitySolutionType =
  `community-solution:${string}` & {
    [__communitySolutionTabType]: true;
  };

export function codingWorkspaceTabCommunitySolutionId(
  solutionId: string,
): CodingWorkspaceTabCommunitySolutionType {
  return `community_solution:${solutionId}` as CodingWorkspaceTabCommunitySolutionType;
}

export const codingWorkspaceTabCommunitySolutionPattern =
  /^community_solution:/;

declare const __fileTabType: unique symbol;

export type CodingWorkspaceTabFileType = `file:${string}` & {
  [__fileTabType]: true;
};

export function codingWorkspaceTabFileId(
  filePath: string,
): CodingWorkspaceTabFileType {
  return `file:${filePath}` as CodingWorkspaceTabFileType;
}

export const codingWorkspaceTabFilePattern = /^file:/;

declare const __attemptTabType: unique symbol;

export type CodingWorkspaceTabAttemptType = `attempt:${string}` & {
  [__attemptTabType]: true;
};

export function codingWorkspaceTabAttemptId(
  attemptId: string,
): CodingWorkspaceTabAttemptType {
  return `attempt:${attemptId}` as CodingWorkspaceTabAttemptType;
}

export const codingWorkspaceTabAttemptPattern = /^attempt:/;
