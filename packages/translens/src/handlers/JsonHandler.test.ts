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
      localeConfig: {
        source: 'en-US',
        target: ['pt-BR', 'zh-CN'],
      },
      groups: [
        {
          name: 'example',
          type: 'json',
          files: [
            {
              source: '.src/locales/en-US.json',
              target: '.src/locales/example/{locale}.json',
            },
          ],
        },
      ],
    };
    jsonHandler = new JsonHandler();
  });

  describe('translate()', () => {
    it('should read and write JSON file content', async () => {
      const mockFile = {
        source: '/mock/path/en-US.json',
        target: '/mock/path/pt-BR.json',
      };
      const mockContent = { key: 'value' };

      vi.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify(mockContent));
      vi.spyOn(fs, 'existsSync').mockReturnValue(false);
      vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});

      await jsonHandler.translate(mockFile, 'pt-BR');

      expect(fs.readFileSync).toHaveBeenCalledWith(
        '/mock/path/en-US.json',
        'utf-8',
      );
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        '/mock/path/pt-BR.json',
        JSON.stringify(mockContent, null, 2),
        'utf-8',
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
  });
});
