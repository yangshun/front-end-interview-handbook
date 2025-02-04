export interface IFileHandler {
  translate(filePath: string, locales: string[]): Promise<void>;
}
