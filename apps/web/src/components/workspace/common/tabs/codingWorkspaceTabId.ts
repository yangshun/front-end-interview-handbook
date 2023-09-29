// eslint-disable-next-line init-declarations
declare const fileTabType: unique symbol;

export type CodingWorkspaceTabFileType = string & {
  [fileTabType]: true;
};

export function codingWorkspaceTabFileId(
  filePath: string,
): CodingWorkspaceTabFileType {
  return `file:${filePath}` as CodingWorkspaceTabFileType;
}

export const codingWorkspaceTabFilePattern = /^file:/;
