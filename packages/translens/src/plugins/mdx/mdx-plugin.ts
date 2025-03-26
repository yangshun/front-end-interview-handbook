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
  buildTargetedContentMap,
  buildTranslationStrings,
  hashFilePathLocale,
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
    async translationComplete(translatedStrings) {
      if (translatedStrings.length === 0) {
        return;
      }
      // Build a map of target file hash (using file path and locale) to its translation content.
      const targetedContentMap = buildTargetedContentMap(translatedStrings);
      await Promise.all(
        files.map(async (file) => {
          const sourceContent = await readFile(file.source.path);
          const registryData = await registry.load(file.source.path);

          // Process each target for the current file concurrently.
          await Promise.all(
            file.targets.map(async (target) => {
              // Ensure target file and its directory exist.
              await ensureFileAndDirExists(target.path);

              // Read and parse the target JSON file.
              const targetContent = await readFile(target.path);

              const targetHash = hashFilePathLocale(
                file.source.path,
                target.locale,
              );
              const translatedContent =
                targetedContentMap.get(targetHash) || {};

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
        }),
      );
    },
  };
}
