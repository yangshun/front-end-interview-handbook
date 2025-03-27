import {
  TranslationStringArg,
  TranslationFileMetadata,
  TranslationStringMetadata,
} from '../core/types';

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
        translatedString.batch,
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

export function buildTranslationStrings(
  content: Record<string, string>,
  changes: Record<Locale, Array<string>>,
  file: TranslationFileMetadata,
): Array<TranslationStringArg> {
  const translationStrings: Array<TranslationStringArg> = [];

  for (const key of Object.keys(content)) {
    const missingInTargets = file.targets
      .filter((target) => {
        const missingKeys = changes[target.locale];
        return missingKeys && missingKeys.includes(key);
      })
      .map((target) => target.locale);

    if (missingInTargets.length > 0) {
      translationStrings.push({
        id: key,
        batch: file.source.path,
        source: {
          string: content[key],
          locale: file.source.locale,
        },
        targets: missingInTargets,
      });
    }
  }

  return translationStrings;
}
