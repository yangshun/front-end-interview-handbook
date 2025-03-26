import matter from 'gray-matter';
import { MDXChangeDetector, Registry } from '../../core/types';
import { fileExists, readFile } from '../../lib/file-service';
import registryManager from '../registry-manager';
import { generateHash, generateMDXContentHashList } from '../lib';

export default function mdxChangeDetector(): MDXChangeDetector {
  const registry = registryManager();
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
  };
}
