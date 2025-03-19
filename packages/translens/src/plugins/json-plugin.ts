import fs from 'fs/promises';
import {
  Plugin,
  TranslationFileMetadata,
  TranslationStringArg,
} from '../core/types';
import jsonChangeDetector from './json-change-detector';

export default function JsonPlugin(): Plugin {
  const files: Array<TranslationFileMetadata> = [];
  const detector = jsonChangeDetector();

  return {
    identifier: 'json',
    async trackFiles(filesMetadata) {
      // Start tracking files
      files.push(...filesMetadata);
    },
    async getTranslationStrings() {
      // Load files and determine which strings need to be translated
      const translationStrings: Array<TranslationStringArg> = [];

      for (const file of files) {
        // Run the change detector to get missing keys for each target locale
        const missingKeysByTarget =
          await detector.getMissingTranslationKeys(file);

        const sourceContent = await fs.readFile(file.source.path, 'utf8');
        const sourceJson = JSON.parse(sourceContent);

        for (const key of Object.keys(sourceJson)) {
          // Build an array of target locales that are missing this key
          const missingInTargets = file.targets
            .filter((target) => {
              const missingKeys = missingKeysByTarget[target.locale];
              return missingKeys && missingKeys.includes(key);
            })
            .map((target) => target.locale);

          if (missingInTargets.length > 0) {
            translationStrings.push({
              id: key,
              filePath: file.source.path,
              source: {
                string:
                  typeof sourceJson[key] === 'object' &&
                  'defaultMessage' in sourceJson[key]
                    ? sourceJson[key].defaultMessage
                    : sourceJson[key],
                description:
                  typeof sourceJson[key] === 'object' &&
                  'description' in sourceJson[key]
                    ? sourceJson[key].description
                    : '',
                locale: file.source.locale,
              },
              targets: missingInTargets,
            });
          }
        }
      }
      return translationStrings;
    },
    async translationComplete(translatedStrings) {
      // Write translated strings back to filesystem
      console.dir(translatedStrings, { depth: null });
    },
  };
}
