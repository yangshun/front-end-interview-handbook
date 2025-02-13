import fs from 'fs';
import TranslationManager from './TranslationManager';
import {
  IChangeDetector,
  IFileHandler,
  IFileRegistryManager,
  ITranslationManager,
  ITranslationService,
} from '../interfaces';

describe('TranslationManager', () => {
  let changeDetector: IChangeDetector;
  let registryManager: IFileRegistryManager;
  let fileHandler: IFileHandler;
  let translationService: ITranslationService;
  let translationManager: ITranslationManager;

  beforeEach(() => {
    changeDetector = {
      generateHash: vi.fn((content) => `hash_${content}`),
      generateKeyHashes: vi.fn((content) => {
        return Object.keys(content).reduce(
          (acc, key) => {
            acc[key] = `hash_${key}`;
            return acc;
          },
          {} as Record<string, string>,
        );
      }),
      getChangedKeys: vi.fn((currentHashes, cachedHashes) => {
        return Object.keys(currentHashes).filter(
          (key) => cachedHashes[key] !== currentHashes[key],
        );
      }),
      getUpdatedHashes: vi.fn((cachedHashes, currentHashes) => ({
        ...cachedHashes,
        ...currentHashes,
      })),
      isHashEqual: vi.fn(),
    };

    registryManager = {
      load: vi.fn().mockResolvedValue({
        hashes: { key1: 'old_hash' },
        translatedLocales: ['fr'],
      }),
      save: vi.fn().mockResolvedValue(undefined),
      getRegistryPath: vi.fn(),
    };

    fileHandler = {
      readFileContent: vi
        .fn()
        .mockResolvedValue({ key1: 'Hello', key2: 'World', key3: 'ExcludeMe' }),
      writeFile: vi.fn().mockResolvedValue(undefined),
      hasFileChanged: vi.fn(),
      rebuildContent: vi.fn(),
      extractTranslatableContent: vi.fn(),
    };

    translationService = {
      translate: vi.fn(async (content, locale) => {
        return Object.fromEntries(
          Object.entries(content).map(([key, value]) => [
            key,
            `${value}_${locale}`,
          ]),
        );
      }),
    };

    vi.spyOn(fs, 'readFileSync').mockReturnValue(
      JSON.stringify({ key1: 'Hello', key2: 'World', key3: 'ExcludeMe' }),
    );

    translationManager = new TranslationManager(
      changeDetector,
      registryManager,
      translationService,
    );
  });

  test('should translate file and update registry with excluded keys handling', async () => {
    const file = {
      source: 'source.json',
      target: 'target_{locale}.json',
      excludeKeys: ['key3'],
    };
    const targetLocales = ['es', 'de'];

    await translationManager.translate(file, targetLocales, fileHandler);

    expect(fileHandler.readFileContent).toHaveBeenCalledWith('source.json');
    expect(registryManager.load).toHaveBeenCalledWith('source.json');
    expect(changeDetector.getChangedKeys).toHaveBeenCalled();

    expect(fileHandler.writeFile).toHaveBeenCalledWith(
      'target_es.json',
      'es',
      JSON.stringify({ key1: 'Hello', key2: 'World', key3: 'ExcludeMe' }),
      { key1: 'Hello_es', key2: 'World_es', key3: 'ExcludeMe' },
      [],
    );
    expect(fileHandler.writeFile).toHaveBeenCalledWith(
      'target_de.json',
      'de',
      JSON.stringify({ key1: 'Hello', key2: 'World', key3: 'ExcludeMe' }),
      { key1: 'Hello_de', key2: 'World_de', key3: 'ExcludeMe' },
      [],
    );

    expect(registryManager.save).toHaveBeenCalledWith('source.json', {
      hashes: { key1: 'hash_key1', key2: 'hash_key2', key3: 'hash_key3' },
      hash: 'hash_{"key1":"Hello","key2":"World","key3":"ExcludeMe"}',
      translatedLocales: ['fr', 'es', 'de'],
    });
  });

  test('should only translate changed keys if locale exists in registry', async () => {
    registryManager.load = vi.fn().mockResolvedValue({
      hashes: { key1: 'old_hash', key2: 'hash_key2' },
      translatedLocales: ['es'],
    });

    changeDetector.getChangedKeys = vi.fn().mockReturnValue(['key1']);

    const file = {
      source: 'source.json',
      target: 'target_{locale}.json',
    };
    const targetLocales = ['es'];

    await translationManager.translate(file, targetLocales, fileHandler);

    expect(fileHandler.writeFile).toHaveBeenCalledWith(
      'target_es.json',
      'es',
      JSON.stringify({ key1: 'Hello', key2: 'World', key3: 'ExcludeMe' }),
      { key1: 'Hello_es' },
      [],
    );
  });
});
