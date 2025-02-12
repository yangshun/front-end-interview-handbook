import { BaseFileHandler } from '@gfe/translens';

export default class TranslensLocaleFileTransformer extends BaseFileHandler {
  extractTranslatableContent(content) {
    const fileContent = JSON.parse(content);

    return Object.fromEntries(
      Object.entries(fileContent).map(([key, value]) => [
        key,
        value.defaultMessage,
      ]),
    );
  }
  rebuildContent(baseContent, originalContent, translatedContent, removedKeys) {
    const parsedBaseContent = baseContent ? JSON.parse(baseContent) : {};
    const existingContent = originalContent ? JSON.parse(originalContent) : {};

    // Remove keys that were removed from the base file
    for (const key of removedKeys) {
      delete existingContent[key];
    }

    const transformedTranslatedContent = Object.fromEntries(
      Object.entries(translatedContent).map(([key, value]) => [
        key,
        {
          defaultMessage: value,
          description: parsedBaseContent[key].description,
        },
      ]),
    );

    // Merge new content with existing content
    const finalContent = {
      ...existingContent,
      ...transformedTranslatedContent,
    };

    return JSON.stringify(finalContent, null, 2);
  }
}
