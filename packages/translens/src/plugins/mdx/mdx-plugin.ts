import matter from 'gray-matter';
import {
  Plugin,
  TranslationFileMetadata,
  TranslationStringArg,
} from '../../core/types';
import {
  ensureFileAndDirExists,
  readFile,
  writeFile,
} from '../../lib/file-service';
import {
  buildTargetMDX,
  generateSourceMDXContentHashMap,
} from '../../lib/mdx-file';
import registryManager from '../registry-manager';
import {
  buildTranslatedContentMap,
  buildTranslationStrings,
} from '../../lib/plugins';
import { processFileForChanges } from './mdx-change-detector';

export default function mdxPlugin(): Plugin {
  const files: Array<TranslationFileMetadata> = [];
  const registry = registryManager();
  return {
    identifier: 'mdx',
    async trackFiles(filesMetadata) {
      // Start tracking files
      files.push(...filesMetadata);
    },
    async getInstructions() {
      return [
        'These strings are part of an MDX file, which can contain JSX and markdown.',
        'If a string is a code statement with no UI strings, return as-is, do not translate it.',
        'Make sure to return all the translated object for all the strings',
        'If the source string includes a code block fence (e.g., ``` or other delimiters), return it exactly as provided—do not add, modify, or complete missing code fences. Maintain the input as-is, even if the code block appears incomplete.',
      ].join('\n');
    },
    async getTranslationStrings() {
      const translationStrings: Array<TranslationStringArg> = [];

      for (const file of files) {
        // Process file for changes
        const changes = await processFileForChanges(file);

        const sourceContent = await readFile(file.source.path);
        const { data: sourceFrontmatter, content } = matter(sourceContent);
        const sourceHashMap = generateSourceMDXContentHashMap(content);

        const frontmatterTranslationStrings = buildTranslationStrings(
          sourceFrontmatter,
          changes.frontmatter,
          file,
        );

        const mdxContentTranslationStrings = buildTranslationStrings(
          sourceHashMap,
          changes.content,
          file,
        );

        translationStrings.push(...frontmatterTranslationStrings);
        translationStrings.push(...mdxContentTranslationStrings);
      }

      return translationStrings;
    },
    async onTranslationBatchComplete(translatedStrings) {
      if (!translatedStrings.length) {
        return;
      }

      const file = files.find(
        (file) => file.source.path === translatedStrings[0].batchId,
      );
      if (!file) {
        return;
      }
      const translatedContentMap = buildTranslatedContentMap(translatedStrings);
      const sourceContent = await readFile(file.source.path);
      const registryData = await registry.load(file.source.path);

      // Write to each target file concurrently
      await Promise.all(
        file.targets.map(async (target) => {
          // Ensure target file and its directory exist
          await ensureFileAndDirExists(target.path);

          const targetContent = await readFile(target.path);
          const translatedContent =
            translatedContentMap.get(target.locale) || {};

          const targetHashList =
            registryData?.content?.targets?.[target.locale] || [];

          // Build target MDX file content
          const targetFileContent = buildTargetMDX(
            sourceContent,
            targetContent,
            targetHashList,
            translatedContent,
          );

          await writeFile(target.path, targetFileContent);
        }),
      );

      await registry.updateFileRegistry(file);
    },
  };
}
