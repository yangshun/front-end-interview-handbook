import { cosmiconfigSync } from 'cosmiconfig';
import fs from 'fs';
import path from 'path';

import { configDefault } from './config-default';
import type { ConfigType } from './types';

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
    { filepath: null; result: 'error'; } | { filepath: string; result: 'created'; } | { filepath: string; result: 'exists'; }
  > {
    const result = configExplorerSync.search(searchPath);

    if (result != null) {
      return { filepath: result.filepath, result: 'exists' };
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

      return { filepath: configPath, result: 'created' };
    } catch (error) {
      console.error(error);
    }

    return { filepath: null, result: 'error' };
  }
}
