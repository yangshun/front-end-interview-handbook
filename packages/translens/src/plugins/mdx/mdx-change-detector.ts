import matter from 'gray-matter';
import {
  Registry,
  TranslationFileItem,
  TranslationFileMetadata,
} from '../../core/types';
import { fileExists, readFile, writeFile } from '../../lib/file-service';
import registryManager from '../registry-manager';
import {
  buildTargetMDXContent,
  buildTargetMDXFrontmatter,
  generateHash,
  generateMDXContentHashList,
} from '../../lib/mdx-file';

function isSubset(source: Array<string>, target: Array<string>) {
  const targetSet = new Set(target);
  return source.every((item) => targetSet.has(item));
}

function areArraysEqual(arr1: string[], arr2: string[]): boolean {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
}

function findMissingOrUpdatedFrontmatterKeys(
  sourceFrontmatter: Record<string, string>,
  targetFrontmatter: Record<string, string>,
  registryFrontmatter: Record<string, string>,
): Array<string> {
  const sourceFrontmatterKeys = Object.keys(sourceFrontmatter);
  return sourceFrontmatterKeys.filter((key) => {
    // If key is not present in target frontmatter, it is missing
    if (!(key in targetFrontmatter)) {
      return true;
    }
    const sourceHashValue = generateHash(sourceFrontmatter[key]);
    const registryHashValue = registryFrontmatter[key];
    // If hash value is different, it is missing
    if (sourceHashValue !== registryHashValue) {
      return true;
    }
    return false;
  });
}

function findMissingOrUpdatedContentKeys(
  sourceHashList: Array<string>,
  targetHashList: Array<string>,
  registryTargetHashList: Array<string>,
): Array<string> {
  // If the target hash list is different from the registry hash list, all keys need to be translated
  if (targetHashList.length !== registryTargetHashList.length) {
    return sourceHashList;
  }
  return sourceHashList.filter((key) => !registryTargetHashList.includes(key));
}

async function detectFileDiff(
  sourceContent: string,
  target: TranslationFileItem,
  registryData: Registry,
  locale: Locale,
): Promise<
  Readonly<{
    contentKeysForTranslation: Array<string>;
    frontmatterKeysForTranslation: Array<string>;
    updatedContentHashList: Array<string>;
    updatedFrontmatterHashes: Record<string, string>;
  }>
> {
  const { content: sourceMDXContent, data: sourceFrontmatter } =
    matter(sourceContent);
  const sourceHashList = generateMDXContentHashList(sourceMDXContent);
  const { frontmatter: registryFrontmatter, content: registryContent } =
    registryData;

  const isFileExists = await fileExists(target.path);

  // If target file does not exist, all keys need to be translated
  if (!isFileExists) {
    return {
      contentKeysForTranslation: sourceHashList,
      frontmatterKeysForTranslation: Object.keys(sourceFrontmatter),
      updatedContentHashList: [],
      updatedFrontmatterHashes: {},
    };
  }

  const targetContent = await readFile(target.path);
  const { content: targetMDXContent, data: targetFrontmatter } =
    matter(targetContent);
  const registryTargetHashList = registryContent.targets?.[locale] || [];
  const targetHashList = generateMDXContentHashList(targetMDXContent);
  const missingOrUpdatedFrontmatterKeys = findMissingOrUpdatedFrontmatterKeys(
    sourceFrontmatter,
    targetFrontmatter,
    registryFrontmatter,
  );

  const isSourceFrontmatterSubset = isSubset(
    Object.values(sourceFrontmatter).map(generateHash),
    Object.values(registryFrontmatter),
  );

  // If the source frontmatter is a subset of the registry frontmatter and no missing or updated keys
  // we will update the registry frontmatter with the source frontmatter
  // This is to ensure that the registry frontmatter is always up to date when a key is removed from the source frontmatter
  const updatedFrontmatterHashes =
    isSourceFrontmatterSubset &&
    missingOrUpdatedFrontmatterKeys.length === 0 &&
    Object.keys(sourceFrontmatter).length <
      Object.keys(registryFrontmatter).length
      ? Object.keys(sourceFrontmatter).reduce(
          (acc, key) => {
            if (registryFrontmatter[key]) acc[key] = registryFrontmatter[key];
            return acc;
          },
          {} as Record<string, string>,
        )
      : {};

  const isSourceContentSubset = isSubset(
    sourceHashList,
    registryTargetHashList,
  );

  // If the source hash list is a subset of the target registry hash list and but the hash list are not equal
  // Either because some content is removed or content order has been changed
  // We will update the target content
  if (
    isSourceContentSubset &&
    !areArraysEqual(sourceHashList, registryTargetHashList)
  ) {
    const updatedTargetMDXContent = buildTargetMDXContent(
      sourceMDXContent,
      targetMDXContent,
      registryTargetHashList,
    );
    const updatedTargetFrontmatter = buildTargetMDXFrontmatter(
      sourceFrontmatter,
      targetFrontmatter,
    );

    const updatedTargetFileContent = matter.stringify(
      updatedTargetMDXContent,
      Object.keys(updatedFrontmatterHashes).length > 0
        ? updatedTargetFrontmatter
        : targetFrontmatter,
    );

    await writeFile(target.path, updatedTargetFileContent);

    return {
      contentKeysForTranslation: [],
      frontmatterKeysForTranslation: [],
      updatedContentHashList: sourceHashList,
      updatedFrontmatterHashes,
    };
  }

  return {
    contentKeysForTranslation: findMissingOrUpdatedContentKeys(
      sourceHashList,
      targetHashList,
      registryTargetHashList,
    ),
    frontmatterKeysForTranslation: missingOrUpdatedFrontmatterKeys,
    updatedFrontmatterHashes,
    updatedContentHashList: [],
  };
}

