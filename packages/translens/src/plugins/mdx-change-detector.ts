import matter from 'gray-matter';
import { MDXChangeDetector } from '../core/types';
import { fileExists, readFile } from '../lib/file-service';
import registryManager from './registry-manager';
import { generateHash } from './lib';

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
    async getRemovedFrontmatterTranslationKeys(sourceFilePath){
        const registryData = await registry.load(sourceFilePath);
        const registryFrontmatter = registryData?.frontmatter || {};
        const registryFrontmatterKeys = Object.keys(registryFrontmatter);

        const sourceContent = await readFile(sourceFilePath);
        const { data: sourceFrontmatter } = matter(sourceContent);
        const sourceFrontmatterKeys = Object.keys(sourceFrontmatter);

        return registryFrontmatterKeys.filter((key) => !sourceFrontmatterKeys.includes(key));
    }
  };
}
