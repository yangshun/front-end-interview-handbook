import grayMatter from 'gray-matter';

import type {
  Registry,
  TranslationFileItem,
  TranslationFileMetadata,
} from '../../core/types';
import { fileExists, readFile, writeFile } from '../../lib/file-service';
import {
  buildTargetMDXContent,
  buildTargetMDXFrontmatter,
  generateHash,
  generateMDXContentHashList,
  getFrontmatterWithoutExcludedKeys,
} from '../../lib/mdx-file';
import registryManager from '../registry-manager';
import type { PluginOptions } from './mdx-plugin';

type DiffResult = Readonly<{
  isReorderOrRemoval: boolean;
  keysToTranslate: ReadonlyArray<string>;
}>;

function isSubset(
  source: ReadonlyArray<string>,
  target: ReadonlyArray<string>,
) {
  const targetSet = new Set(target);

  return source.every((item) => targetSet.has(item));
}

function areArraysEqual(
  arr1: ReadonlyArray<string>,
  arr2: ReadonlyArray<string>,
): boolean {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
}

function findMissingOrUpdatedFrontmatterKeys(
  sourceFrontmatter: Record<string, string>,
  targetFrontmatter: Record<string, string>,
  registryFrontmatter: Record<string, string>,
): ReadonlyArray<string> {
  return Object.keys(sourceFrontmatter).filter((key) => {
    // If key is not present in target frontmatter, it needs translation
    if (!(key in targetFrontmatter)) {return true;}

    const sourceHash = generateHash(sourceFrontmatter[key]);

    // If hash value is different, it needs translation
    return sourceHash !== registryFrontmatter[key];
  });
}

function findFrontmatterExcludedKeysToUpdate(
  excludeKeys: ReadonlyArray<string>,
  sourceFrontmatter: Record<string, string>,
  targetFrontmatter: Record<string, string>,
): ReadonlyArray<string> {
  return excludeKeys.filter(
    (key) =>
      (key in targetFrontmatter && !(key in sourceFrontmatter)) ||
      (!(key in targetFrontmatter) && key in sourceFrontmatter) ||
      sourceFrontmatter[key] !== targetFrontmatter[key],
  );
}

function detectFrontmatterDiff(
  sourceFrontmatter: Record<string, string>,
  targetFrontmatter: Record<string, string> | undefined,
  registryFrontmatter: Record<string, string>,
): DiffResult {
  const effectiveTarget = targetFrontmatter || {};
  const keysToTranslate = findMissingOrUpdatedFrontmatterKeys(
    sourceFrontmatter,
    effectiveTarget,
    registryFrontmatter,
  );

  const sourceHashes = Object.values(sourceFrontmatter).map(generateHash);
  const registryHashes = Object.values(registryFrontmatter);
  const isSourceSubset = isSubset(sourceHashes, registryHashes);

  const isReorderOrRemoval =
    isSourceSubset &&
    keysToTranslate.length === 0 &&
    Object.keys(sourceFrontmatter).length <
      Object.keys(registryFrontmatter).length;

  return { isReorderOrRemoval, keysToTranslate };
}

function findMissingOrUpdatedContentKeys(
  sourceHashList: ReadonlyArray<string>,
  targetHashList: ReadonlyArray<string>,
  registryTargetHashList: ReadonlyArray<string>,
): ReadonlyArray<string> {
  // If the target hash list is different from the registry hash list, all keys need to be translated
  if (targetHashList.length !== registryTargetHashList.length) {
    return sourceHashList;
  }

  return sourceHashList.filter((key) => !registryTargetHashList.includes(key));
}

function detectContentDiff(
  sourceHashList: ReadonlyArray<string>,
  targetHashList: ReadonlyArray<string> | undefined,
  registryHashList: ReadonlyArray<string>,
): DiffResult {
  const effectiveTarget = targetHashList || [];
  const keysToTranslate = targetHashList
    ? findMissingOrUpdatedContentKeys(
        sourceHashList,
        effectiveTarget,
        registryHashList,
      )
    : sourceHashList;

  if (keysToTranslate.length > 0) {
    return { isReorderOrRemoval: false, keysToTranslate };
  }

  const isSourceSubset = isSubset(sourceHashList, registryHashList);
  const isReorderOrRemoval =
    isSourceSubset && !areArraysEqual(sourceHashList, registryHashList);

  return { isReorderOrRemoval, keysToTranslate };
}

