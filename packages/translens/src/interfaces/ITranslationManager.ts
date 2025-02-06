import { IConfigFile } from '../types/config';
import { IFileHandler } from './IFileHandler';

export interface ITranslationManager {
  translate(
    file: IConfigFile,
    targetLocales: string[],
    fileHandler: IFileHandler,
  ): Promise<void>;
}
