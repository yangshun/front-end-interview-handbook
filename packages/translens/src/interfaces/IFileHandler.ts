export interface IFileHandler {
  /**
   * Read and parse file content
   */
  readFileContent(filePath: string): Promise<Record<string, string>>;

  /**
   * Write content to a file
   */
  writeFile(
    filePath: string,
    targetLocale: string,
    newContent: Record<string, string>,
  ): Promise<void>;

  /**
   * Return if the file has changed via comparing
   * the current file hash with the file hash value stored the registry
   */
  hasFileChanged(filePath: string): Promise<boolean>;

  /**
   * Extracts translatable content from the file.
   */
  extractTranslatableContent(content: any): Promise<Record<string, string>>;

  /**
   * Rebuilds the file content with translated values.
   */
  rebuildContent(
    originalContent: any,
    translatedContent: Record<string, string>,
  ): Promise<any>;
}
