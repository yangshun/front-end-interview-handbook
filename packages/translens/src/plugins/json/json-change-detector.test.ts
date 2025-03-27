import * as fs from 'fs/promises';
import * as path from 'path';
import os from 'os';
import { TranslationFileMetadata } from '../../core/types';
import { __test__ } from './json-change-detector';

describe('jsonChangeDetector', () => {
  const { compareJsonData } = __test__;

  test('detects new keys in source file', async () => {
    const sourceJson = {
      key1: 'value1',
      key2: 'value2',
      key3: 'value3',
    };
    const targetJson = {
      key1: 'value1',
      key3: 'value3',
    };

    const changes = compareJsonData(sourceJson, targetJson);

    expect(changes.keysToTranslate).toEqual(['key2']);
    expect(changes.removedKeys).toEqual([]);
  });

  test('detects removed keys from source files', async () => {
    const sourceJson = {
      key1: 'value1',
      key2: 'value2',
    };
    const targetJson = {
      key1: 'value1',
      key2: 'value2',
      key3: 'value3',
    };

    const changes = compareJsonData(sourceJson, targetJson);

    expect(changes.keysToTranslate).toEqual([]);
    expect(changes.removedKeys).toEqual(['key3']);
  });

  test('detects new and removed keys from source files', async () => {
    const sourceJson = {
      key1: 'value1',
      key3: 'value3',
    };
    const targetJson = {
      key1: 'value1',
      key2: 'value2',
    };

    const changes = compareJsonData(sourceJson, targetJson);

    expect(changes.keysToTranslate).toEqual(['key3']);
    expect(changes.removedKeys).toEqual(['key2']);
  });
});
