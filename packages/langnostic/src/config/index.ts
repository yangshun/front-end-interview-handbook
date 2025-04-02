import fs from 'fs';
import { log } from '@clack/prompts';
import { cosmiconfigSync } from 'cosmiconfig';

import { ConfigType } from './types';
import { configDefault } from './config-default';
import path from 'path';

const moduleName = 'langnostic';
const configExplorerSync = cosmiconfigSync(moduleName, {
  searchPlaces: [
    `${moduleName}.config.json`,
    `${moduleName}.config.ts`,
    `${moduleName}.config.js`,
  ],
  searchStrategy: 'project',
});

export default class Config {
  #config: ConfigType;

  constructor(searchFrom?: string) {
    const result = configExplorerSync.search(searchFrom);

    if (result == null) {
      throw new Error(
        'Configuration file not found. Run `langnostic init` to create one.',
      );
    }

    this.#config = result.config as ConfigType;
  }

  get config(): ConfigType {
    return this.#config;
  }

  public static initializeConfig(searchPath?: string): void {
    const result = configExplorerSync.search(searchPath);

    if (result == null) {
      const configPath = path.join(
        searchPath ?? process.cwd(),
        'langnostic.config.json',
      );
      fs.writeFileSync(configPath, JSON.stringify(configDefault, null, 2));
      log.info(`Default configuration created at ${configPath}`);
    } else {
      log.info('Configuration file already exists.');
    }
  }
}
