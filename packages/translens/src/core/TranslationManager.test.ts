import TranslationManager from './TranslationManager';
import {
  IChangeDetector,
  IFileHandler,
  IFileRegistryManager,
} from '../interfaces';

describe('TranslationManager', () => {
  let changeDetector: IChangeDetector;
  let registryManager: IFileRegistryManager;
  let fileHandler: IFileHandler;
  let translationManager: TranslationManager;

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
      isHashEqual: vi.fn((hash1, hash2) => hash1 === hash2),
    };

    registryManager = {
      load: vi.fn().mockResolvedValue({
        hashes: { key1: 'old_hash' },
        translatedLocales: ['fr'],
      }),
      getRegistryPath: vi.fn(),
      save: vi.fn().mockResolvedValue(undefined),
    };

    fileHandler = {
      readFileContent: vi
        .fn()
        .mockResolvedValue({ key1: 'Hello', key2: 'World' }),
      writeFile: vi.fn().mockResolvedValue(undefined),
      extractTranslatableContent: vi.fn(),
      rebuildContent: vi.fn(),
      hasFileChanged: vi.fn(),
    };

    translationManager = new TranslationManager(
      changeDetector,
      registryManager,
    );
  });

  test('should translate file and update registry', async () => {
    const file = { source: 'source.json', target: 'target_{locale}.json' };
    const targetLocales = ['es', 'de'];

    await translationManager.translate(file, targetLocales, fileHandler);

    // Verify file content was read
    expect(fileHandler.readFileContent).toHaveBeenCalledWith('source.json');

    // Verify registry was loaded
    expect(registryManager.load).toHaveBeenCalledWith('source.json');

    // Verify changed keys were calculated
    expect(changeDetector.getChangedKeys).toHaveBeenCalled();

    // Verify translations were written for each locale
    expect(fileHandler.writeFile).toHaveBeenCalledTimes(2);
    expect(fileHandler.writeFile).toHaveBeenCalledWith(
      'target_{locale}.json',
      'es',
      { key1: 'Hello', key2: 'World' },
    );
    expect(fileHandler.writeFile).toHaveBeenCalledWith(
      'target_{locale}.json',
      'de',
      { key1: 'Hello', key2: 'World' },
    );

    // Verify registry was updated
    expect(registryManager.save).toHaveBeenCalledWith('source.json', {
      hashes: { key1: 'hash_key1', key2: 'hash_key2' },
      hash: 'hash_{"key1":"Hello","key2":"World"}',
      translatedLocales: ['fr', 'es', 'de'],
    });
  });

  test('should only translate changed keys if locale exists in registry', async () => {
    registryManager.load = vi.fn().mockResolvedValue({
      hashes: { key1: 'old_hash', key2: 'hash_key2' },
      translatedLocales: ['es'],
    });

    changeDetector.getChangedKeys = vi.fn().mockReturnValue(['key1']);

    const file = { source: 'source.json', target: 'target_{locale}.json' };
    const targetLocales = ['es'];

    await translationManager.translate(file, targetLocales, fileHandler);

    expect(fileHandler.writeFile).toHaveBeenCalledWith(
      'target_{locale}.json',
      'es',
      { key1: 'Hello' },
    );
  });
});