export async function processFileForChanges(
  file: TranslationFileMetadata,
): Promise<
  Readonly<{
    frontmatter: Record<Locale, Array<string>>;
    content: Record<Locale, Array<string>>;
  }>
> {
  const registry = registryManager();
  const registryData = await registry.load(file.source.path);

  const result: {
    frontmatter: Record<Locale, Array<string>>;
    content: Record<Locale, Array<string>>;
  } = {
    frontmatter: {},
    content: {},
  };
  const mdxContentHashMap: Record<Locale, Array<string>> = {};
  let frontmatter: Record<string, string> = {};

  const sourceContent = await readFile(file.source.path);
  const { content: sourceMDXContent } = matter(sourceContent);
  const sourceHashList = generateMDXContentHashList(sourceMDXContent);

  for (const target of file.targets) {
    const {
      contentKeysForTranslation,
      frontmatterKeysForTranslation,
      updatedContentHashList,
      updatedFrontmatterHashes,
    } = await detectFileDiff(
      sourceContent,
      target,
      registryData,
      target.locale,
    );

    if (Object.keys(updatedFrontmatterHashes).length > 0) {
      frontmatter = updatedFrontmatterHashes;
    }
    if (updatedContentHashList.length > 0) {
      mdxContentHashMap[target.locale] = updatedContentHashList;
    }
    result.frontmatter[target.locale] = frontmatterKeysForTranslation;
    result.content[target.locale] = contentKeysForTranslation;
  }

  // Update the registry with the updated frontmatter and content hash list
  // in case of removal of content or reorder of content without content update for translation
  if (
    Object.keys(frontmatter).length > 0 ||
    Object.keys(mdxContentHashMap).length > 0
  ) {
    const updatedRegistry = {
      frontmatter:
        Object.keys(frontmatter).length > 0
          ? frontmatter
          : registryData.frontmatter,
      content: {
        source: {
          locale: file.source.locale,
          hashes:
            Object.keys(mdxContentHashMap).length > 0
              ? sourceHashList
              : registryData.content.source.hashes,
        },
        targets: {
          ...registryData.content.targets,
          ...mdxContentHashMap,
        },
      },
    };

    await registry.save(file.source.path, updatedRegistry);
  }

  return result;
}

// Only export for testing
export const __test__ = {
  isSubset,
  areArraysEqual,
  findMissingOrUpdatedFrontmatterKeys,
  findMissingOrUpdatedContentKeys,
  detectFileDiff,
};
