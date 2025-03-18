import fs from 'fs';
import path from 'path';
import { log } from '@clack/prompts';
import {
  IChangeDetector,
  IFileHandler,
  IFileRegistryManager,
} from '../interfaces';

export default abstract class BaseFileHandler implements IFileHandler {
  constructor(
    private changeDetector: IChangeDetector,
    private registryManager: IFileRegistryManager,
  ) {}

  abstract extractTranslatableContent(
    content: string,
  ): Promise<Record<string, string>>;
  abstract rebuildContent(
    baseContent: string,
    originalContent: string,
    translatedContent: Record<string, string>,
    removedKeys: string[],
  ): Promise<string>;

  /**
   * Return if the file has changed via comparing
   * the current file hash with the file hash value stored the registry
   */
  async hasFileChanged(filePath: string) {
    const [fileContent, registry] = await Promise.all([
      this.readFileContent(filePath),
      this.registryManager.load(filePath),
    ]);
    const currentFileHash = this.changeDetector.generateHash(
      JSON.stringify(fileContent),
    );

    return !this.changeDetector.isHashEqual(currentFileHash, registry?.hash);
  }

  /**
   * Read and parse file content
   */
  async readFileContent(filePath: string): Promise<Record<string, string>> {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      return this.extractTranslatableContent(content);
    } catch (error: any) {
      throw new Error(`Error reading file: ${error.message}`);
    }
  }

  /**
   * Write content to a file
   */
  async writeFile(
    filePath: string,
    targetLocale: string,
    baseContent: string,
    newContent: Record<string, string>,
    removedKeys: string[],
  ): Promise<void> {
    const sourcePath = filePath.replace('{locale}', targetLocale);
    try {
      let existingContent: string = '';
      // Check if the file exists
      const fileExist = fs.existsSync(sourcePath);
      // Read existing file content if it exists
      if (fileExist) {
        try {
          existingContent = fs.readFileSync(sourcePath, 'utf-8');
        } catch (error) {
          log.warn(
            `⚠ Could not read existing file ${sourcePath}. Creating a new one.`,
          );
        }
      }

      // Ensure the directory exists
      const directoryPath = path.dirname(sourcePath);
      if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true }); // Create the directory if it doesn't exist
      }

      const content = await this.rebuildContent(
        baseContent,
        existingContent,
        newContent,
        removedKeys,
      );

      // Write to the file
      fs.writeFileSync(sourcePath, content, 'utf-8');
    } catch (error: any) {
      throw new Error(`Error writing file ${sourcePath}: ${error.message}`);
    }
  }
}
