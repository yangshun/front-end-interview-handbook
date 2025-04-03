import fs from 'fs';
import path from 'path';
import { cosmiconfigSync } from 'cosmiconfig';

import { ConfigType } from './types';
import { configDefault } from './config-default';

const moduleName = 'langnostic';
const configExplorerSync = cosmiconfigSync(moduleName, {
  searchPlaces: [
    `${moduleName}.config.json`,
    `${moduleName}.config.ts`,
    `${moduleName}.config.cjs`,
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

  public static initializeConfig(
    searchPath?: string,
  ): Readonly<
    | { result: 'created'; filepath: string }
    | { result: 'exists'; filepath: string }
    | { result: 'error'; filepath: null }
  > {
    const result = configExplorerSync.search(searchPath);

    if (result != null) {
      return { result: 'exists', filepath: result.filepath };
    }

    try {
      const configPath = path.join(
        searchPath ?? process.cwd(),
        'langnostic.config.cjs',
      );
      fs.writeFileSync(
        configPath,
        `module.exports = ${JSON.stringify(configDefault, null, 2)}`,
      );
      return { result: 'created', filepath: configPath };
    } catch (error) {
      console.error(error);
    }

    return { result: 'error', filepath: null };
  }
}
