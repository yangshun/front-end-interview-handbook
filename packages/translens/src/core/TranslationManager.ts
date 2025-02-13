import fs from 'fs';
import { log } from '@clack/prompts';
import {
  IChangeDetector,
  IFileHandler,
  IFileRegistryManager,
  ITranslationManager,
  ITranslationService,
} from '../interfaces';
import { IConfigFile } from '../types/config';

export default class TranslationManager implements ITranslationManager {
  constructor(
    private changeDetector: IChangeDetector,
    private registryManager: IFileRegistryManager,
    private translationService: ITranslationService,
  ) {}
  /**
   * Translate a JSON file to multiple locales
   */
  async translate(
    file: IConfigFile,
    targetLocales: string[],
    fileHandler: IFileHandler,
  ): Promise<void> {
    const { source, target, excludeKeys } = file;
    const [fileContent, registry] = await Promise.all([
      fileHandler.readFileContent(source),
      this.registryManager.load(source),
    ]);
    const baseFileContent = fs.readFileSync(source, 'utf-8');

    const fileHash = this.changeDetector.generateHash(
      JSON.stringify(fileContent),
    );
    const currentHashes = this.changeDetector.generateKeyHashes(fileContent);

    const changedKeys = this.changeDetector.getChangedKeys(
      currentHashes,
      registry?.hashes || {},
    );

    // Extract excluded content before translation
    const excludedContent: Record<string, string> = {};
    if (excludeKeys) {
      for (const key of excludeKeys) {
        if (key in fileContent) {
          excludedContent[key] = fileContent[key];
          delete fileContent[key];
        }
      }
    }

    // Get list of removed keys by comparing current keys with registry keys
    const currentKeys = new Set(Object.keys(fileContent));
    const registryKeys = new Set(Object.keys(registry?.hashes || {}));
    const removedKeys = [...registryKeys].filter(
      (key) => !currentKeys.has(key),
    );

    // Keep track of translated locales
    const successfulLocales: string[] = [];
    const failedLocales: string[] = [];

    // Translate the file for all the locales
    await Promise.all(
      targetLocales.map(async (locale) => {
        const targetPath = target.replace('{locale}', locale);
        // Check if the target locale file exists
        const targetLocaleFileExist = fs.existsSync(targetPath);
        // if the target locale has its corresponding translated file, then only translate the changed values
        const translationContent =
          registry?.translatedLocales.includes(locale) || targetLocaleFileExist
            ? changedKeys.reduce(
                (acc, key) => {
                  if (key in fileContent && !excludeKeys?.includes(key)) {
                    acc[key] = fileContent[key];
                  }
                  return acc;
                },
                {} as Record<string, string>,
              )
            : fileContent;

        if (Object.keys(translationContent).length === 0) {
          return;
        }

        try {
          const translatedContent = await this.translationService.translate(
            translationContent,
            locale,
          );

          // Merge back excluded content
          const finalContent = {
            ...translatedContent,
            ...excludedContent, // Add back excluded keys with original values
          };
          await fileHandler.writeFile(
            targetPath,
            locale,
            baseFileContent,
            finalContent,
            removedKeys,
          );
          log.success(`✅ Successfully translated file ${source} to ${locale}`);
          successfulLocales.push(locale);
        } catch (error: any) {
          failedLocales.push(locale);
          log.error(
            `❌ Error translating file ${source} to ${locale}: ${error.message}`,
          );
        }
      }),
    );

    // Removed the locale for which translation failed, so that it can be re-detected
    const registryTranslatedLocales = [
      ...new Set([
        ...(registry?.translatedLocales || []),
        ...successfulLocales,
      ]),
    ].filter((locale) => !failedLocales.includes(locale));

    // Update registry
    const newRegistry = {
      hashes: this.changeDetector.getUpdatedHashes(
        registry?.hashes || {},
        currentHashes,
      ),
      hash: fileHash,
      translatedLocales: registryTranslatedLocales,
    };

    await this.registryManager.save(source, newRegistry);
  }
}
