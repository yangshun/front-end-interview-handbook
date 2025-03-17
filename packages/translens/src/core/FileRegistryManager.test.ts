import fs from 'fs/promises';
import FileRegistryManager from './FileRegistryManager';

vi.mock('fs/promises');

const mockFilePath = '/path/to/sourceFile.txt';
const mockRegistryPath = '/path/to/sourceFile.translens.json';
const mockRegistryData = {
  hashes: { key: 'abcdef' },
  hash: 'abdsef',
  translatedLocales: ['pt-BR'],
};

let fileRegistryManager: FileRegistryManager;

beforeEach(() => {
  fileRegistryManager = new FileRegistryManager();
  vi.clearAllMocks();
});

describe('FileRegistryManager', () => {
  it('should load the registry file correctly', async () => {
    vi.spyOn(fs, 'readFile').mockResolvedValue(
      JSON.stringify(mockRegistryData),
    );
    const result = await fileRegistryManager.load(mockFilePath);
    expect(result).toEqual(mockRegistryData);
    expect(fs.readFile).toHaveBeenCalledWith(mockRegistryPath, 'utf-8');
  });

  it('should return null if the registry file does not exist', async () => {
    vi.spyOn(fs, 'readFile').mockRejectedValue(new Error('File not found'));
    const result = await fileRegistryManager.load(mockFilePath);
    expect(result).toBeNull();
  });

  it('should save the registry file correctly', async () => {
    vi.spyOn(fs, 'writeFile').mockResolvedValue();
    await fileRegistryManager.save(mockFilePath, mockRegistryData);
    expect(fs.writeFile).toHaveBeenCalledWith(
      mockRegistryPath,
      JSON.stringify(mockRegistryData, null, 2),
      'utf-8',
    );
  });
});
