// TODO(workspace): Remove this workaround when skeleton files use the same extension as solution files.
/**
 * Normalizes file paths between original and new paths.
 * This is necessary because the skeleton and new files may have different extensions,
 * particularly for React frameworks.
 * This function maps original file paths to their corresponding new file paths.
 */
export default function userInterfaceCodingWorkspaceNormalizeFilePaths(
  originalPaths: Array<string>,
  newPaths: Array<string>,
) {
  const normalize = (path: string) => path.replace(/\.(js|jsx|ts|tsx)$/, 'js');
  const normalizedOriginalMap = originalPaths.reduce(
    (acc, key) => {
      acc[normalize(key)] = key;

      return acc;
    },
    {} as Record<string, string>,
  );

  const mappedPaths = newPaths.reduce(
    (acc, path) => {
      const normalizedPath = normalize(path);
      const originalPath = normalizedOriginalMap[normalizedPath]; // Fallback to same path

      if (originalPath) {
        acc[originalPath] = path;
      }

      return acc;
    },
    {} as Record<string, string>,
  );

  return mappedPaths;
}
