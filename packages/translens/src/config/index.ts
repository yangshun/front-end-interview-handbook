import fs from 'fs';
import path from 'path';
import { log } from '@clack/prompts';
import { IConfig } from './types';
import JSON5 from 'json5';

export const CONFIG_PATH = path.join(process.cwd(), 'translens.config.json');

export const DEFAULT_CONFIG: IConfig = {
  provider: 'openai',
  localeConfig: {
    source: 'en-US',
    target: ['pt-BR', 'zh-CN'],
  },
  groups: [
    {
      name: 'example',
      plugin: 'json',
      paths: [
        {
          source: './src/locales/en-US.json',
          target: './src/locales/{locale}.json',
        },
      ],
    },
  ],
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
    this.config = JSON5.parse(configFile) as IConfig;
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
