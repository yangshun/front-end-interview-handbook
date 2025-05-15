import { generateHash } from '../../lib/mdx-file';
import { __test__ } from './mdx-change-detector';

describe('isSubset()', () => {
  const { isSubset } = __test__;

  test('should return true when all elements are present', () => {
    expect(isSubset(['a', 'b'], ['a', 'b', 'c'])).toBe(true);
  });

  test('should return false when elements are missing', () => {
    expect(isSubset(['a', 'd'], ['a', 'b', 'c'])).toBe(false);
  });
});

describe('areArraysEqual()', () => {
  const { areArraysEqual } = __test__;

  test('should return true when arrays are equal', () => {
    expect(areArraysEqual(['a', 'b'], ['a', 'b'])).toBe(true);
  });

  test('should return false when arrays are not equal', () => {
    expect(areArraysEqual(['a', 'b'], ['a', 'c'])).toBe(false);
  });
});

describe('findMissingOrUpdatedFrontmatterKeys', () => {
  const { findMissingOrUpdatedFrontmatterKeys } = __test__;

  test('returns keys missing in target frontmatter', () => {
    const sourceFrontmatter = { description: 'World', title: 'Hello' };
    const targetFrontmatter = { title: 'Hello' };
    const registryFrontmatter = {
      title: generateHash('Hello'),
    };
    const result = findMissingOrUpdatedFrontmatterKeys(
      sourceFrontmatter,
      targetFrontmatter,
      registryFrontmatter,
    );

    expect(result).toEqual(['description']);
  });

  test('returns keys with content changed', () => {
    const sourceFrontmatter = { title: 'Updated Title' };
    const targetFrontmatter = { title: 'Old Title' };
    const registryFrontmatter = { title: generateHash('Old Title') };
    const result = findMissingOrUpdatedFrontmatterKeys(
      sourceFrontmatter,
      targetFrontmatter,
      registryFrontmatter,
    );

    expect(result).toEqual(['title']);
  });

  test('combines missing and changed keys', () => {
    const sourceFrontmatter = { description: 'Updated', title: 'New' };
    const targetFrontmatter = { title: 'Old' };
    const registryFrontmatter = {
      title: generateHash('Old'),
    };
    const result = findMissingOrUpdatedFrontmatterKeys(
      sourceFrontmatter,
      targetFrontmatter,
      registryFrontmatter,
    );

    expect(result).toEqual(['title', 'description']);
  });

  test('returns empty array when no changes detected', () => {
    const sourceFrontmatter = { title: 'Hello' };
    const targetFrontmatter = { title: 'Hello' };
    const registryFrontmatter = { title: generateHash('Hello') };
    const result = findMissingOrUpdatedFrontmatterKeys(
      sourceFrontmatter,
      targetFrontmatter,
      registryFrontmatter,
    );

    expect(result).toEqual([]);
  });
});

describe('findMissingOrUpdatedContentKeys', () => {
  const { findMissingOrUpdatedContentKeys } = __test__;

  test('returns all source hashes when target/registry lengths differ', () => {
    const sourceHashes = ['hash1', 'hash2'];
    const targetHashes = ['hash1', 'hash2', 'hash3'];
    const registryTargetHashes = ['hash1', 'hash2'];
    const result = findMissingOrUpdatedContentKeys(
      sourceHashes,
      targetHashes,
      registryTargetHashes,
    );

    expect(result).toEqual(sourceHashes);
  });

  test('returns hashes missing from registry target hashes', () => {
    const sourceHashes = ['hash1', 'hash2', 'hash3'];
    const targetHashes = ['hashA', 'hashB', 'hashC'];
    const registryHashes = ['hash1', 'hash2', 'hash4'];
    const result = findMissingOrUpdatedContentKeys(
      sourceHashes,
      targetHashes,
      registryHashes,
    );

    expect(result).toEqual(['hash3']);
  });

  test('returns empty array when all source hashes present in registry hashes', () => {
    const sourceHashes = ['hash1', 'hash2'];
    const targetHashes = ['hashA', 'hashB'];
    const registryHashes = ['hash1', 'hash2'];
    const result = findMissingOrUpdatedContentKeys(
      sourceHashes,
      targetHashes,
      registryHashes,
    );

    expect(result).toEqual([]);
  });
});

