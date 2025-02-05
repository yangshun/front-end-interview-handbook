import fs from 'fs/promises';
import path from 'path';
import { FileRegistry } from '../types/registry';
import { IFileRegistryManager } from '../interfaces';

export class FileRegistryManager implements IFileRegistryManager {
  getRegistryPath(sourceFilePath: string): string {
    const dir = path.dirname(sourceFilePath);
    const filename = path.basename(
      sourceFilePath,
      path.extname(sourceFilePath),
    );
    return path.join(dir, `${filename}.translens.json`);
  }

  async load(sourceFilePath: string): Promise<FileRegistry | null> {
    try {
      const registryPath = this.getRegistryPath(sourceFilePath);
      const data = await fs.readFile(registryPath, 'utf-8');
      return JSON.parse(data) as FileRegistry;
    } catch (error) {
      // If file doesn't exist, return empty registry
      return null;
    }
  }

  async save(sourceFilePath: string, registry: FileRegistry): Promise<void> {
    const registryPath = this.getRegistryPath(sourceFilePath);
    const data = JSON.stringify(registry, null, 2);
    await fs.writeFile(registryPath, data, 'utf-8');
  }
}
