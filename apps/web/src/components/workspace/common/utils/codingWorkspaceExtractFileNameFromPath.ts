export function codingWorkspaceExtractFileNameFromPath(filePath: string) {
  const parts = (filePath ?? '').replace(/^\//, '').split('/');

  return parts.length > 0 ? parts[parts.length - 1] : '';
}
