import fs from 'fs';
import { JsonHandler } from '../handlers/JsonHandler';
import { IConfig } from '../interfaces';
import { log } from '@clack/prompts';

// Mock `fs` functions
vi.mock('fs');

describe('JsonHandler', () => {
  let jsonHandler: JsonHandler;
  let mockConfig: IConfig;

  beforeEach(() => {
    vi.clearAllMocks();

    mockConfig = {
      source: 'en-US',
      paths: ['./src/locales'],
      cache: '.file-registry.json',
      locales: ['pt-BR', 'zh-CN'],
      mdxConfig: {
        excludeFrontMatter: [],
      },
    };
    jsonHandler = new JsonHandler(mockConfig);
  });

  describe('translate()', () => {
    it('should translate a JSON file and create locale versions', async () => {
      const filePath = '/mock/path/en-US.json';
      const locales = ['pt-BR', 'zh-CN', 'en-US'];

      // Mock file read
      vi.spyOn(fs, 'readFileSync').mockReturnValue(
        JSON.stringify({ key: 'value' }),
      );
      vi.spyOn(fs, 'existsSync').mockReturnValue(false);
      vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});

      await jsonHandler.translate(filePath, locales);

      expect(fs.readFileSync).toHaveBeenCalledWith(filePath, 'utf-8');
      expect(fs.writeFileSync).toHaveBeenCalledTimes(2);
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        '/mock/path/pt-BR.json',
        expect.any(String),
        'utf-8',
      );
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        '/mock/path/zh-CN.json',
        expect.any(String),
        'utf-8',
      );
    });

    it('should skip translation for the source locale', async () => {
      const filePath = '/mock/path/en-US.json';
      const locales = ['pt-BR', 'en-US']; // en-US is the source locale

      vi.spyOn(fs, 'readFileSync').mockReturnValue(
        JSON.stringify({ key: 'value' }),
      );
      vi.spyOn(fs, 'existsSync').mockReturnValue(false);
      vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});

      await jsonHandler.translate(filePath, locales);

      expect(fs.writeFileSync).toHaveBeenCalledTimes(1); // Only 'pt-BR' should be translated
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        '/mock/path/pt-BR.json',
        expect.any(String),
        'utf-8',
      );
    });

    it('should handle file read error gracefully', async () => {
      const filePath = '/mock/path/en-US.json';
      const locales = ['pt-BR'];

      vi.spyOn(fs, 'readFileSync').mockImplementation(() => {
        throw new Error('Read error');
      });

      const logErrorSpy = vi.spyOn(log, 'error').mockImplementation(() => {});

      await jsonHandler.translate(filePath, locales);

      expect(logErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('❌ Error translating file'),
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
      const filePath = '/mock/path/pt-BR.json';
      const newContent = { hello: 'bonjour' };

      vi.spyOn(fs, 'existsSync').mockReturnValue(false);
      vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});

      await (jsonHandler as any).writeFile(filePath, newContent);

      expect(fs.writeFileSync).toHaveBeenCalledWith(
        filePath,
        JSON.stringify(newContent, null, 2),
        'utf-8',
      );
    });

    it('should merge existing content with new content', async () => {
      const filePath = '/mock/path/pt-BR.json';
      const existingContent = { greeting: 'bonjour' };
      const newContent = { farewell: 'au revoir' };

      vi.spyOn(fs, 'existsSync').mockReturnValue(true);
      vi.spyOn(fs, 'readFileSync').mockReturnValue(
        JSON.stringify(existingContent),
      );
      vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});

      await (jsonHandler as any).writeFile(filePath, newContent);

      expect(fs.writeFileSync).toHaveBeenCalledWith(
        filePath,
        JSON.stringify({ greeting: 'bonjour', farewell: 'au revoir' }, null, 2),
        'utf-8',
      );
    });

    it('should log an error when writing fails', async () => {
      const filePath = '/mock/path/pt-BR.json';
      const newContent = { hello: 'bonjour' };

      vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {
        throw new Error('Write error');
      });

      await expect(
        (jsonHandler as any).writeFile(filePath, newContent),
      ).rejects.toThrow('Error writing file');

      expect(fs.writeFileSync).toHaveBeenCalledWith(
        filePath,
        expect.any(String),
        'utf-8',
      );
    });
  });
});
