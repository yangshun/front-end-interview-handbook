import { IFileHandler } from '../interfaces';
import BaseFileHandler from '../core/BaseFileHandler';

export class JsonHandler extends BaseFileHandler implements IFileHandler {
  /**
   * Extract the translatable content in the desired format for translation
   */
  extractTranslatableContent(content: any) {
    return JSON.parse(content);
  }

  /**
   * Rebuild new content with the translated content to write to the translation file
   */
  rebuildContent(
    originalContent: any,
    translatedContent: Record<string, string>,
    removedKeys: string[],
  ) {
    const existingContent = originalContent ? JSON.parse(originalContent) : {};
    // Remove keys that were removed from the base file
    for (const key of removedKeys) {
      delete existingContent[key];
    }
    // Merge new content with existing content
    return { ...existingContent, ...translatedContent };
  }
}
