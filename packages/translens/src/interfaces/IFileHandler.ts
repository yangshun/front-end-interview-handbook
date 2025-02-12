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
    baseContent: string,
    newContent: Record<string, string>,
    removedKeys: string[],
  ): Promise<void>;

  /**
   * Return if the file has changed via comparing
   * the current file hash with the file hash value stored the registry
   */
  hasFileChanged(filePath: string): Promise<boolean>;

  /**
   * Extracts translatable content from the file.
   */
  extractTranslatableContent(content: string): Promise<Record<string, string>>;

  /**
   * Rebuilds the file content with translated values.
   */
  rebuildContent(
    baseContent: string,
    originalContent: string,
    translatedContent: Record<string, string>,
    removedKeys: string[],
  ): Promise<string>;
}

export interface IFileHandlerPlugin {
  name: string;
  createHandler(): IFileHandler;
}
