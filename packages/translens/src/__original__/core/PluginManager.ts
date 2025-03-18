import path from 'path';

import {
  IChangeDetector,
  IFileHandler,
  IFileRegistryManager,
  IPluginManager,
} from '../interfaces';
import BaseFileHandler from './BaseFileHandler';
import { IConfig } from '../../config/types';

export class PluginManager implements IPluginManager {
  constructor(
    private config: IConfig,
    private changeDetector: IChangeDetector,
    private registryManager: IFileRegistryManager,
  ) {}
  private fileHandlers: Map<string, IFileHandler> = new Map();

  async registerFileHandlers(): Promise<void> {
    await this.loadFileHandlers();
  }

  private async loadFileHandlers() {
    if (!this.config.plugin?.handlers) {
      return;
    }

    for (const fileHandler of this.config.plugin.handlers) {
      try {
        const absolutePath = path.resolve(fileHandler.handlerFilePath);
        const handlerModule = await import(absolutePath);
        const HandlerClass = handlerModule.default;

        if (
          typeof HandlerClass === 'function' &&
          Object.prototype.isPrototypeOf.call(BaseFileHandler, HandlerClass)
        ) {
          const handler = new HandlerClass(
            this.changeDetector,
            this.registryManager,
          );
          this.fileHandlers.set(fileHandler.name, handler);
        } else {
          throw new Error(
            `❌ Invalid file handler: ${fileHandler.handlerFilePath} (Does not extend BaseFileHandler)`,
          );
        }
      } catch (error: any) {
        throw new Error(
          `❌ Error loading handler: ${fileHandler.handlerFilePath}: ${error.message}`,
        );
      }
    }
  }

  getFileHandlers() {
    return this.fileHandlers;
  }
}
