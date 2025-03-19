import * as fs from 'fs/promises';
import * as path from 'path';
import os from 'os';
import jsonChangeDetector from './json-change-detector';
import { TranslationFileMetadata } from '../core/types';

describe('jsonChangeDetector', () => {
  let tempDir: string;

  beforeAll(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'json-change-detector-'));
  });

  afterAll(async () => {
    await fs.rm(tempDir, { recursive: true, force: true });
  });

  test('detects missing keys in target files', async () => {
    const sourceData = {
      key1: 'value1',
      key2: 'value2',
      key3: 'value3',
    };
    const targetDataZhCN = {
      key1: 'value1',
      key3: 'value3', // missing key2
    };

    const sourcePath = path.join(tempDir, 'source.json');
    const targetPathZhCN = path.join(tempDir, 'target-zh-CN.json');
    const targetPathJaJP = path.join(tempDir, 'target-ja-JP.json');

    await fs.writeFile(sourcePath, JSON.stringify(sourceData), 'utf8');
    await fs.writeFile(targetPathZhCN, JSON.stringify(targetDataZhCN), 'utf8');

    const file: TranslationFileMetadata = {
      source: { path: sourcePath, locale: 'en-US' },
      targets: [
        { path: targetPathZhCN, locale: 'zh-CN' },
        { path: targetPathJaJP, locale: 'ja-JP' },
      ],
    };

    const detector = jsonChangeDetector();
    const changedKeys = await detector.getMissingTranslationKeys(file);

    expect(changedKeys).toMatchInlineSnapshot(`
      {
        "ja-JP": [
          "key1",
          "key2",
          "key3",
        ],
        "zh-CN": [
          "key2",
        ],
      }
    `);
  });
});
