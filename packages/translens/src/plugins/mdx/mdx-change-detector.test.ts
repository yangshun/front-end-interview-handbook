import { __test__ } from './mdx-change-detector';
import * as fs from 'fs/promises';
import * as path from 'path';
import os from 'os';
import { generateHash, generateMDXContentHashList } from '../../lib/mdx-file';

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
    const sourceFrontmatter = { title: 'Hello', description: 'World' };
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
    const sourceFrontmatter = { title: 'New', description: 'Updated' };
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

describe('detectDiff', () => {
  const { detectDiff } = __test__;

  test('flags all keys for new translation when target file missing', async () => {
    const diffInput = {
      source: {
        frontmatter: {
          title: 'Hello',
          description: 'World',
        },
        contentHashList: generateMDXContentHashList('Content'),
      },
      target: undefined,
      registry: {
        frontmatter: {},
        targetContentHashList: [],
      },
    };
    const result = await detectDiff(diffInput);

    expect(result.contentKeysToTranslate).toHaveLength(1);
    expect(result.contentKeysToTranslate).toEqual(
      generateMDXContentHashList('Content'),
    );
    expect(result.frontmatterKeysToTranslate).toEqual(['title', 'description']);
    expect(result.updatedContentHashList).toEqual([]);
    expect(result.updatedFrontmatterHashes).toEqual({});
  });

  test('new frontmatter values', async () => {
    const diffInput = {
      source: {
        frontmatter: {
          title: 'Hello',
          description: 'Description',
        },
        contentHashList: generateMDXContentHashList('Content'),
      },
      target: {
        frontmatter: {
          title: 'Hello',
        },
        contentHashList: generateMDXContentHashList('Content'),
      },
      registry: {
        frontmatter: {
          title: generateHash('Hello'),
        },
        targetContentHashList: generateMDXContentHashList('Content'),
      },
    };
    const result = await detectDiff(diffInput);

    expect(result.frontmatterKeysToTranslate).toEqual(['description']);
    expect(result.contentKeysToTranslate).toEqual([]);
    expect(result.updatedContentHashList).toEqual([]);
    expect(result.updatedFrontmatterHashes).toEqual({});
  });

  test('removed frontmatter keys', async () => {
    const diffInput = {
      source: {
        frontmatter: {
          title: 'Hello',
        },
        contentHashList: [],
      },
      target: {
        frontmatter: {
          title: 'Hello',
          description: 'Description',
        },
        contentHashList: [],
      },
      registry: {
        frontmatter: {
          title: generateHash('Hello'),
          description: generateHash('Description'),
        },
        targetContentHashList: [],
      },
    };

    const result = await detectDiff(diffInput);

    expect(result.updatedFrontmatterHashes).toEqual({
      title: generateHash('Hello'),
    });
    expect(result.frontmatterKeysToTranslate).toEqual([]);
    expect(result.frontmatterKeysToTranslate).toEqual([]);
    expect(result.updatedContentHashList).toEqual([]);
  });

  test('changed frontmatter values', async () => {
    const diffInput = {
      source: {
        frontmatter: {
          title: 'Updated Hello',
        },
        contentHashList: [],
      },
      target: {
        frontmatter: {
          title: 'Hello',
          description: 'Description',
        },
        contentHashList: [],
      },
      registry: {
        frontmatter: {
          title: generateHash('Hello'),
          description: generateHash('Description'),
        },
        targetContentHashList: [],
      },
    };

    const result = await detectDiff(diffInput);

    expect(result.frontmatterKeysToTranslate).toEqual(['title']);
    expect(result.contentKeysToTranslate).toEqual([]);
    expect(result.updatedContentHashList).toEqual([]);
    expect(result.updatedFrontmatterHashes).toEqual({});
  });

  test('new untranslated content', async () => {
    const diffInput = {
      source: {
        frontmatter: {
          title: 'Hello',
        },
        contentHashList: generateMDXContentHashList(
          'Translated\n\nUntranslated1\n\nUntranslated2',
        ),
      },
      target: {
        frontmatter: {
          title: 'Hello',
        },
        contentHashList: generateMDXContentHashList('Translated'),
      },
      registry: {
        frontmatter: {
          title: generateHash('Hello'),
        },
        targetContentHashList: generateMDXContentHashList('Translated'),
      },
    };

    const result = await detectDiff(diffInput);

    expect(result.contentKeysToTranslate).toEqual(
      generateMDXContentHashList('Untranslated1\n\nUntranslated2'),
    );
    expect(result.frontmatterKeysToTranslate).toEqual([]);
    expect(result.updatedContentHashList).toEqual([]);
    expect(result.updatedFrontmatterHashes).toEqual({});
  });

  test('changed mdx content', async () => {
    const diffInput = {
      source: {
        frontmatter: {
          title: 'Hello',
        },
        contentHashList: generateMDXContentHashList('Updated content'),
      },
      target: {
        frontmatter: {
          title: 'Hello',
        },
        contentHashList: generateMDXContentHashList('Content'),
      },
      registry: {
        frontmatter: {
          title: generateHash('Hello'),
        },
        targetContentHashList: generateMDXContentHashList('Content'),
      },
    };

    const result = await detectDiff(diffInput);

    expect(result.contentKeysToTranslate).toEqual(
      generateMDXContentHashList('Updated content'),
    );
    expect(result.frontmatterKeysToTranslate).toEqual([]);
    expect(result.updatedContentHashList).toEqual([]);
    expect(result.updatedFrontmatterHashes).toEqual({});
  });

  test('content reordering without translation', async () => {
    const diffInput = {
      source: {
        frontmatter: {
          title: 'Hello',
        },
        contentHashList: generateMDXContentHashList('B\n\nA'),
      },
      target: {
        frontmatter: {
          title: 'Hello',
        },
        contentHashList: generateMDXContentHashList('A\n\nB'),
      },
      registry: {
        frontmatter: {
          title: generateHash('Hello'),
        },
        targetContentHashList: generateMDXContentHashList('A\n\nB'),
      },
    };

    const result = await detectDiff(diffInput);

    expect(result.updatedContentHashList).toEqual(
      generateMDXContentHashList('B\n\nA'),
    );
    expect(result.frontmatterKeysToTranslate).toEqual([]);
    expect(result.contentKeysToTranslate).toEqual([]);
    expect(result.updatedFrontmatterHashes).toEqual({});
  });

  test('frontmatter and content changes', async () => {
    const diffInput = {
      source: {
        frontmatter: {
          title: 'Updated title',
          description: 'Description',
        },
        contentHashList: generateMDXContentHashList('Updated Content'),
      },
      target: {
        frontmatter: {
          title: 'Title',
        },
        contentHashList: generateMDXContentHashList('Content'),
      },
      registry: {
        frontmatter: {
          title: generateHash('Title'),
        },
        targetContentHashList: generateMDXContentHashList('Content'),
      },
    };

    const result = await detectDiff(diffInput);

    expect(result.frontmatterKeysToTranslate).toEqual(['title', 'description']);
    expect(result.updatedContentHashList).toEqual([]);
    expect(result.contentKeysToTranslate).toEqual(
      generateMDXContentHashList('Updated Content'),
    );
    expect(result.updatedFrontmatterHashes).toEqual({});
  });

  test('removal and reorder of mdx content without translation', async () => {
    const diffInput = {
      source: {
        frontmatter: {
          title: 'Title',
        },
        contentHashList: generateMDXContentHashList('C\n\nA'),
      },
      target: {
        frontmatter: {
          title: 'Title',
        },
        contentHashList: generateMDXContentHashList('A\n\nB\n\nC'),
      },
      registry: {
        frontmatter: {
          title: generateHash('Title'),
        },
        targetContentHashList: generateMDXContentHashList('A\n\nB\n\nC'),
      },
    };

    const result = await detectDiff(diffInput);

    expect(result.updatedContentHashList).toEqual(
      generateMDXContentHashList('C\n\nA'),
    );
    expect(result.frontmatterKeysToTranslate).toEqual([]);
    expect(result.contentKeysToTranslate).toEqual([]);
    expect(result.updatedFrontmatterHashes).toEqual({});
  });
});
