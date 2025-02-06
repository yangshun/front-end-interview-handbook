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
      getRegistryPath: vi.fn(),
    };

    // Instantiate JsonHandler with mocks
    jsonHandler = new JsonHandler(mockChangeDetector, mockFileRegistryManager);
  });

  test('should extract translatable content from a JSON string', () => {
    const jsonString = '{"key1": "Hello", "key2": "World"}';
    const extractedContent = jsonHandler.extractTranslatableContent(jsonString);

    expect(extractedContent).toEqual({ key1: 'Hello', key2: 'World' });
  });

  test('should rebuild content by merging original and translated content', () => {
    const originalContent = '{"key1": "Hello", "key2": "World"}';
    const translatedContent = { key2: 'Mundo', key3: 'Bonjour' };

    const rebuiltContent = jsonHandler.rebuildContent(
      originalContent,
      translatedContent,
    );

    expect(rebuiltContent).toEqual({
      key1: 'Hello',
      key2: 'Mundo',
      key3: 'Bonjour',
    });
  });

  test('should rebuild content correctly when original content is empty', () => {
    const translatedContent = { key1: 'Hola', key2: 'Bonjour' };

    const rebuiltContent = jsonHandler.rebuildContent(null, translatedContent);

    expect(rebuiltContent).toEqual({ key1: 'Hola', key2: 'Bonjour' });
  });
});
