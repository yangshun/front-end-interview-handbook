import { FileRegistry } from '../types/registry';

export interface IFileRegistryManager {
  load(sourceFilePath: string): Promise<FileRegistry | null>;
  save(sourceFilePath: string, registry: FileRegistry): Promise<void>;
}
