import fs from 'fs';
import { log } from '@clack/prompts';
import JSON5 from 'json5';

import { ConfigType } from './types';
import { CONFIG_PATH } from '../core/constants';

export const DEFAULT_CONFIG: ConfigType = {
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
        'Configuration file not found. Run `langnostic init` to create one.',
      );
    }

    const configFile = fs.readFileSync(this.configPath, 'utf-8');
    this.config = JSON5.parse(configFile) as ConfigType;
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
