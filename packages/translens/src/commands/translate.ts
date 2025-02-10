import { spinner, log } from '@clack/prompts';
import chalk from 'chalk';

import Config from '../config';
import { JsonHandler } from '../handlers';
import FileEnumerator from '../lib/FileEnumerator';
import FileRegistryManager from '../core/FileRegistryManager';
import ChangeDetector from '../core/ChangeDetector';
import { IConfig, IConfigGroup } from '../types/config';
import {
  IFileHandler,
  IFileRegistryManager,
  ITranslationManager,
} from '../interfaces';
import TranslationManager from '../core/TranslationManager';
import DeepSeekTranslationService from '../translation/DeepSeekTranslationService';

export async function translate() {
  const config = new Config().getConfig();
  const registryManager = new FileRegistryManager();
  const changeDetector = new ChangeDetector();
  const jsonHandler = new JsonHandler(changeDetector, registryManager);
  const translationService = new DeepSeekTranslationService();
  const translationManager = new TranslationManager(
    changeDetector,
    registryManager,
    translationService,
  );

  const translationSpinner = spinner();
  translationSpinner.start(chalk.blue('🔍 Searching for files...'));

  // Find all source files to translate
  const filesToTranslate = await findFilesToTranslate(
    config,
    registryManager,
    jsonHandler,
  );

  translationSpinner.stop(
    filesToTranslate.length === 0
      ? chalk.yellow('⚠ No files found for translation.')
      : chalk.green(`✅ Found ${filesToTranslate.length} file(s) to process.`),
  );

  if (filesToTranslate.length === 0) return;

  translationSpinner.start(`Translating ${filesToTranslate.length} files...`);
  await translateFiles(filesToTranslate, jsonHandler, translationManager);

  translationSpinner.stop();
}

async function findFilesToTranslate(
  config: IConfig,
  registryManager: IFileRegistryManager,
  jsonHandler: IFileHandler,
) {
  const files = await Promise.all(
    config.groups.flatMap((group) => {
      if (group.type !== 'json') return []; // Only process JSON files for now

      return group.files.map(async (file) => {
        const { sourceLocale, targetLocales } = getLocaleConfig(group, config);
        const finalTargetLocales = targetLocales.filter(
          (locale) => locale !== sourceLocale,
        ); // For safety, filter out the source locale from the target locales
        const targetFilePaths = finalTargetLocales.map((targetLocale) =>
          file.target.replace('{locale}', targetLocale),
        ); // replace {locale} placeholder with target locale

        // Find all files to translate excluding the ignore files from config and target files
        const fileEnumerator = new FileEnumerator(
          file.source,
          targetFilePaths,
          file.ignore,
        );
        const files = await fileEnumerator.enumerateFiles();

        const filteredFiles = await Promise.all(
          files.map(async (sourceFile) => {
            const [registry, hasFileChanged] = await Promise.all([
              registryManager.load(sourceFile),
              jsonHandler.hasFileChanged(sourceFile),
            ]);

            const translatedLocales = new Set(
              registry?.translatedLocales ?? [],
            );
            const localesNotPresentInRegistry = targetLocales.filter(
              (key) => !translatedLocales.has(key),
            );

            // Filtered out unchanged file or if there is no new locale to be translated for
            return !hasFileChanged && localesNotPresentInRegistry.length === 0
              ? null
              : sourceFile;
          }),
        );

        return filteredFiles
          .filter((file) => file != null)
          .flatMap((sourceFile) => ({
            source: sourceFile,
            targetLocales: finalTargetLocales,
            excludeKeys: file.excludeKeys,
            target: file.target,
          }));
      });
    }),
  );

  return files.flat();
}

function getLocaleConfig(group: IConfigGroup, config: IConfig) {
  const sourceLocale = group.localeConfig?.source || config.localeConfig.source; // Override the default locale config if provided
  const targetLocales =
    group.localeConfig?.target || config.localeConfig.target; // Override the default locale config if provided
  return { sourceLocale, targetLocales };
}

async function translateFiles(
  filesToTranslate: {
    target: string;
    source: string;
    targetLocales: string[];
    excludeKeys: string[] | undefined;
  }[],
  jsonHandler: IFileHandler,
  translationManager: ITranslationManager,
) {

  await Promise.all(
    filesToTranslate.map(async (file) => {
      try {
        if (file.source.endsWith('.json')) {
          await translationManager.translate(
            {
              source: file.source,
              target: file.target,
              excludeKeys: file.excludeKeys,
            },
            file.targetLocales,
            jsonHandler,
          );
        }
      } catch (error: any) {
        log.error(
          `❌ Error translating file ${chalk.red(file.source)} to ${file.targetLocales.join(', ')}: ${error.message}`,
        );
      }
    }),
  );
}
