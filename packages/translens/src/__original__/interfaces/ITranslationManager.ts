import { ConfigGroupPathItem } from '../../config/types';
import { IFileHandler } from './IFileHandler';

export interface ITranslationManager {
  translate(
    file: ConfigGroupPathItem,
    targetLocales: string[],
    fileHandler: IFileHandler,
  ): Promise<void>;
}
