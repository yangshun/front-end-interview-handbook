import fs from 'fs';
import { JsonHandler } from '../handlers/JsonHandler';
import { IConfigFile } from '../types/config';
import { IFileRegistryManager } from '../interfaces/IFileRegistryManager';
import { vi } from 'vitest';

// Mock `fs` functions
vi.mock('fs');

const mockRegistryManager: IFileRegistryManager = {
  load: vi.fn().mockResolvedValue({ translatedLocales: [] }),
  save: vi.fn().mockResolvedValue(undefined),
  getRegistryPath: vi.fn().mockRejectedValue(''),
};

describe('JsonHandler', () => {
  let jsonHandler: JsonHandler;

  beforeEach(() => {
    vi.clearAllMocks();
    jsonHandler = new JsonHandler(mockRegistryManager);
  });

  describe('translate()', () => {
    it('should read, write JSON file content and update the registry', async () => {
      const mockFile: IConfigFile = {
        source: '/mock/path/en-US.json',
        target: '/mock/path/{locale}.json',
      };
      const mockContent = { key: 'value' };

      vi.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify(mockContent));
      vi.spyOn(fs, 'existsSync').mockReturnValue(false);
      vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});

      await jsonHandler.translate(mockFile, ['pt-BR']);

      expect(fs.readFileSync).toHaveBeenCalledWith(
        '/mock/path/en-US.json',
        'utf-8',
      );
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        '/mock/path/pt-BR.json',
        JSON.stringify(mockContent, null, 2),
        'utf-8',
      );
      expect(mockRegistryManager.save).toHaveBeenCalledWith(
        '/mock/path/en-US.json',
        expect.objectContaining({
          translatedLocales: ['pt-BR'],
        }),
      );
    });
  });

  describe('readFileContent()', () => {
    it('should read and parse JSON file content', async () => {
      const filePath = '/mock/path/en-US.json';
      const mockContent = { key: 'value' };
      vi.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify(mockContent));

      const result = await (jsonHandler as any).readFileContent(filePath);

      expect(result).toEqual(mockContent);
      expect(fs.readFileSync).toHaveBeenCalledWith(filePath, 'utf-8');
    });

    it('should throw an error when file reading fails', async () => {
      const filePath = '/mock/path/en-US.json';
      vi.spyOn(fs, 'readFileSync').mockImplementation(() => {
        throw new Error('File not found');
      });

      await expect(
        (jsonHandler as any).readFileContent(filePath),
      ).rejects.toThrow('Error reading file: File not found');
    });
  });

  describe('writeFile()', () => {
    it('should create a new file if it does not exist', async () => {
      const filePath = '/mock/path/{locale}.json';
      const targetLocale = 'pt-BR';
      const newContent = { hello: 'bonjour' };
      const finalPath = filePath.replace('{locale}', targetLocale);

      vi.spyOn(fs, 'existsSync').mockReturnValue(false);
      vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});

      await (jsonHandler as any).writeFile(filePath, targetLocale, newContent);

      expect(fs.writeFileSync).toHaveBeenCalledWith(
        finalPath,
        JSON.stringify(newContent, null, 2),
        'utf-8',
      );
    });

    it('should merge existing content with new content', async () => {
      const filePath = '/mock/path/{locale}.json';
      const targetLocale = 'pt-BR';
      const finalPath = filePath.replace('{locale}', targetLocale);
      const existingContent = { greeting: 'bonjour' };
      const newContent = { farewell: 'au revoir' };
      const mergedContent = { ...existingContent, ...newContent };

      vi.spyOn(fs, 'existsSync').mockReturnValue(true);
      vi.spyOn(fs, 'readFileSync').mockReturnValue(
        JSON.stringify(existingContent),
      );
      vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});

      await (jsonHandler as any).writeFile(filePath, targetLocale, newContent);

      expect(fs.writeFileSync).toHaveBeenCalledWith(
        finalPath,
        JSON.stringify(mergedContent, null, 2),
        'utf-8',
      );
    });
  });
});
