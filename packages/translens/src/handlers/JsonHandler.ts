import fs from 'fs';
import path from 'path';
import { log } from '@clack/prompts';
import { IConfigFile, IFileHandler } from '../interfaces';

export class JsonHandler implements IFileHandler {
  /**
   * Translate a JSON file to multiple locales
   */
  async translate(file: IConfigFile, targetLocale: string): Promise<void> {
    const { source, target } = file;
    const fileContent = await this.readFileContent(source);

    // Translate the file
    await this.writeFile(target, fileContent);
  }

  /**
   * Read and parse JSON file content
   */
  private async readFileContent(filePath: string): Promise<object> {
    try {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch (error: any) {
      throw new Error(`Error reading file: ${error.message}`);
    }
  }

  /**
   * Write content to a JSON file
   */
  private async writeFile(filePath: string, newContent: object): Promise<void> {
    try {
      let existingContent: object = {};

      // Check if the file exists
      const fileExist = fs.existsSync(filePath);
      // Read existing file content if it exists
      if (fileExist) {
        try {
          const fileData = fs.readFileSync(filePath, 'utf-8');
          existingContent = JSON.parse(fileData);
        } catch (error) {
          log.warn(
            `⚠ Could not read existing file ${filePath}. Creating a new one.`,
          );
        }
      } else {
        log.info(`📄 Creating new file: ${filePath}`);
      }

      // Ensure the directory exists
      const directoryPath = path.dirname(filePath);
      if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true }); // Create the directory if it doesn't exist
      }

      // Merge new content with existing content
      const mergedContent = { ...existingContent, ...newContent };

      // Write to the file
      fs.writeFileSync(
        filePath,
        JSON.stringify(mergedContent, null, 2),
        'utf-8',
      );
      log.success(
        fileExist
          ? `✅ File updated: ${filePath}`
          : `✅ File created: ${filePath}`,
      );
    } catch (error: any) {
      throw new Error(`Error writing file ${filePath}: ${error.message}`);
    }
  }
}
