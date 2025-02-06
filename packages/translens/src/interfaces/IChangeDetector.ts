export interface IChangeDetector {
  generateKeyHashes(flattened: Record<string, string>): Record<string, string>;
  getChangedKeys(
    currentHashes: Record<string, string>,
    registryHashes: Record<string, string>,
  ): string[];
  isHashEqual(currentHash: string, registryHash?: string): boolean;
  getUpdatedHashes(
    registryHashes: Record<string, string>,
    currentHashes: Record<string, string>,
  ): Record<string, string>;
  generateHash(content: string): string;
}
