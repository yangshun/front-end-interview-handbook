import murmur from 'murmurhash';
import { IChangeDetector } from '../interfaces';

export default class ChangeDetector implements IChangeDetector {
  generateKeyHashes(flattened: Record<string, string>): Record<string, string> {
    const hashes: Record<string, string> = {};
    for (const [key, value] of Object.entries(flattened)) {
      hashes[key] = this.generateHash(value);
    }
    return hashes;
  }

  getChangedKeys(
    currentHashes: Record<string, string>,
    registryHashes: Record<string, string>,
  ): string[] {
    const changedKeys: string[] = [];

    // Check for new or modified keys
    for (const [key, hash] of Object.entries(currentHashes)) {
      if (!registryHashes[key] || registryHashes[key] !== hash) {
        changedKeys.push(key);
      }
    }

    return changedKeys;
  }

  isHashEqual(currentHash: string, registryHash?: string): boolean {
    return currentHash === registryHash;
  }

  getUpdatedHashes(
    registryHashes: Record<string, string>,
    currentHashes: Record<string, string>,
  ): Record<string, string> {
    return { ...registryHashes, ...currentHashes };
  }

  generateHash(content: string): string {
    return murmur.v3(content).toString(16);
  }
}
