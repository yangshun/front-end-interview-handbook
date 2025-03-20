import { TranslationStringMetadata } from '../core/types';
import murmur from 'murmurhash';

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

export function generateHash(content: string): string {
  return murmur.v3(content).toString(16);
}
