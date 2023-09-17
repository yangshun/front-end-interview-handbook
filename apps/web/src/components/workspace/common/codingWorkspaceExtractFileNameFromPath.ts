export function codingWorkspaceExtractFileNameFromPath(filePath: string) {
  return filePath.replace(/^\//, '').split('/').at(-1) ?? '';
}
