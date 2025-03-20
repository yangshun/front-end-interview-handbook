import {
  Plugin,
  TranslationFileMetadata,
  TranslationStringArg,
  TranslationStringMetadata,
} from '../core/types';
import jsonChangeDetector from './json-change-detector';
import {
  ensureFileAndDirExists,
  readFile,
  writeFile,
} from '../lib/file-service';

/**
 * Returns a unique key for a given file path and locale.
 */
export function hashFilePathLocale(filePath: string, locale: string): string {
  return `${filePath}#${locale}`;
}

/**
 * Builds a map of target file hash keys to their new translation content.
 */
export function buildTargetedContentMap(
  translatedStrings: ReadonlyArray<TranslationStringMetadata>,
): Map<string, Record<string, string>> {
  const targetedContentMap = new Map<string, Record<string, string>>();
  for (const translatedString of translatedStrings) {
    for (const target of translatedString.targets) {
      const targetPath = hashFilePathLocale(
        translatedString.filePath,
        target.locale,
      );
      if (!targetedContentMap.has(targetPath)) {
        targetedContentMap.set(targetPath, {});
      }
      const translationEntry = targetedContentMap.get(targetPath)!;
      translationEntry[translatedString.id] = target.string;
    }
  }
  return targetedContentMap;
}

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

        const sourceContent = await readFile(file.source.path);
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
    /**
     * Write translated strings back to filesystem. For each target file it:
     *  - Removes keys that have been removed from the source.
     *  - Merges in new translations.
     *  - Writes the updated JSON back to the file.
     */
    async translationComplete(translatedStrings) {
      // Build a map of target file hash (using file path and locale) to its translation content.
      const targetedContentMap = buildTargetedContentMap(translatedStrings);

      // TODO: Handle concurrent file write operations and add concurrency limit
      // TODO: Handle incremental translation of translated string.
      // Process each file concurrently to update its target files.
      await Promise.all(
        files.map(async (file) => {
          // Get keys that have been removed from the source file.
          const removedKeysFromSource =
            await detector.getRemovedTranslationKeys(file);

          // Read and parse the source JSON file.
          const sourceContent = await readFile(file.source.path);
          const sourceJson = JSON.parse(sourceContent);
          const sourceKeys = Object.keys(sourceJson);
          const sourceItem = sourceJson[sourceKeys[0]];
          const hasDescription =
            typeof sourceItem === 'object' && 'description' in sourceItem;

          // Process each target for the current file concurrently.
          await Promise.all(
            file.targets.map(async (target) => {
              // Ensure target file and its directory exist.
              await ensureFileAndDirExists(target.path);

              // Read and parse the target JSON file.
              const targetContent = await readFile(target.path);
              const targetJson = JSON.parse(targetContent);

              // Remove keys that no longer exist in the source file.
              const removedKeys = removedKeysFromSource[target.locale];
              removedKeys.forEach((key) => {
                delete targetJson[key];
              });

              // Merge in the new translations from the targeted content map.
              const targetHash = hashFilePathLocale(
                file.source.path,
                target.locale,
              );
              const translatedContent =
                targetedContentMap.get(targetHash) || {};
              Object.keys(translatedContent).forEach((key) => {
                targetJson[key] = hasDescription
                  ? {
                      defaultMessage: translatedContent[key],
                      description: sourceJson[key]?.description ?? '',
                    }
                  : translatedContent[key];
              });

              // Sort the keys of targetJson before writing to the file
              const sortedTargetJson = Object.keys(targetJson)
                .sort()
                .reduce(
                  (acc, key) => {
                    acc[key] = targetJson[key];
                    return acc;
                  },
                  {} as Record<string, unknown>,
                );

              // Write the updated JSON back to the target file.
              await writeFile(
                target.path,
                JSON.stringify(sortedTargetJson, null, 2),
              );
            }),
          );
        }),
      );
    },
  };
}
