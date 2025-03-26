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

export function generateMDXContentSegments(content: String) {
  return content
    .split(/\n\s*\n/)
    .map((para) => para.trim())
    .filter(Boolean);
}

/**
 * Generates a map of hash values for each content segment
 */
export function generateSourceMDXContentHashMap(content: string) {
  const segments = generateMDXContentSegments(content);
  return segments.reduce(
    (acc, segment) => {
      const hashValue = generateHash(segment);
      acc[hashValue] = segment;
      return acc;
    },
    {} as Record<string, string>,
  );
}

/**
 * Generates a list of hash values for each content segment
 */
export function generateMDXContentHashList(content: string) {
  const segments = generateMDXContentSegments(content);
  return segments.map((segment) => generateHash(segment));
}

export function buildTargetMDXContent(
  sourceMDXContent: string,
  targetMDXContent: string,
  translatedContentMap: Record<string, string>,
  registryTargetHashList: Array<string>,
) {
  const sourceHashList = generateMDXContentHashList(sourceMDXContent);
  const targetHashList = generateMDXContentHashList(targetMDXContent);
  const targetContentSegments = generateMDXContentSegments(targetMDXContent);
  const targetHashMap =
    registryTargetHashList.length !== targetHashList.length
      ? {}
      : registryTargetHashList.reduce(
          (acc, hash, index) => {
            acc[hash] = targetContentSegments[index];
            return acc;
          },
          {} as Record<string, string>,
        );

  const newContent = sourceHashList.map((hash) => {
    if (targetHashMap[hash]) {
      return targetHashMap[hash];
    }
    return translatedContentMap[hash] || '';
  });

  return newContent.join('\n\n');
}
