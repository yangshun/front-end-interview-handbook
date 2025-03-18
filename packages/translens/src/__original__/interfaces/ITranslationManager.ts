import { IConfigPathItem } from '../../config/types';
import { IFileHandler } from './IFileHandler';

export interface ITranslationManager {
  translate(
    file: IConfigPathItem,
    targetLocales: string[],
    fileHandler: IFileHandler,
  ): Promise<void>;
}
