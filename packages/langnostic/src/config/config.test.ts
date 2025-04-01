import fs from 'fs';
import path from 'path';
import Config, { DEFAULT_CONFIG } from '.';
import { ConfigType } from './types';

const TEST_CONFIG_PATH = path.join(
  process.cwd(),
  'test-langnostic.config.json',
);

const mockConfig: ConfigType = DEFAULT_CONFIG;

describe('Config Class', () => {
  beforeEach(() => {
    // Cleanup any previous test config
    if (fs.existsSync(TEST_CONFIG_PATH)) {
      fs.unlinkSync(TEST_CONFIG_PATH);
    }
  });

  afterAll(() => {
    // Cleanup after tests
    if (fs.existsSync(TEST_CONFIG_PATH)) {
      fs.unlinkSync(TEST_CONFIG_PATH);
    }
  });

  test('should throw an error if config file does not exist', () => {
    expect(() => new Config(TEST_CONFIG_PATH)).toThrowError(
      'Configuration file not found. Run `langnostic init` to create one.',
    );
  });

  test('should load existing config file', () => {
    fs.writeFileSync(TEST_CONFIG_PATH, JSON.stringify(mockConfig, null, 2));

    const configInstance = new Config(TEST_CONFIG_PATH);
    expect(configInstance.getConfig()).toEqual(mockConfig);
  });

  test('should initialize default config using initializeConfig()', () => {
    Config.initializeConfig(TEST_CONFIG_PATH);
    expect(fs.existsSync(TEST_CONFIG_PATH)).toBe(true);

    const loadedConfig = JSON.parse(fs.readFileSync(TEST_CONFIG_PATH, 'utf-8'));
    expect(loadedConfig).toEqual(mockConfig);
  });

  test('should not overwrite an existing config file when initializing', () => {
    fs.writeFileSync(TEST_CONFIG_PATH, JSON.stringify(mockConfig, null, 2));

    Config.initializeConfig(TEST_CONFIG_PATH);

    const configFile = JSON.parse(fs.readFileSync(TEST_CONFIG_PATH, 'utf-8'));
    expect(configFile).toEqual(mockConfig);
  });
});