describe('findFrontmatterExcludedKeysToUpdate', () => {
  const { findFrontmatterExcludedKeysToUpdate } = __test__;

  test('excluded keys is empty', () => {
    const sourceFrontmatter = { description: 'World', title: 'Hello' };
    const targetFrontmatter = { description: 'World', title: 'Hello' };
    const excludedFrontmatterKeysToUpdate = findFrontmatterExcludedKeysToUpdate(
      [],
      sourceFrontmatter,
      targetFrontmatter,
    );

    expect(excludedFrontmatterKeysToUpdate).toEqual([]);
  });
  test('excluded keys is not empty and is missing in target frontmatter', () => {
    const excludedKeys = ['author'];
    const sourceFrontmatter = {
      author: 'John',
      description: 'World',
      title: 'Hello',
    };
    const targetFrontmatter = { description: 'World', title: 'Hello' };
    const excludedFrontmatterKeysToUpdate = findFrontmatterExcludedKeysToUpdate(
      excludedKeys,
      sourceFrontmatter,
      targetFrontmatter,
    );

    expect(excludedFrontmatterKeysToUpdate).toEqual(['author']);
  });
  test('excluded keys is not empty and present in both source and target frontmatter and is same', () => {
    const excludedKeys = ['author'];
    const sourceFrontmatter = {
      author: 'John',
      description: 'World',
      title: 'Hello',
    };
    const targetFrontmatter = {
      author: 'John',
      description: 'World',
      title: 'Hello',
    };
    const excludedFrontmatterKeysToUpdate = findFrontmatterExcludedKeysToUpdate(
      excludedKeys,
      sourceFrontmatter,
      targetFrontmatter,
    );

    expect(excludedFrontmatterKeysToUpdate).toEqual([]);
  });
  test('excluded keys is not empty and but missing in source', () => {
    const excludedKeys = ['published'];
    const sourceFrontmatter = {
      description: 'World',
      title: 'Hello',
    };
    const targetFrontmatter = {
      description: 'World',
      title: 'Hello',
    };
    const excludedFrontmatterKeysToUpdate = findFrontmatterExcludedKeysToUpdate(
      excludedKeys,
      sourceFrontmatter,
      targetFrontmatter,
    );

    expect(excludedFrontmatterKeysToUpdate).toEqual([]);
  });
  test('excluded keys is not empty and but missing in source but present in target', () => {
    const excludedKeys = ['published'];
    const sourceFrontmatter = {
      description: 'World',
      title: 'Hello',
    };
    const targetFrontmatter = {
      description: 'World',
      published: 'true',
      title: 'Hello',
    };
    const excludedFrontmatterKeysToUpdate = findFrontmatterExcludedKeysToUpdate(
      excludedKeys,
      sourceFrontmatter,
      targetFrontmatter,
    );

    expect(excludedFrontmatterKeysToUpdate).toEqual(['published']);
  });
});

describe('detectFrontmatterDiff', () => {
  const { detectFrontmatterDiff } = __test__;

  test('target is missing', () => {
    const source = { desc: 'World', title: 'Hello' };
    const result = detectFrontmatterDiff(source, undefined, {});

    expect(result.keysToTranslate).toEqual(['title', 'desc']);
    expect(result.isReorderOrRemoval).toBe(false);
  });
  test('new and updated frontmatter to translate', () => {
    const source = { desc: 'Updated', title: 'New' };
    const target = { title: 'Old' };
    const registry = { title: generateHash('Old') };
    const result = detectFrontmatterDiff(source, target, registry);

    expect(result.keysToTranslate).toEqual(['title', 'desc']);
  });
  test('frontmatter removed from source', () => {
    const source = { title: 'Hello' };
    const target = { desc: 'World', title: 'Hello' };
    const registry = {
      desc: generateHash('World'),
      title: generateHash('Hello'),
    };
    const result = detectFrontmatterDiff(source, target, registry);

    expect(result.isReorderOrRemoval).toBe(true);
    expect(result.keysToTranslate).toEqual([]);
  });
  test('source and target is exactly same', () => {
    const source = { title: 'Hello' };
    const target = { title: 'Hello' };
    const registry = {
      title: generateHash('Hello'),
    };
    const result = detectFrontmatterDiff(source, target, registry);

    expect(result.isReorderOrRemoval).toBe(false);
    expect(result.keysToTranslate).toEqual([]);
  });
});

describe('detectContentDiff', () => {
  const { detectContentDiff } = __test__;

  test('target is missing', () => {
    const sourceHashes = ['hash1', 'hash2'];
    const result = detectContentDiff(sourceHashes, undefined, []);

    expect(result.keysToTranslate).toEqual(sourceHashes);
    expect(result.isReorderOrRemoval).toBe(false);
  });
  test('new content changes', () => {
    const source = ['hash1', 'hash2'];
    const target = ['hash1'];
    const registry = ['hash1'];
    const result = detectContentDiff(source, target, registry);

    expect(result.keysToTranslate).toEqual(['hash2']);
  });
  test('content removed from source', () => {
    const source = ['hash1', 'hash2'];
    const target = ['hash1', 'hash2', 'hash3'];
    const registry = ['hash1', 'hash2', 'hash3'];
    const result = detectContentDiff(source, target, registry);

    expect(result.isReorderOrRemoval).toBe(true);
    expect(result.keysToTranslate).toEqual([]);
  });
  test('content reordering', () => {
    const source = ['hash2', 'hash1'];
    const target = ['hash1', 'hash2'];
    const registry = ['hash1', 'hash2'];
    const result = detectContentDiff(source, target, registry);

    expect(result.isReorderOrRemoval).toBe(true);
    expect(result.keysToTranslate).toEqual([]);
  });
});
