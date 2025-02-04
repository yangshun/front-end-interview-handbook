import fs from 'fs';
import path from 'path';
import { spinner, log } from '@clack/prompts';
import { IConfig, IFileHandler } from '../interfaces';

export class JsonHandler implements IFileHandler {
  constructor(private config: IConfig) {}

  /**
   * Translate a JSON file to multiple locales
   */
  async translate(filePath: string, locales: string[]): Promise<void> {
    const s = spinner();
    s.start(
      `Translating ${path.basename(filePath)} for locales: ${locales.join(', ')}`,
    );

    try {
      const fileContent = await this.readFileContent(filePath);

      // Translate all locales
      await Promise.all(
        locales
          .filter((locale) => locale !== this.config.source)
          .map(async (locale) => {
            const { dir, name, ext } = path.parse(filePath);
            const outputPath = path.join(dir, `${locale}${ext}`);

            await this.writeFile(outputPath, fileContent);
          }),
      );

      s.stop('🚀 Translation completed!');
    } catch (error: any) {
      s.stop();
      log.error(`❌ Error translating file ${filePath}: ${error.message}`);
    }
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

      // Read existing file content if it exists
      if (fs.existsSync(filePath)) {
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

      // Merge new content with existing content
      const mergedContent = { ...existingContent, ...newContent };

      // Write to file
      fs.writeFileSync(
        filePath,
        JSON.stringify(mergedContent, null, 2),
        'utf-8',
      );
      log.success(`✅ File updated: ${filePath}`);
    } catch (error: any) {
      throw new Error(`Error writing file ${filePath}: ${error.message}`);
    }
  }
}
