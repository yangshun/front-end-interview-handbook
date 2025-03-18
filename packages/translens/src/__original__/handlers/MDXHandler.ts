import { IFileHandler } from '../interfaces';
import BaseFileHandler from '../core/BaseFileHandler';
import matter from 'gray-matter';

export class MDXHandler extends BaseFileHandler implements IFileHandler {
  /**
   * Extract the translatable content in the desired format for translation
   */
  async extractTranslatableContent(content: string) {
    const { content: mdxContent, data } = matter(content);
    const frontmatter = this.flattenFrontmatter(data);
    return {
      ...frontmatter,
      mdxBody: mdxContent,
    };
  }

  /**
   * Rebuild new content with the translated content to write to the translation file
   */
  async rebuildContent(
    originalContent: string,
    baseContent: string,
    translatedContent: Record<string, string>,
    removedKeys: string[],
  ) {
    const { data } = originalContent ? matter(originalContent) : {};
    const originalFrontmatter = data || {};
    // Remove keys that were removed from the base file
    for (const key of removedKeys) {
      delete originalFrontmatter[key];
    }

    const translatedFrontmatter = { ...translatedContent };
    delete translatedFrontmatter['mdxBody'];
    // Convert flat frontmatter back to original structure
    const frontmatter = this.unflattenFrontmatter(translatedFrontmatter);

    // Combine frontmatter and content using gray-matter
    const fileContent = matter.stringify(translatedContent.mdxBody, {
      ...originalFrontmatter,
      ...frontmatter,
    });

    // Merge new content with existing content
    return fileContent;
  }
  private flattenFrontmatter(
    obj: Record<string, unknown>,
    prefix = '',
  ): Record<string, string> {
    const flattened: Record<string, string> = {};

    for (const [key, value] of Object.entries(obj)) {
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (value && typeof value === 'object' && !Array.isArray(value)) {
        Object.assign(
          flattened,
          this.flattenFrontmatter(value as Record<string, unknown>, newKey),
        );
      } else {
        flattened[newKey] = String(value);
      }
    }

    return flattened;
  }

  private unflattenFrontmatter(
    flat: Record<string, string>,
  ): Record<string, unknown> {
    const result: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(flat)) {
      const parts = key.split('.');
      let current = result;

      for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        if (!(part in current)) {
          current[part] = {};
        }
        current = current[part] as Record<string, unknown>;
      }

      current[parts[parts.length - 1]] = value;
    }

    return result;
  }
}
