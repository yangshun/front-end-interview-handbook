// eslint-disable-next-line init-declarations
declare const __fileTabType: unique symbol;

export type CodingWorkspaceTabFileType = string & {
  [__fileTabType]: true;
};

export function codingWorkspaceTabFileId(
  filePath: string,
): CodingWorkspaceTabFileType {
  return `file:${filePath}` as CodingWorkspaceTabFileType;
}

export const codingWorkspaceTabFilePattern = /^file:/;

// eslint-disable-next-line init-declarations
declare const __submissionTabType: unique symbol;

export type CodingWorkspaceTabSubmissionType = string & {
  [__submissionTabType]: true;
};

export function codingWorkspaceTabSubmissionId(
  submissionId: string,
): CodingWorkspaceTabSubmissionType {
  return `submission:${submissionId}` as CodingWorkspaceTabSubmissionType;
}

export const codingWorkspaceTabSubmissionPattern = /^submission:/;
