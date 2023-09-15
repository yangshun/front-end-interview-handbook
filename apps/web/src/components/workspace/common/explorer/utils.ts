import type {
  FileExplorerDirectory,
  FileExplorerFile,
  SandpackBundlerFile,
  SandpackBundlerFiles,
} from './types';

export function parseFiles(files: SandpackBundlerFiles): {
  directoryPaths: Set<string>;
  rootDirectory: FileExplorerDirectory;
} {
  const rootDirectory: FileExplorerDirectory = {
    contents: {},
    fullPath: '/',
    isDirectory: true,
    name: '',
  };
  const directoryPaths = new Set('/');

  const createDirectoryIfNotExists = (
    pathSegments: Array<string>,
    currentDirectory: FileExplorerDirectory = rootDirectory,
  ): FileExplorerDirectory => {
    if (pathSegments.length === 0) {
      return currentDirectory;
    }

    const directoryName = pathSegments[0];
    const innerDirectoryFullPath = currentDirectory.name + '/' + directoryName;
    const innerDirectory = (currentDirectory.contents[
      directoryName
    ] as FileExplorerDirectory) ?? {
      contents: {},
      fullPath: innerDirectoryFullPath,
      isDirectory: true,
      name: directoryName,
    };

    directoryPaths.add(innerDirectoryFullPath);
    currentDirectory.contents[directoryName] = innerDirectory;

    return createDirectoryIfNotExists(pathSegments.slice(1), innerDirectory);
  };

  const createFile = (fullPath: string, sandpackFile: SandpackBundlerFile) => {
    const pathSegments = fullPath.split('/').filter(Boolean);
    const fileName = pathSegments[pathSegments.length - 1];
    const directoryPathSegments = pathSegments.slice(
      0,
      pathSegments.length - 1,
    );
    const directory = createDirectoryIfNotExists(directoryPathSegments);
    const file: FileExplorerFile = {
      fullPath,
      isDirectory: false,
      name: fileName,
      sandpackFile,
    };

    directory.contents[fileName] = file;
  };

  Object.entries(files).forEach(([fullPath, file]) => {
    createFile(fullPath, file);
  });

  return { directoryPaths, rootDirectory };
}

export function getAllFilesInDirectory(
  directory: FileExplorerDirectory,
): Array<FileExplorerFile> {
  const directoryItems = Object.values(directory.contents);
  const files = directoryItems.filter(
    (item) => !item.isDirectory,
  ) as Array<FileExplorerFile>;
  const directories = directoryItems.filter(
    (item) => item.isDirectory,
  ) as Array<FileExplorerDirectory>;

  return [...files, ...directories.flatMap(getAllFilesInDirectory)];
}
