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
import mdxChangeDetector from './mdx-change-detector';
import {
  buildTargetMDXContent,
  buildTargetedContentMap,
  generateMDXContentHashList,
  generateSourceMDXContentHashMap,
  hashFilePathLocale,
} from '../lib';
import registryManager from '../registry-manager';

export default function mdxPlugin(): Plugin {
  const files: Array<TranslationFileMetadata> = [];
  const detector = mdxChangeDetector();
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
        // Preprocess changes to check for removal of content or reorder of content without content update
        await detector.preprocessChanges(file);

        // Run the change detector to get missing keys for each target locale
        const missingKeysByTarget =
          await detector.getMissingFrontmatterTranslationKeys(file);
        const missingContentKeysByTarget =
          await detector.getMissingContentTranslationKeys(file);

        const sourceContent = await readFile(file.source.path);
        const { data: sourceFrontmatter, content } = matter(sourceContent);
        const sourceHashMap = generateSourceMDXContentHashMap(content);

        for (const key of Object.keys(sourceFrontmatter)) {
          const missingInTargets = file.targets
            .filter((target) => {
              const missingKeys = missingKeysByTarget[target.locale];
              return missingKeys && missingKeys.includes(key);
            })
            .map((target) => target.locale);

          if (missingInTargets.length > 0) {
            translationStrings.push({
              id: key,
              filePath: file.source.path,
              source: {
                string: sourceFrontmatter[key],
                locale: file.source.locale,
              },
              targets: missingInTargets,
            });
          }
        }
        for (const key of Object.keys(sourceHashMap)) {
          const missingInTargets = file.targets
            .filter((target) => {
              const missingKeys = missingContentKeysByTarget[target.locale];
              return missingKeys && missingKeys.includes(key);
            })
            .map((target) => target.locale);

          if (missingInTargets.length > 0) {
            translationStrings.push({
              id: key,
              filePath: file.source.path,
              source: {
                string: sourceHashMap[key],
                locale: file.source.locale,
              },
              targets: missingInTargets,
            });
          }
        }
      }
      console.log(translationStrings);
      return translationStrings;
    },
    async translationComplete(translatedStrings) {
      // Build a map of target file hash (using file path and locale) to its translation content.
      const targetedContentMap = buildTargetedContentMap(translatedStrings);
      await Promise.all(
        files.map(async (file) => {
          const sourceContent = await readFile(file.source.path);
          const registryData = await registry.load(file.source.path);
          const { content: sourceMDXContent, data: sourceFrontmatter } =
            matter(sourceContent);

          // Process each target for the current file concurrently.
          await Promise.all(
            file.targets.map(async (target) => {
              // Ensure target file and its directory exist.
              await ensureFileAndDirExists(target.path);

              // Read and parse the target JSON file.
              const targetContent = await readFile(target.path);
              const { data: targetFrontmatter, content: targetMDXContent } =
                matter(targetContent);
              const updatedFrontmatter: Record<string, string> = {};

              const targetHash = hashFilePathLocale(
                file.source.path,
                target.locale,
              );
              const translatedContent =
                targetedContentMap.get(targetHash) || {};

              // Update frontmatter with translated content
              Object.keys(sourceFrontmatter).forEach((key) => {
                updatedFrontmatter[key] = translatedContent[key]
                  ? translatedContent[key]
                  : targetFrontmatter[key]
                    ? targetFrontmatter[key]
                    : sourceFrontmatter[key];
              });

              const targetHashList =
                registryData?.content?.targets?.[target.locale] || [];
              const updatedMDXContent = buildTargetMDXContent(
                sourceMDXContent,
                targetMDXContent,
                translatedContent,
                targetHashList,
              );

              // Combine frontmatter and content
              const targetFileContent = matter.stringify(
                updatedMDXContent,
                updatedFrontmatter,
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
