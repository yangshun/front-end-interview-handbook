import { spinner, log } from '@clack/prompts';
import chalk from 'chalk';

import Config from '../config';
import { JsonHandler, MDXHandler } from './handlers';
import FileEnumerator from './lib/FileEnumerator';
import FileRegistryManager from './core/FileRegistryManager';
import ChangeDetector from './core/ChangeDetector';
import TranslationManager from './core/TranslationManager';
import { PluginManager } from './core/PluginManager';
import {
  IChangeDetector,
  IFileHandler,
  IFileRegistryManager,
  IPluginManager,
  ITranslationManager,
} from './interfaces';
import DeepSeekTranslationService from './translation/DeepSeekTranslationService';
import { IConfig, ConfigGroup } from '../config/types';

export async function translate() {
  const config = new Config().getConfig();
  const fileRegistryManager = new FileRegistryManager();
  const changeDetector = new ChangeDetector();

  const translationService = new DeepSeekTranslationService();
  const translationManager = new TranslationManager(
    changeDetector,
    fileRegistryManager,
    translationService,
  );

  const pluginManager = new PluginManager(
    config,
    changeDetector,
    fileRegistryManager,
  );
  await pluginManager.registerFileHandlers();

  const translationSpinner = spinner();
  translationSpinner.start(chalk.blue('🔍 Searching for files...'));

  // Find all source files to translate
  const {
    jsonHandler,
    mdxHandler,
    files: filesToTranslate,
  } = await findFilesToTranslate(
    config,
    changeDetector,
    fileRegistryManager,
    pluginManager,
  );

  translationSpinner.stop(
    filesToTranslate.length === 0
      ? chalk.yellow('⚠ No files found for translation.')
      : chalk.green(`✅ Found ${filesToTranslate.length} file(s) to process.`),
  );

  if (filesToTranslate.length === 0) {
    return;
  }

  translationSpinner.start(`Translating ${filesToTranslate.length} file(s)...`);
  await translateFiles(
    filesToTranslate,
    pluginManager,
    jsonHandler,
    mdxHandler,
    translationManager,
  );

  translationSpinner.stop();
}

async function findFilesToTranslate(
  config: IConfig,
  changeDetector: IChangeDetector,
  fileRegistryManager: IFileRegistryManager,
  pluginManager: IPluginManager,
) {
  const jsonHandler = new JsonHandler(changeDetector, fileRegistryManager);
  const mdxHandler = new MDXHandler(changeDetector, fileRegistryManager);

  const fileHandlers = pluginManager.getFileHandlers();

  const files = await Promise.all(
    config.groups.flatMap((group) => {
      const fileHandler = getFileHandler({
        jsonHandler,
        mdxHandler,
        handler: group.plugin,
        fileHandlers,
      });

      if (!fileHandler) {
        return [];
      }

      return group.paths.map(async (file) => {
        const { sourceLocale, targetLocales } = getLocaleConfig(group, config);

        // For safety, filter out the source locale from the target locales
        const finalTargetLocales = targetLocales.filter(
          (locale) => locale !== sourceLocale,
        );

        // Replace {locale} placeholder with target locale
        const targetFilePaths = finalTargetLocales.map((targetLocale) =>
          file.target.replace('{locale}', targetLocale),
        );

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
              fileRegistryManager.load(sourceFile),
              fileHandler.hasFileChanged(sourceFile),
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
            handler: group.plugin,
          }));
      });
    }),
  );

  return { files: files.flat(), jsonHandler, mdxHandler };
}

function getLocaleConfig(group: ConfigGroup, config: IConfig) {
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
    handler: string;
  }[],
  pluginManager: IPluginManager,
  jsonHandler: IFileHandler,
  mdxHandler: IFileHandler,
  translationManager: ITranslationManager,
) {
  const fileHandlers = pluginManager.getFileHandlers();
  await Promise.all(
    filesToTranslate.map(async (file) => {
      try {
        const fileHandler = getFileHandler({
          jsonHandler,
          handler: file.handler,
          fileHandlers,
          mdxHandler,
        });

        if (!fileHandler) {
          throw Error(`File handler ${file.handler} not found.`);
        }

        await translationManager.translate(
          {
            source: file.source,
            target: file.target,
            excludeKeys: file.excludeKeys,
          },
          file.targetLocales,
          fileHandler,
        );
      } catch (error: any) {
        log.error(
          `❌ Error translating file ${chalk.red(file.source)} to ${file.targetLocales.join(', ')}: ${error.message}`,
        );
      }
    }),
  );
}

function getFileHandler({
  handler,
  jsonHandler,
  mdxHandler,
  fileHandlers,
}: {
  handler: string;
  fileHandlers: Map<string, IFileHandler>;
  jsonHandler: IFileHandler;
  mdxHandler: IFileHandler;
}) {
  if (handler === 'json') {
    return jsonHandler;
  }

  if (handler === 'mdx') {
    return mdxHandler;
  }

  if (fileHandlers.has(handler)) {
    return fileHandlers.get(handler);
  }

  return null;
}
