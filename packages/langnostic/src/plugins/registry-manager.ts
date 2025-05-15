import grayMatter from 'gray-matter';
import path from 'path';

import type { Registry, TranslationFileMetadata } from '../core/types';
import { readFile, writeFile } from '../lib/file-service';
import {
  generateHash,
  generateMDXContentHashList,
  getFrontmatterWithoutExcludedKeys,
} from '../lib/mdx-file';
import type { PluginOptions } from './mdx/mdx-plugin';

export default function registryManager() {
  function getRegistryPath(sourceFilePath: string): string {
    const dir = path.dirname(sourceFilePath);
    const filename = path.basename(
      sourceFilePath,
      path.extname(sourceFilePath),
    );

    return path.join(dir, `${filename}.langnostic.json`);
  }

  return {
    async load(sourceFilePath: string): Promise<Registry> {
      try {
        const registryPath = getRegistryPath(sourceFilePath);
        const data = await readFile(registryPath);

        return JSON.parse(data) as Registry;
      } catch (error) {
        // If file doesn't exist, return empty registry
        return {
          content: {
            source: {
              hashes: [],
              locale: '',
            },
            targets: {},
          },
          frontmatter: {},
        };
      }
    },
    async save(sourceFilePath: string, registry: Registry): Promise<void> {
      const registryPath = getRegistryPath(sourceFilePath);
      const data = JSON.stringify(registry, null, 2);

      await writeFile(registryPath, data);
    },
    async updateFileRegistry(
      file: TranslationFileMetadata,
      options?: PluginOptions,
    ) {
      const { frontmatterExcludedKeys } = options || {};
      const oldRegistryData = await this.load(file.source.path);

      const sourceContent = await readFile(file.source.path);
      const { content, data: sourceFrontmatter } = grayMatter(sourceContent);

      // Get source frontmatter without excluded keys because we don't want to consider them for translation
      const sourceFrontmatterWithoutExcludedKeys =
        frontmatterExcludedKeys && frontmatterExcludedKeys.length > 0
          ? getFrontmatterWithoutExcludedKeys(
              sourceFrontmatter,
              frontmatterExcludedKeys,
            )
          : sourceFrontmatter;

      const frontmatterHashValues = Object.keys(
        sourceFrontmatterWithoutExcludedKeys,
      ).reduce(
        (acc, key) => {
          acc[key] = generateHash(sourceFrontmatter[key]);

          return acc;
        },
        {} as Record<string, string>,
      );

      const sourceContentHashList = generateMDXContentHashList(content);

      await this.save(file.source.path, {
        content: {
          source: {
            hashes: sourceContentHashList,
            locale: file.source.locale,
          },
          targets: {
            ...(oldRegistryData?.content?.targets ?? {}),
            ...file.targets.reduce(
              (acc, target) => {
                acc[target.locale] = sourceContentHashList;

                return acc;
              },
              {} as Record<string, Array<string>>,
            ),
          },
        },
        frontmatter: frontmatterHashValues,
      });
    },
  };
}