export async function processFileForChanges(
  file: TranslationFileMetadata,
  options?: PluginOptions,
): Promise<{
  content: Record<Locale, ReadonlyArray<string>>;
  frontmatter: Record<Locale, ReadonlyArray<string>>;
}> {
  const { frontmatterExcludedKeys } = options || {};
  const registry = registryManager();
  const registryData = await registry.load(file.source.path);

  const result: {
    content: Record<Locale, ReadonlyArray<string>>;
    frontmatter: Record<Locale, ReadonlyArray<string>>;
  } = { content: {}, frontmatter: {} };

  const registryUpdatedMDXContent: Record<Locale, Array<string>> = {};
  let registryUpdatedFrontmatter: Record<string, string> | null = null;

  const sourceContent = await readFile(file.source.path);
  const { content: sourceMDXContent, data: sourceFrontmatter } =
    grayMatter(sourceContent);
  const sourceHashList = generateMDXContentHashList(sourceMDXContent);
  const cleanSourceFrontmatter =
    frontmatterExcludedKeys && frontmatterExcludedKeys?.length > 0
      ? getFrontmatterWithoutExcludedKeys(
          sourceFrontmatter,
          frontmatterExcludedKeys,
        )
      : sourceFrontmatter;

  await Promise.all(
    file.targets.map(async (target) => {
      {
        const targetExists = await fileExists(target.path);
        const targetContent = targetExists ? await readFile(target.path) : null;

        const { content: targetMDXContent, data: targetFrontmatter } =
          targetContent ? grayMatter(targetContent) : { content: '', data: {} };

        const contentDiff = detectContentDiff(
          sourceHashList,
          targetExists
            ? generateMDXContentHashList(targetMDXContent)
            : undefined,
          registryData.content.targets?.[target.locale] || [],
        );

        const frontmatterDiff = detectFrontmatterDiff(
          cleanSourceFrontmatter,
          targetFrontmatter,
          registryData.frontmatter,
        );

        await rebuildTargetContent({
          contentDiff,
          frontmatterDiff,
          frontmatterExcludedKeys,
          registryData,
          sourceFrontmatter,
          sourceMDXContent,
          target,
          targetFrontmatter,
          targetMDXContent,
        });

        // Update registry state
        if (frontmatterDiff.isReorderOrRemoval) {
          registryUpdatedFrontmatter = Object.keys(
            cleanSourceFrontmatter,
          ).reduce(
            (acc, key) => {
              if (registryData.frontmatter[key])
                {acc[key] = registryData.frontmatter[key];}

              return acc;
            },
            {} as Record<string, string>,
          );
        }

        if (contentDiff.isReorderOrRemoval) {
          registryUpdatedMDXContent[target.locale] = sourceHashList;
        }

        result.frontmatter[target.locale] = frontmatterDiff.keysToTranslate;
        result.content[target.locale] = contentDiff.keysToTranslate;
      }
    }),
  );

  if (
    registryUpdatedFrontmatter ||
    Object.keys(registryUpdatedMDXContent).length > 0
  ) {
    await registry.save(file.source.path, {
      content: {
        source: {
          ...registryData.content.source,
          hashes:
            Object.keys(registryUpdatedMDXContent).length > 0
              ? sourceHashList
              : registryData.content.source.hashes,
        },
        targets: {
          ...registryData.content.targets,
          ...registryUpdatedMDXContent,
        },
      },
      frontmatter: registryUpdatedFrontmatter || registryData.frontmatter,
    });
  }

  return result;
}

/**
 * Updates the target MDX file when certain conditions are met:
 * 1. Content removal or reorder without new translation keys
 * 2. Frontmatter removals without translation keys
 * 3. Changes to excluded frontmatter keys.
 */
async function rebuildTargetContent({
  contentDiff,
  frontmatterDiff,
  frontmatterExcludedKeys,
  registryData,
  sourceFrontmatter,
  sourceMDXContent,
  target,
  targetFrontmatter,
  targetMDXContent,
}: {
  contentDiff: DiffResult;
  frontmatterDiff: DiffResult;
  frontmatterExcludedKeys?: ReadonlyArray<string>;
  registryData: Registry;
  sourceFrontmatter: Record<string, string>;
  sourceMDXContent: string;
  target: TranslationFileItem;
  targetFrontmatter: Record<string, string>;
  targetMDXContent: string;
}) {
  const excludedFrontmatterKeysToUpdate = findFrontmatterExcludedKeysToUpdate(
    frontmatterExcludedKeys ?? [],
    sourceFrontmatter,
    targetFrontmatter,
  );

  const needsRebuild =
    frontmatterDiff.isReorderOrRemoval ||
    contentDiff.isReorderOrRemoval ||
    excludedFrontmatterKeysToUpdate.length > 0;

  if (!needsRebuild) {return;}

  // Rebuild content
  const updatedTargetMDXContent = contentDiff.isReorderOrRemoval
    ? buildTargetMDXContent(
        sourceMDXContent,
        targetMDXContent,
        registryData.content.targets[target.locale],
      )
    : targetMDXContent;

  // Rebuild frontmatter
  const updatedTargetFrontmatter =
    frontmatterDiff.isReorderOrRemoval ||
    excludedFrontmatterKeysToUpdate.length > 0
      ? buildTargetMDXFrontmatter(
          sourceFrontmatter,
          targetFrontmatter,
          {},
          frontmatterExcludedKeys,
        )
      : targetFrontmatter;

  const updatedTargetContent = grayMatter.stringify(
    updatedTargetMDXContent,
    updatedTargetFrontmatter,
  );

  await writeFile(target.path, updatedTargetContent);
}

// Test exports
export const __test__ = {
  areArraysEqual,
  detectContentDiff,
  detectFrontmatterDiff,
  findFrontmatterExcludedKeysToUpdate,
  findMissingOrUpdatedContentKeys,
  findMissingOrUpdatedFrontmatterKeys,
  isSubset,
};
