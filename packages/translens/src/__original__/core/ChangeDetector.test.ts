import ChangeDetector from './ChangeDetector';

describe('ChangeDetector', () => {
  let changeDetector: ChangeDetector;

  beforeEach(() => {
    changeDetector = new ChangeDetector();
  });

  test('getChangedKeys should return modified and new keys', () => {
    const currentHashes = { key1: 'hash_new', key2: 'hash_unchanged' };
    const registryHashes = { key1: 'hash_old', key2: 'hash_unchanged' };

    const result = changeDetector.getChangedKeys(currentHashes, registryHashes);

    expect(result).toEqual(['key1']);
  });

  test('isHashEqual should return true if hashes match', () => {
    expect(changeDetector.isHashEqual('sameHash', 'sameHash')).toBe(true);
  });

  test('isHashEqual should return false if hashes do not match', () => {
    expect(changeDetector.isHashEqual('hash1', 'hash2')).toBe(false);
  });

  test('getUpdatedHashes should merge cached and current hashes', () => {
    const registryHashes = { key1: 'oldHash1', key2: 'oldHash2' };
    const currentHashes = { key2: 'newHash2', key3: 'newHash3' };

    const expectedOutput = {
      key1: 'oldHash1',
      key2: 'newHash2',
      key3: 'newHash3',
    };

    const result = changeDetector.getUpdatedHashes(
      registryHashes,
      currentHashes,
    );

    expect(result).toEqual(expectedOutput);
  });
});
