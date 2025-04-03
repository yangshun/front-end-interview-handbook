import fs from 'fs';
import path from 'path';

import Config from '.';
import { ConfigType } from './types';

const FIXTURE_PATH = path.join(process.cwd(), '__fixture__');

const mockConfig: ConfigType = {
  provider: 'openai',
  localeConfig: {
    source: 'en-US',
    target: ['zh-CN'],
  },
  groups: [
    {
      name: 'app-strings',
      plugin: 'json',
      paths: [
        {
          source: './src/en-US.json',
          target: './src/{locale}.json',
        },
      ],
    },
  ],
};

describe('Config', () => {
  afterAll(() => {
    fs.rmSync(path.join(process.cwd(), '__fixture__'), { recursive: true });
  });

  describe('constructor', () => {
    test('should throw an error if config file does not exist', () => {
      expect(() => new Config()).toThrowError(
        'Configuration file not found. Run `langnostic init` to create one.',
      );
    });

    test('should load existing config file', () => {
      const dir = path.join(FIXTURE_PATH, 'loading');
      fs.mkdirSync(dir, {
        recursive: true,
      });
      fs.writeFileSync(
        path.join(dir, 'langnostic.config.json'),
        JSON.stringify(mockConfig, null, 2),
      );

      const configInstance = new Config(dir);
      expect(configInstance.config).toEqual(mockConfig);
    });
  });

  describe('initializeConfig', () => {
    test('should initialize default config', () => {
      const dir = path.join(FIXTURE_PATH, 'init');
      fs.mkdirSync(dir, {
        recursive: true,
      });

      const { result } = Config.initializeConfig(dir);
      expect(result).toEqual('created');

      const configPath = path.join(dir, 'langnostic.config.cjs');
      expect(fs.existsSync(configPath)).toBe(true);
    });

    test('should not overwrite an existing config file when initializing', () => {
      const dir = path.join(FIXTURE_PATH, 'overwrite');
      fs.mkdirSync(dir, {
        recursive: true,
      });

      const configPath = path.join(dir, 'langnostic.config.json');
      fs.writeFileSync(configPath, JSON.stringify(mockConfig, null, 2));

      const { result } = Config.initializeConfig(dir);
      expect(result).toEqual('exists');

      const configFile = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
      expect(configFile).toEqual(mockConfig);
    });
  });
});
