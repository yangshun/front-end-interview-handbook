import fs from 'fs';
import path from 'path';
import BaseFileHandler from './BaseFileHandler';
import { IChangeDetector, IFileRegistryManager } from '../interfaces';
import { FileRegistry } from '../types/registry';

// Mock dependencies
vi.mock('@clack/prompts', () => ({
  log: { warn: vi.fn() },
}));

// Create mock classes for dependencies
class MockChangeDetector implements IChangeDetector {
  generateKeyHashes(flattened: Record<string, string>): Record<string, string> {
    throw new Error('Method not implemented.');
  }
  getChangedKeys(
    currentHashes: Record<string, string>,
    cachedHashes: Record<string, string>,
  ): string[] {
    throw new Error('Method not implemented.');
  }
  getUpdatedHashes(
    cachedHashes: Record<string, string>,
    currentHashes: Record<string, string>,
  ): Record<string, string> {
    throw new Error('Method not implemented.');
  }
  generateHash = vi.fn();
  isHashEqual = vi.fn();
}

class MockRegistryManager implements IFileRegistryManager {
  getRegistryPath(sourceFilePath: string): string {
    throw new Error('Method not implemented.');
  }
  save(sourceFilePath: string, registry: FileRegistry): Promise<void> {
    throw new Error('Method not implemented.');
  }
  load = vi.fn();
}

// Extend BaseFileHandler for testing (since it's abstract)
class TestFileHandler extends BaseFileHandler {
  extractTranslatableContent = vi.fn().mockResolvedValue({ key: 'value' });
  rebuildContent = vi.fn().mockResolvedValue({ key: 'translated' });
}

describe('BaseFileHandler', () => {
  let fileHandler: TestFileHandler;
  let mockChangeDetector: MockChangeDetector;
  let mockRegistryManager: MockRegistryManager;

  beforeEach(() => {
    mockChangeDetector = new MockChangeDetector();
    mockRegistryManager = new MockRegistryManager();
    fileHandler = new TestFileHandler(mockChangeDetector, mockRegistryManager);

    // Properly mock `fs` methods using `vi.spyOn`
    vi.spyOn(fs, 'readFileSync').mockReturnValue('file content');
    vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    vi.spyOn(fs, 'existsSync').mockReturnValue(true);
    vi.spyOn(fs, 'mkdirSync').mockImplementation(() => '');
  });

  test('hasFileChanged should return true if file hash is different', async () => {
    mockRegistryManager.load.mockResolvedValue({ hash: 'oldHash' });
    mockChangeDetector.generateHash.mockReturnValue('newHash');
    mockChangeDetector.isHashEqual.mockReturnValue(false);

    const result = await fileHandler.hasFileChanged('test.txt');
    expect(result).toBe(true);
  });

  test('hasFileChanged should return false if file hash is the same', async () => {
    mockRegistryManager.load.mockResolvedValue({ hash: 'sameHash' });
    mockChangeDetector.generateHash.mockReturnValue('sameHash');
    mockChangeDetector.isHashEqual.mockReturnValue(true);

    const result = await fileHandler.hasFileChanged('test.txt');
    expect(result).toBe(false);
  });

  test('readFileContent should return extracted content', async () => {
    const content = await fileHandler.readFileContent('test.txt');

    expect(content).toEqual({ key: 'value' });
    expect(fileHandler.extractTranslatableContent).toHaveBeenCalledWith(
      'file content',
    );
  });

  test('writeFile should write translated content to file', async () => {
    fileHandler.rebuildContent.mockResolvedValue({ key: 'translated' });

    await fileHandler.writeFile('test-{locale}.txt', 'en', {
      key: 'translated',
    });

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      'test-en.txt',
      JSON.stringify({ key: 'translated' }, null, 2),
      'utf-8',
    );
  });

  test('writeFile should create directory if it does not exist', async () => {
    vi.spyOn(fs, 'existsSync').mockReturnValue(false);

    await fileHandler.writeFile('test-{locale}.txt', 'en', {
      key: 'translated',
    });

    expect(fs.mkdirSync).toHaveBeenCalledWith(path.dirname('test-en.txt'), {
      recursive: true,
    });
  });
});
