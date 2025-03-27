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

type DiffInput = Readonly<{
  source: {
    frontmatter: Record<string, string>;
    contentHashList: string[];
  };
  target?: {
    frontmatter: Record<string, string>;
    contentHashList: string[];
  };
  registry: {
    frontmatter: Record<string, string>;
    targetContentHashList: string[];
  };
}>;

type DiffResult = Readonly<{
  frontmatterKeysToTranslate: string[];
  contentKeysToTranslate: string[];
  updatedFrontmatterHashes: Record<string, string>;
  updatedContentHashList: string[];
}>;

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

function detectDiff(input: DiffInput): DiffResult {
  const { source, target, registry } = input;

  // If target file does not exist, all keys need to be translated
  if (!target) {
    return {
      contentKeysToTranslate: source.contentHashList,
      frontmatterKeysToTranslate: Object.keys(source.frontmatter),
      updatedContentHashList: [],
      updatedFrontmatterHashes: {},
    };
  }

  // Detect frontmatter changes
  const frontmatterKeysToTranslate = findMissingOrUpdatedFrontmatterKeys(
    source.frontmatter,
    target.frontmatter,
    registry.frontmatter,
  );

  // Detect content changes
  const contentKeysToTranslate = findMissingOrUpdatedContentKeys(
    source.contentHashList,
    target.contentHashList,
    registry.targetContentHashList,
  );

  const isSourceFrontmatterSubset = isSubset(
    Object.values(source.frontmatter).map(generateHash),
    Object.values(registry.frontmatter),
  );

  // If the source frontmatter is a subset of the registry frontmatter and no missing or updated keys
  // we will update the registry frontmatter with the source frontmatter
  // This is to ensure that the registry frontmatter is always up to date when a key is removed from the source frontmatter
  const updatedFrontmatterHashes =
    isSourceFrontmatterSubset &&
    frontmatterKeysToTranslate.length === 0 &&
    Object.keys(source.frontmatter).length <
      Object.keys(registry.frontmatter).length
      ? Object.keys(source.frontmatter).reduce(
          (acc, key) => {
            if (registry.frontmatter[key]) {
              acc[key] = registry.frontmatter[key];
            }
            return acc;
          },
          {} as Record<string, string>,
        )
      : {};

  const isSourceContentSubset = isSubset(
    source.contentHashList,
    registry.targetContentHashList,
  );

  // If the source hash list is a subset of the target registry hash list and but the hash list are not equal
  // Either because some content is removed or content order has been changed
  // We will update the target content
  if (
    isSourceContentSubset &&
    !areArraysEqual(source.contentHashList, registry.targetContentHashList)
  ) {
    return {
      contentKeysToTranslate: [],
      frontmatterKeysToTranslate: [],
      updatedContentHashList: source.contentHashList,
      updatedFrontmatterHashes,
    };
  }

  return {
    frontmatterKeysToTranslate,
    contentKeysToTranslate,
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
  const { content: sourceMDXContent, data: sourceFrontmatter } =
    matter(sourceContent);
  const sourceHashList = generateMDXContentHashList(sourceMDXContent);

  for (const target of file.targets) {
    const isFileExists = await fileExists(target.path);
    const targetContent = isFileExists ? await readFile(target.path) : null;

    const { content: targetMDXContent, data: targetFrontmatter } = targetContent
      ? matter(targetContent)
      : {
          data: {},
          content: '',
        };

    const diffInput: DiffInput = {
      source: {
        frontmatter: sourceFrontmatter,
        contentHashList: generateMDXContentHashList(sourceMDXContent),
      },
      target: targetContent
        ? {
            frontmatter: targetFrontmatter,
            contentHashList: generateMDXContentHashList(targetMDXContent),
          }
        : undefined,
      registry: {
        frontmatter: registryData.frontmatter,
        targetContentHashList:
          registryData.content.targets?.[target.locale] ?? [],
      },
    };
    const {
      contentKeysToTranslate,
      frontmatterKeysToTranslate,
      updatedContentHashList,
      updatedFrontmatterHashes,
    } = await detectDiff(diffInput);

    // Update the target MDX file if there is reorder or removal of content without content to translate
    if (updatedContentHashList.length > 0) {
      const updatedTargetMDXContent = buildTargetMDXContent(
        sourceMDXContent,
        targetMDXContent,
        registryData.content.targets[target.locale],
      );
      const updatedTargetFrontmatter = buildTargetMDXFrontmatter(
        sourceFrontmatter,
        targetFrontmatter,
      );

      const updatedTargetContent = matter.stringify(
        updatedTargetMDXContent,
        Object.keys(updatedFrontmatterHashes).length > 0
          ? updatedTargetFrontmatter
          : targetFrontmatter,
      );
      await writeFile(target.path, updatedTargetContent);
    }

    // Update the frontmatter if there is removal of frontmatter without frontmatter keys to translate
    if (Object.keys(updatedFrontmatterHashes).length > 0) {
      frontmatter = updatedFrontmatterHashes;
    }
    if (updatedContentHashList.length > 0) {
      mdxContentHashMap[target.locale] = updatedContentHashList;
    }
    result.frontmatter[target.locale] = frontmatterKeysToTranslate;
    result.content[target.locale] = contentKeysToTranslate;
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
  detectDiff,
};
