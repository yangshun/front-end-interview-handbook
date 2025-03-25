import * as fs from 'fs/promises';
import * as path from 'path';
import murmur from 'murmurhash';
import os from 'os';
import mdxChangeDetector from './mdx-change-detector';
import { TranslationFileMetadata } from '../core/types';
import { generateHash } from './lib';

describe('mdxChangeDetector', () => {
  let tempDir: string;

  beforeAll(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'mdx-change-detector-'));
  });

  afterAll(async () => {
    await fs.rm(tempDir, { recursive: true, force: true });
  });

  test('detects missing frontmatter keys in target files', async () => {
    const sourceContent = `---\ntitle: "Hello"\ndescription: "World"\n---\nContent here`;
    const targetContentZhCN = `---\ntitle: "Hello"\n---\nContent here`; // missing description

    const sourcePath = path.join(tempDir, 'source.mdx');
    const registryPath = path.join(tempDir, 'source.translens.json');
    const targetPathZhCN = path.join(tempDir, 'zh-CN.mdx');
    const targetPathJaJP = path.join(tempDir, 'ja-JP.mdx');

    const hashValueTitle = murmur.v3('Hello').toString(16);
    await fs.writeFile(
      registryPath,
      JSON.stringify({ frontmatter: { title: hashValueTitle } }),
      'utf8',
    );

    await fs.writeFile(sourcePath, sourceContent, 'utf8');
    await fs.writeFile(targetPathZhCN, targetContentZhCN, 'utf8');

    const file: TranslationFileMetadata = {
      source: { path: sourcePath, locale: 'en-US' },
      targets: [
        { path: targetPathZhCN, locale: 'zh-CN' },
        { path: targetPathJaJP, locale: 'ja-JP' },
      ],
    };

    const detector = mdxChangeDetector();
    const missingKeys =
      await detector.getMissingFrontmatterTranslationKeys(file);

    expect(missingKeys).toMatchInlineSnapshot(`
      {
        "ja-JP": [
          "title",
          "description",
        ],
        "zh-CN": [
          "description",
        ],
      }
    `);
  });

  test('detects missing frontmatter when source frontmatter key value changed', async () => {
    const sourceContent = `---\ntitle: "Hello"\ndescription: "Updated World"\n---\nContent here`;
    const targetContent = `---\ntitle: "Hello"\ndescription: "World"\n---\nContent here`;

    const sourcePath = path.join(tempDir, 'source.mdx');
    const targetPath = path.join(tempDir, 'target.mdx');
    const registryPath = path.join(tempDir, 'source.translens.json');

    await fs.writeFile(sourcePath, sourceContent, 'utf8');
    await fs.writeFile(targetPath, targetContent, 'utf8');
    const hashValueTitle = murmur.v3('Hello').toString(16);
    await fs.writeFile(
      registryPath,
      JSON.stringify({ frontmatter: { title: hashValueTitle } }),
      'utf8',
    );

    const file: TranslationFileMetadata = {
      source: { path: sourcePath, locale: 'en-US' },
      targets: [{ path: targetPath, locale: 'zh-CN' }],
    };

    const detector = mdxChangeDetector();
    const missingKeys =
      await detector.getMissingFrontmatterTranslationKeys(file);

    expect(missingKeys).toEqual({ 'zh-CN': ['description'] });
  });

  test('detects missing frontmatter when target file does not exist', async () => {
    const sourceContent = `---\ntitle: "Hello"\ndescription: "World"\n---\nContent here`;

    const sourcePath = path.join(tempDir, 'source.mdx');
    const targetPath = path.join(tempDir, 'non-existent-target.mdx');

    await fs.writeFile(sourcePath, sourceContent, 'utf8');

    const file: TranslationFileMetadata = {
      source: { path: sourcePath, locale: 'en-US' },
      targets: [{ path: targetPath, locale: 'zh-CN' }],
    };

    const detector = mdxChangeDetector();
    const missingKeys =
      await detector.getMissingFrontmatterTranslationKeys(file);

    expect(missingKeys).toEqual({ 'zh-CN': ['title', 'description'] });
  });
  test('detects missing content translation key', async () => {
    const paragraph = 'Content here';
    const sourceContent = `---\ntitle: "Hello"\ndescription: "World"\n---\n${paragraph}`;

    const sourcePath = path.join(tempDir, 'source.mdx');
    const targetPath = path.join(tempDir, 'non-existent-target.mdx');

    await fs.writeFile(sourcePath, sourceContent, 'utf8');

    const file: TranslationFileMetadata = {
      source: { path: sourcePath, locale: 'en-US' },
      targets: [{ path: targetPath, locale: 'zh-CN' }],
    };

    const detector = mdxChangeDetector();
    const missingKeys = await detector.getMissingContentTranslationKeys(file);
    const paragraphHash = generateHash(paragraph);
    expect(missingKeys).toMatchInlineSnapshot(`
      {
        "zh-CN": [
          "${paragraphHash}",
        ],
      }
    `);
  });
  test('detects missing content translation key when source content updated', async () => {
    const paragraph = 'Content here';
    const paragraph2 = 'Content 2 here';
    const updatedParagraph = 'Updated content here';
    const sourceContent = `---\ntitle: "Hello"\ndescription: "World"\n---\n${updatedParagraph}\n\n${paragraph2}`;
    const targetContent = `---\ntitle: "Hello"\ndescription: "World"\n---\n${paragraph}\n\n${paragraph2}`;
    const paragraphHash = generateHash(paragraph);
    const paragraph2Hash = generateHash(paragraph2);
    const updatedParagraphHash = generateHash(updatedParagraph);

    const sourcePath = path.join(tempDir, 'source.mdx');
    const targetPath = path.join(tempDir, 'target.mdx');
    const registryPath = path.join(tempDir, 'source.translens.json');

    await fs.writeFile(sourcePath, sourceContent, 'utf8');
    await fs.writeFile(targetPath, targetContent, 'utf8');
    await fs.writeFile(
      registryPath,
      JSON.stringify({
        content: { targets: { 'zh-CN': [paragraphHash, paragraph2Hash] } },
      }),
      'utf8',
    );

    const file: TranslationFileMetadata = {
      source: { path: sourcePath, locale: 'en-US' },
      targets: [{ path: targetPath, locale: 'zh-CN' }],
    };

    const detector = mdxChangeDetector();
    const missingKeys = await detector.getMissingContentTranslationKeys(file);

    expect(missingKeys).toMatchInlineSnapshot(`
      {
        "zh-CN": [
          "${updatedParagraphHash}",
        ],
      }
    `);
  });
  test('detects missing content translation key when new paragraph added', async () => {
    const paragraph = 'Content here';
    const paragraph2 = 'Content 2 here';
    const sourceContent = `---\ntitle: "Hello"\ndescription: "World"\n---\n${paragraph}\n\n${paragraph2}`;
    const targetContent = `---\ntitle: "Hello"\ndescription: "World"\n---\n${paragraph}`;
    const paragraphHash = generateHash(paragraph);
    const paragraph2Hash = generateHash(paragraph2);

    const sourcePath = path.join(tempDir, 'source.mdx');
    const targetPath = path.join(tempDir, 'target.mdx');
    const registryPath = path.join(tempDir, 'source.translens.json');

    await fs.writeFile(sourcePath, sourceContent, 'utf8');
    await fs.writeFile(targetPath, targetContent, 'utf8');
    await fs.writeFile(
      registryPath,
      JSON.stringify({
        content: { targets: { 'zh-CN': [paragraphHash] } },
      }),
      'utf8',
    );

    const file: TranslationFileMetadata = {
      source: { path: sourcePath, locale: 'en-US' },
      targets: [{ path: targetPath, locale: 'zh-CN' }],
    };

    const detector = mdxChangeDetector();
    const missingKeys = await detector.getMissingContentTranslationKeys(file);

    expect(missingKeys).toMatchInlineSnapshot(`
      {
        "zh-CN": [
          "${paragraph2Hash}",
        ],
      }
    `);
  });
});
