import path from 'path';
import { readFile, writeFile } from '../lib/file-service';
import { Registry, TranslationStringMetadata } from '../core/types';
import matter from 'gray-matter';
import { generateHash } from './lib';

export default function registryManager() {
  function getRegistryPath(sourceFilePath: string): string {
    const dir = path.dirname(sourceFilePath);
    return path.join(dir, '.translens.json');
  }
  return {
    async load(sourceFilePath: string): Promise<Registry | null> {
      try {
        const registryPath = getRegistryPath(sourceFilePath);
        const data = await readFile(registryPath);
        return JSON.parse(data) as Registry;
      } catch (error) {
        // If file doesn't exist, return empty registry
        return null;
      }
    },
    async save(sourceFilePath: string, registry: Registry): Promise<void> {
      const registryPath = getRegistryPath(sourceFilePath);
      const data = JSON.stringify(registry, null, 2);
      await writeFile(registryPath, data);
    },
    async updateFileRegistry(sourceFilePath: string) {
      const sourceContent = await readFile(sourceFilePath);
      const { data: sourceFrontmatter } = matter(sourceContent);
      const frontmatterHashValues = Object.keys(sourceFrontmatter).reduce(
        (acc, key) => {
          acc[key] = generateHash(sourceFrontmatter[key]);
          return acc;
        },
        {} as Record<string, string>,
      );

      this.save(sourceFilePath, {
        frontmatter: frontmatterHashValues,
      });
    },
  };
}
