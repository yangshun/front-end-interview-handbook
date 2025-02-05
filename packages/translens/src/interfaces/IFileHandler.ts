import { IConfigFile } from '../types/config';

export interface IFileHandler {
  translate(file: IConfigFile, targetLocales: string[]): Promise<void>;
}
