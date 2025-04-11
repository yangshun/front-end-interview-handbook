import grayMatter from 'gray-matter';
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

export type PluginOptions = Readonly<{
  frontmatterExcludedKeys?: string[];
}>;

export default function mdxPlugin(options: PluginOptions): Plugin {
  const files: Array<TranslationFileMetadata> = [];
  const registry = registryManager();

  return {
    type: 'mdx',
    stringsPerRequest: 20,
    async trackFiles(filesMetadata) {
      // Start tracking files
      files.push(...filesMetadata);
    },
    async getInstructions() {
      return [
        'These strings are part of an MDX file, which can contain both markdown and JSX.',
        'For languages that do not have spaces between words, ALWAYS remove the spaces around JSX tags and JSX curly braces.',
        'Make sure to return all the translated objects for all the strings.',
        'Keep all inline code (especially anything wrapped in single backticks like `<noscript>`, `<Component /> etc.`) exactly as-is, without removing or replacing the tags inside.',
      ].join('\n');
    },
    async getTranslationStrings() {
      const translationStrings: Array<TranslationStringArg> = [];

      for (const file of files) {
        // Process file for changes
        const changes = await processFileForChanges(file, options);

        const sourceContent = await readFile(file.source.path);
        const { data: sourceFrontmatter, content } = grayMatter(sourceContent);
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
      if (translatedStrings.length === 0) {
        return;
      }

      const file = files.find(
        (file) => file.source.path === translatedStrings[0].batchId,
      );

      if (file == null) {
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

      await registry.updateFileRegistry(file, options);
    },
  };
}
