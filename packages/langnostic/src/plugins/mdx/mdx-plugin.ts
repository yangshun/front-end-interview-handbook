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
    async trackFiles(filesMetadata) {
      // Start tracking files
      files.push(...filesMetadata);
    },
    async getInstructions() {
      return [
        'These strings are part of an MDX file, which can contain JSX and markdown.',
        'If a string is a code statement with no UI strings, return as-is, do not translate it.',
        'Make sure to return all the translated object for all the strings.',
        'If a string includes a code block fence (e.g., ``` or other delimiters), and if the corresponding opening or closing code block fence is missing, do NOT add the missing code block fence to the start or end of the translated string.',
        'Preserve the structure of code blocks exactly as in the original input string—even if malformed or incomplete.',
        'Do NOT auto-correct or complete code fences under any circumstance.',
        'Examples:',
        "✅ Allowed: Input: ```jsx\\nimport PropTypes from 'prop-types'; Output: ```jsx\\nimport PropTypes from 'prop-types';",
        "❌ Not Allowed: Input: ```jsx\\nimport PropTypes from 'prop-types'; Output: ```jsx\\nimport PropTypes from 'prop-types';\\n```",
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
