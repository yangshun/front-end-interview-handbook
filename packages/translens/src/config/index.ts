import fs from 'fs';
import path from 'path';
import { IConfig } from '../interfaces';
import { log } from '@clack/prompts';

export const CONFIG_PATH = path.join(process.cwd(), 'translens.config.json');

const DEFAULT_CONFIG: IConfig = {
  source: 'en-US',
  paths: ['./src/locales'],
  cache: '.file-registry.json',
  locales: ['pt-BR', 'zh-CN'],
  mdxConfig: {
    excludeFrontMatter: [],
  },
};

export default class Config {
  private configPath: string;
  private config = DEFAULT_CONFIG;

  constructor(configPath = CONFIG_PATH) {
    this.configPath = configPath;
    this.loadConfig();
  }
  private loadConfig() {
    if (!fs.existsSync(this.configPath)) {
      throw new Error(
        'Configuration file not found. Run `translens init` to create one.',
      );
    }

    const configFile = fs.readFileSync(this.configPath, 'utf-8');
    this.config = JSON.parse(configFile) as IConfig;
  }

  public getConfig() {
    return this.config;
  }

  public static initializeConfig(configPath = CONFIG_PATH) {
    if (!fs.existsSync(configPath)) {
      fs.writeFileSync(configPath, JSON.stringify(DEFAULT_CONFIG, null, 2));
      log.info(`Default configuration created at ${configPath}`);
    } else {
      log.info('Configuration file already exists.');
    }
  }
}
