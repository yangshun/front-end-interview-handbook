import {
  IChangeDetector,
  IFileHandler,
  IFileRegistryManager,
  ITranslationManager,
} from '../interfaces';
import { IConfigFile } from '../types/config';

export default class TranslationManager implements ITranslationManager {
  constructor(
    private changeDetector: IChangeDetector,
    private registryManager: IFileRegistryManager,
  ) {}
  /**
   * Translate a JSON file to multiple locales
   */
  async translate(
    file: IConfigFile,
    targetLocales: string[],
    fileHandler: IFileHandler,
  ): Promise<void> {
    const { source, target } = file;
    const fileContent = await fileHandler.readFileContent(source);
    const registry = await this.registryManager.load(source);
    const fileHash = this.changeDetector.generateHash(
      JSON.stringify(fileContent),
    );
    const currentHashes = this.changeDetector.generateKeyHashes(fileContent);

    const changedKeys = this.changeDetector.getChangedKeys(
      currentHashes,
      registry?.hashes || {},
    );

    // Translate the file for all the locales
    await Promise.all(
      targetLocales.map(async (locale) => {
        // if the target locale has its corresponding translated file, then only translate the changed values
        const translationContent = registry?.translatedLocales.includes(locale)
          ? changedKeys.reduce(
              (acc, key) => {
                if (key in fileContent) {
                  acc[key] = fileContent[key];
                }
                return acc;
              },
              {} as Record<string, string>,
            )
          : fileContent;

        await fileHandler.writeFile(target, locale, translationContent);
      }),
    );

    // Update registry
    const newRegistry = {
      hashes: this.changeDetector.getUpdatedHashes(
        registry?.hashes || {},
        currentHashes,
      ),
      hash: fileHash,
      translatedLocales: [
        ...new Set([...(registry?.translatedLocales || []), ...targetLocales]),
      ],
    };

    await this.registryManager.save(source, newRegistry);
  }
}
