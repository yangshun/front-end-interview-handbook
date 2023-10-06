export function codingFilesShouldUseTypeScript(
  // Array of file paths for the project.
  filesPaths: ReadonlyArray<string>,
) {
  return filesPaths.some(
    (filePath) =>
      filePath.endsWith('.tsconfig.json') ||
      filePath.endsWith('.ts') ||
      filePath.endsWith('.tsx'),
  );
}
