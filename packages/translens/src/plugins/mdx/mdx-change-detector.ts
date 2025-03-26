import matter from 'gray-matter';
import { MDXChangeDetector, Registry } from '../../core/types';
import { fileExists, readFile } from '../../lib/file-service';
import registryManager from '../registry-manager';
import { generateHash, generateMDXContentHashList } from '../lib';

export default function mdxChangeDetector(): MDXChangeDetector {
  const registry = registryManager();

  function isSubset(source: Array<string>, target: Array<string>) {
    const targetSet = new Set(target);
    return source.every((item) => targetSet.has(item));
  }

  return {
    async getMissingFrontmatterTranslationKeys(file) {
      const registryData = await registry.load(file.source.path);
      const registryFrontmatter = registryData?.frontmatter || {};

      const sourceContent = await readFile(file.source.path);
      const { data: sourceFrontmatter } = matter(sourceContent);
      const sourceFrontmatterKeys = Object.keys(sourceFrontmatter);
      const result: Record<Locale, Array<string>> = {};

      for (const target of file.targets) {
        const isFileExists = await fileExists(target.path);
        // If target file does not exist, all keys are missing
        if (!isFileExists) {
          result[target.locale] = sourceFrontmatterKeys;
        } else {
          const targetContent = await readFile(target.path);
          const { data: targetFrontmatter } = matter(targetContent);
          const missingKeys = sourceFrontmatterKeys.filter((key) => {
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
          result[target.locale] = missingKeys;
        }
      }

      return result;
    },
    async getMissingContentTranslationKeys(file) {
      const registryData = await registry.load(file.source.path);
      const registryFrontmatter =
        registryData?.content ||
        ({
          targets: {},
        } as Registry['content']);

      const sourceContent = await readFile(file.source.path);
      const { content: sourceMDXContent } = matter(sourceContent);
      const sourceHashList = generateMDXContentHashList(sourceMDXContent);

      const result: Record<Locale, Array<string>> = {};

      for (const target of file.targets) {
        const isFileExists = await fileExists(target.path);
        // If target file does not exist, all keys are missing
        if (!isFileExists) {
          result[target.locale] = sourceHashList;
        } else {
          const targetContent = await readFile(target.path);
          const { content: targetMDXContent } = matter(targetContent);
          const targetHashList = generateMDXContentHashList(targetMDXContent);
          const targetRegistryHashList =
            registryFrontmatter.targets?.[target.locale] || [];
          // If the target hash list is different from the registry hash list, all keys are missing
          if (targetHashList.length !== targetRegistryHashList.length) {
            result[target.locale] = sourceHashList;
          }

          // Find the keys that not present in the registry target hash list
          const missingKeys = sourceHashList.filter(
            (key) => !targetRegistryHashList.includes(key),
          );
          result[target.locale] = missingKeys;
        }
      }

      return result;
    },
    async preprocessChanges(file) {
      const registryData = await registry.load(file.source.path);
      const registryContent =
        registryData?.content ||
        ({
          targets: {},
        } as Registry['content']);
      let registryFrontmatter = registryData?.frontmatter || {};

      const sourceContent = await readFile(file.source.path);
      const { content: sourceMDXContent, data: sourceFrontmatter } =
        matter(sourceContent);
      const sourceHashList = generateMDXContentHashList(sourceMDXContent);

      const mdxContentHashMap: Record<Locale, Array<string>> = {};

      for (const target of file.targets) {
        const isFileExists = await fileExists(target.path);
        if (!isFileExists) {
          continue;
        }
        const targetContent = await readFile(target.path);
        const { content: targetMDXContent } = matter(targetContent);
        const targetHashList = generateMDXContentHashList(targetMDXContent);

        const targetRegistryHashList =
          registryContent.targets?.[target.locale] || [];

        const isSourceContentSubset = isSubset(
          targetRegistryHashList,
          sourceHashList,
        );

        // If the target hash list is different from the registry hash list, all keys are missing for translation, so we don't need to preprocess
        if (targetHashList.length !== targetRegistryHashList.length) {
          continue;
        }
        // If the source hash list is a subset of the target registry hash list, we will update the registry hash list with the source hash list
        if (isSourceContentSubset) {
          mdxContentHashMap[target.locale] = sourceHashList;
        }
      }

      const isSourceFrontmatterSubset = isSubset(
        Object.keys(sourceFrontmatter),
        Object.keys(registryFrontmatter),
      );

      let updatedFrontmatter: Record<string, string> = {};
      // If the source frontmatter is a subset of the registry frontmatter, we will update the registry frontmatter with the source frontmatter
      if (isSourceFrontmatterSubset) {
        Object.keys(sourceFrontmatter).forEach((key) => {
          updatedFrontmatter[key] = registryFrontmatter[key];
        });
      } else {
        updatedFrontmatter = registryFrontmatter;
      }
      const updatedRegistry = {
        frontmatter: updatedFrontmatter,
        content: {
          source: {
            locale: file.source.locale,
            hashes: sourceHashList,
          },
          targets: {
            ...registryContent.targets,
            ...mdxContentHashMap,
          },
        },
      };

      await registry.save(file.source.path, updatedRegistry);
    },
  };
}
