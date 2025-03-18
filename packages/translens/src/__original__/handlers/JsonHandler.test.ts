import { JsonHandler } from './JsonHandler';
import { IChangeDetector, IFileRegistryManager } from '../interfaces';

describe('JsonHandler', () => {
  let jsonHandler: JsonHandler;
  let mockChangeDetector: IChangeDetector;
  let mockFileRegistryManager: IFileRegistryManager;

  beforeEach(() => {
    // Mock dependencies
    mockChangeDetector = {
      generateHash: vi.fn(),
      getChangedKeys: vi.fn(),
      isHashEqual: vi.fn(),
      getUpdatedHashes: vi.fn(),
      generateKeyHashes: vi.fn(),
    };

    mockFileRegistryManager = {
      load: vi.fn(),
      save: vi.fn(),
    };

    // Instantiate JsonHandler with mocks
    jsonHandler = new JsonHandler(mockChangeDetector, mockFileRegistryManager);
  });

  test('should extract translatable content from a JSON string', () => {
    const jsonString = '{"key1": "Hello", "key2": "World"}';
    const extractedContent = jsonHandler.extractTranslatableContent(jsonString);

    expect(extractedContent).toEqual({ key1: 'Hello', key2: 'World' });
  });

  test('should rebuild content by merging original and translated content', async () => {
    const originalContent = '{"key1": "Hello", "key2": "World"}';
    const translatedContent = { key2: 'Mundo', key3: 'Bonjour' };

    const rebuiltContent = await jsonHandler.rebuildContent(
      originalContent,
      '',
      translatedContent,
      [],
    );

    expect(rebuiltContent).toEqual(
      JSON.stringify(
        {
          key1: 'Hello',
          key2: 'Mundo',
          key3: 'Bonjour',
        },
        null,
        2,
      ),
    );
  });

  test('should rebuild content by merging original, translated content and removing the keys which have been removed from base file', async () => {
    const originalContent =
      '{"key1": "Hello", "key2": "World", "key4": "Testing"}';
    const translatedContent = { key2: 'Mundo', key3: 'Bonjour' };
    const removedKeys = ['key4'];

    const rebuiltContent = await jsonHandler.rebuildContent(
      originalContent,
      '',
      translatedContent,
      removedKeys,
    );

    expect(rebuiltContent).toEqual(
      JSON.stringify(
        {
          key1: 'Hello',
          key2: 'Mundo',
          key3: 'Bonjour',
        },
        null,
        2,
      ),
    );
  });

  test('should rebuild content correctly when original content is empty', async () => {
    const translatedContent = { key1: 'Hola', key2: 'Bonjour' };

    const rebuiltContent = await jsonHandler.rebuildContent(
      '',
      '',
      translatedContent,
      [],
    );

    expect(rebuiltContent).toEqual(
      JSON.stringify({ key1: 'Hola', key2: 'Bonjour' }, null, 2),
    );
  });
});
