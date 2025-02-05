import { IConfigFile } from './IConfig';

export interface IFileHandler {
  translate(file: IConfigFile, targetLocale: string): Promise<void>;
}
