import { __test__ } from './mdx-change-detector';
import * as fs from 'fs/promises';
import * as path from 'path';
import matter from 'gray-matter';
import os from 'os';
import { generateHash, generateMDXContentHashList } from '../../lib/mdx-file';
import { writeFile } from '../../lib/file-service';

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

const {
  detectFileDiff,
  findMissingOrUpdatedFrontmatterKeys,
  findMissingOrUpdatedContentKeys,
} = __test__;

describe('detectFileDiff', () => {
  let tempDir: string;

  beforeAll(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'detect-file-diff-'));
  });

  afterAll(async () => {
    await fs.rm(tempDir, { recursive: true, force: true });
  });

  function createPath(filePath: string) {
    return path.join(tempDir, filePath);
  }

  test('flags all keys for new translation when target file missing', async () => {
    const sourceContent = `---\ntitle: Hello\ndescription: World\n---\nContent`;
    const registryData = {
      frontmatter: {},
      content: { source: { hashes: [], locale: '' }, targets: {} },
    };

    const result = await detectFileDiff(
      sourceContent,
      { path: 'missing.mdx', locale: 'zh-CN' },
      registryData,
      'zh-CN',
    );

    expect(result.contentKeysForTranslation).toHaveLength(1);
    expect(result.contentKeysForTranslation).toEqual(
      generateMDXContentHashList('Content'),
    );
    expect(result.frontmatterKeysForTranslation).toEqual([
      'title',
      'description',
    ]);
    expect(result.updatedContentHashList).toEqual([]);
    expect(result.updatedFrontmatterHashes).toEqual({});
  });

  test('new frontmatter values', async () => {
    const targetPath = createPath('target.mdx');
    await writeFile(targetPath, `---\ntitle: Title\n---\nContent`);
    const sourceContent = `---\ntitle: Title\ndescription: Description\n---\nContent`;
    const registryData = {
      frontmatter: { title: generateHash('Title') },
      content: {
        source: {
          hashes: generateMDXContentHashList('Content'),
          locale: 'en-US',
        },
        targets: { 'zh-CN': generateMDXContentHashList('Content') },
      },
    };

    const result = await detectFileDiff(
      sourceContent,
      { path: targetPath, locale: 'zh-CN' },
      registryData,
      'zh-CN',
    );

    expect(result.frontmatterKeysForTranslation).toEqual(['description']);
    expect(result.contentKeysForTranslation).toEqual([]);
    expect(result.updatedContentHashList).toEqual([]);
    expect(result.updatedFrontmatterHashes).toEqual({});
  });

  test('removed frontmatter keys', async () => {
    const targetPath = createPath('target.mdx');
    await writeFile(targetPath, `---\ntitle: Hi\ndescription: Old\n---\n`);
    const sourceContent = `---\ntitle: Hi\n---\n`;
    const registryData = {
      frontmatter: {
        title: generateHash('Hi'),
        description: generateHash('Old'),
      },
      content: {
        source: { hashes: [], locale: '' },
        targets: { 'zh-CN': [] },
      },
    };

    const result = await detectFileDiff(
      sourceContent,
      { path: targetPath, locale: 'zh-CN' },
      registryData,
      'zh-CN',
    );

    expect(result.updatedFrontmatterHashes).toEqual({
      title: generateHash('Hi'),
    });
    expect(result.frontmatterKeysForTranslation).toEqual([]);
    expect(result.frontmatterKeysForTranslation).toEqual([]);
    expect(result.updatedContentHashList).toEqual([]);
  });

  test('changed frontmatter values', async () => {
    const targetPath = createPath('target.mdx');
    await writeFile(targetPath, `---\ntitle: Old Title\n---\nContent`);
    const sourceContent = `---\ntitle: New Title\n---\nContent`;
    const registryData = {
      frontmatter: { title: generateHash('Old Title') },
      content: {
        source: {
          hashes: generateMDXContentHashList('Content'),
          locale: 'en-US',
        },
        targets: { 'zh-CN': generateMDXContentHashList('Content') },
      },
    };

    const result = await detectFileDiff(
      sourceContent,
      { path: targetPath, locale: 'zh-CN' },
      registryData,
      'zh-CN',
    );

    expect(result.frontmatterKeysForTranslation).toEqual(['title']);
    expect(result.contentKeysForTranslation).toEqual([]);
    expect(result.updatedContentHashList).toEqual([]);
    expect(result.updatedFrontmatterHashes).toEqual({});
  });

  test('new untranslated content', async () => {
    const targetPath = createPath('target.mdx');
    await writeFile(targetPath, `---\ntitle: Hi\n---\nTranslated`);
    const sourceContent = `---\ntitle: Hi\n---\nTranslated\n\nUntranslated1\n\nUntranslated2`;
    const registryData = {
      frontmatter: { title: generateHash('Hi') },
      content: {
        source: {
          hashes: generateMDXContentHashList('Translated'),
          locale: 'en-US',
        },
        targets: {
          'zh-CN': generateMDXContentHashList('Translated'),
        },
      },
    };

    const result = await detectFileDiff(
      sourceContent,
      { path: targetPath, locale: 'zh-CN' },
      registryData,
      'zh-CN',
    );

    expect(result.contentKeysForTranslation).toEqual(
      generateMDXContentHashList('Untranslated1\n\nUntranslated2'),
    );
    expect(result.frontmatterKeysForTranslation).toEqual([]);
    expect(result.updatedContentHashList).toEqual([]);
    expect(result.updatedFrontmatterHashes).toEqual({});
  });

  test('changed mdx content', async () => {
    const targetPath = createPath('target.mdx');
    await writeFile(targetPath, `---\ntitle: Hi\n---\nTranslated`);
    const sourceContent = `---\ntitle: Hi\n---\nUpdated Translated`;
    const registryData = {
      frontmatter: { title: generateHash('Hi') },
      content: {
        source: {
          hashes: generateMDXContentHashList('Translated'),
          locale: 'en-US',
        },
        targets: {
          'zh-CN': generateMDXContentHashList('Translated'),
        },
      },
    };

    const result = await detectFileDiff(
      sourceContent,
      { path: targetPath, locale: 'zh-CN' },
      registryData,
      'zh-CN',
    );

    expect(result.contentKeysForTranslation).toEqual(
      generateMDXContentHashList('Updated Translated'),
    );
    expect(result.frontmatterKeysForTranslation).toEqual([]);
    expect(result.updatedContentHashList).toEqual([]);
    expect(result.updatedFrontmatterHashes).toEqual({});
  });

  test('content reordering without translation', async () => {
    const targetPath = createPath('target.mdx');
    await writeFile(targetPath, `---\ntitle: Hi\n---\nB\n\nA`);
    const sourceContent = `---\ntitle: Hi\n---\nA\n\nB`;
    const registryData = {
      frontmatter: { title: generateHash('Hi') },
      content: {
        source: {
          hashes: generateMDXContentHashList('B\n\nA'),
          locale: 'en-US',
        },
        targets: { 'zh-CN': generateMDXContentHashList('B\n\nA') },
      },
    };

    const result = await detectFileDiff(
      sourceContent,
      { path: targetPath, locale: 'zh-CN' },
      registryData,
      'zh-CN',
    );

    expect(result.updatedContentHashList).toEqual(
      generateMDXContentHashList('A\n\nB'),
    );
    expect(result.frontmatterKeysForTranslation).toEqual([]);
    expect(result.contentKeysForTranslation).toEqual([]);
    expect(result.updatedFrontmatterHashes).toEqual({});
  });

  test('frontmatter and content changes', async () => {
    const targetPath = createPath('target.mdx');
    await writeFile(targetPath, `---\ntitle: Old\n---\nContent`);
    const sourceContent = `---\ntitle: New\ndescription: Added\n---\nNew Content`;
    const registryData = {
      frontmatter: { title: generateHash('Old') },
      content: {
        source: {
          hashes: generateMDXContentHashList('Content'),
          locale: 'en-US',
        },
        targets: { 'zh-CN': generateMDXContentHashList('Content') },
      },
    };

    const result = await detectFileDiff(
      sourceContent,
      { path: targetPath, locale: 'zh-CN' },
      registryData,
      'zh-CN',
    );

    expect(result.frontmatterKeysForTranslation).toEqual([
      'title',
      'description',
    ]);
    expect(result.updatedContentHashList).toEqual([]);
    expect(result.contentKeysForTranslation).toEqual(
      generateMDXContentHashList('New Content'),
    );
    expect(result.updatedFrontmatterHashes).toEqual({});
  });

  test('removal and reorder of mdx content without translation', async () => {
    const targetPath = createPath('target.mdx');
    await writeFile(targetPath, `---\ntitle: Hi\n---\nA\n\nB\n\nC`);
    const sourceContent = `---\ntitle: Hi\n---\nA\n\nC`;
    const registryData = {
      frontmatter: { title: generateHash('Hi') },
      content: {
        source: {
          hashes: generateMDXContentHashList('A\n\nB\n\nC'),
          locale: 'en-US',
        },
        targets: { 'zh-CN': generateMDXContentHashList('A\n\nB\n\nC') },
      },
    };

    const result = await detectFileDiff(
      sourceContent,
      { path: targetPath, locale: 'zh-CN' },
      registryData,
      'zh-CN',
    );

    expect(result.updatedContentHashList).toEqual(
      generateMDXContentHashList('A\n\nC'),
    );
    expect(result.frontmatterKeysForTranslation).toEqual([]);
    expect(result.contentKeysForTranslation).toEqual([]);
    expect(result.updatedFrontmatterHashes).toEqual({});
  });
});
