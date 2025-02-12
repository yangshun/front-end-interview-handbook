import { IFileHandler } from './IFileHandler';

export interface IPluginManager {
  registerFileHandlers(): Promise<void>;
  getFileHandlers(): Map<string, IFileHandler>;
}
