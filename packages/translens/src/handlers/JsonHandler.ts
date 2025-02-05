import fs from 'fs';
import path from 'path';
import { log } from '@clack/prompts';
import { IFileHandler } from '../interfaces';
import { IConfigFile } from '../types/config';
import { IFileRegistryManager } from '../interfaces/IFileRegistryManager';

export class JsonHandler implements IFileHandler {
  constructor(private registryManager: IFileRegistryManager) {}
  /**
   * Translate a JSON file to multiple locales
   */
  async translate(file: IConfigFile, targetLocales: string[]): Promise<void> {
    const { source, target } = file;
    const fileContent = await this.readFileContent(source);
    const registry = await this.registryManager.load(source);

    // Translate the file for all the locales
    await Promise.all(
      targetLocales.map(async (locale) => {
        await this.writeFile(target, locale, fileContent);
      }),
    );
    // Update registry
    const newRegistry = {
      hashes: fileContent,
      hash: 'abcedf', // TODO: update when ChangeDetector is done
      translatedLocales: [
        ...new Set([...(registry?.translatedLocales || []), ...targetLocales]),
      ],
    };

    await this.registryManager.save(source, newRegistry);
  }

  /**
   * Read and parse JSON file content
   */
  private async readFileContent(
    filePath: string,
  ): Promise<Record<string, string>> {
    try {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch (error: any) {
      throw new Error(`Error reading file: ${error.message}`);
    }
  }

  /**
   * Write content to a JSON file
   */
  private async writeFile(
    filePath: string,
    targetLocale: string,
    newContent: object,
  ): Promise<void> {
    const sourcePath = filePath.replace('{locale}', targetLocale);
    try {
      let existingContent: object = {};
      // Check if the file exists
      const fileExist = fs.existsSync(sourcePath);
      // Read existing file content if it exists
      if (fileExist) {
        try {
          const fileData = fs.readFileSync(sourcePath, 'utf-8');
          existingContent = JSON.parse(fileData);
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

      // Merge new content with existing content
      const mergedContent = { ...existingContent, ...newContent };

      // Write to the file
      fs.writeFileSync(
        sourcePath,
        JSON.stringify(mergedContent, null, 2),
        'utf-8',
      );
    } catch (error: any) {
      throw new Error(`Error writing file ${sourcePath}: ${error.message}`);
    }
  }
}
