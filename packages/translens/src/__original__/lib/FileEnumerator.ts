import { glob } from 'glob';

export default class FileEnumerator {
  private globSync: (pattern: string) => string[];

  constructor(
    private sourcefilePath: string,
    private targetFilePaths: string[] = [],
    private ignoreFiles: string[] = [],
    globSyncFn?: (pattern: string) => string[], // Injected function for testing
  ) {
    this.globSync = globSyncFn ?? glob.sync; // Use injected or default glob.sync
  }

  /**
   * Fetch all files matching the source pattern
   */
  private getMatchingFiles(pattern: string): string[] {
    return this.globSync(pattern);
  }

  /**
   * Get all files matching the ignore or target patterns
   */
  private getExcludedFiles(excludeFilePaths: string[]): string[] {
    return excludeFilePaths.flatMap((filePath) => this.globSync(filePath));
  }

  /**
   * Enumerate files while excluding ignore files from config and target files
   */
  async enumerateFiles(): Promise<string[]> {
    const sourceFiles = this.getMatchingFiles(this.sourcefilePath);
    const excludedFiles = this.getExcludedFiles([
      ...this.ignoreFiles,
      ...this.targetFilePaths,
      // Ignore the file registry
      '**/*.translens.json',
    ]);

    return sourceFiles.filter((file) => !excludedFiles.includes(file));
  }
}
