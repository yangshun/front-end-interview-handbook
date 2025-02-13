import { spinner, log } from '@clack/prompts';
import chalk from 'chalk';

import Config from '../config';
import { JsonHandler, MDXHandler } from '../handlers';
import FileEnumerator from '../lib/FileEnumerator';
import FileRegistryManager from '../core/FileRegistryManager';
import ChangeDetector from '../core/ChangeDetector';
import TranslationManager from '../core/TranslationManager';
import { PluginManager } from '../core/PluginManager';
import {
  IFileHandler,
  IFileRegistryManager,
  IPluginManager,
  ITranslationManager,
} from '../interfaces';
import DeepSeekTranslationService from '../translation/DeepSeekTranslationService';
import { IConfig, IConfigGroup } from '../types/config';

export async function translate() {
  const config = new Config().getConfig();
  const registryManager = new FileRegistryManager();
  const changeDetector = new ChangeDetector();
  const jsonHandler = new JsonHandler(changeDetector, registryManager);
  const mdxHandler = new MDXHandler(changeDetector, registryManager);
  const translationService = new DeepSeekTranslationService();
  const translationManager = new TranslationManager(
    changeDetector,
    registryManager,
    translationService,
  );
  const pluginManager = new PluginManager(
    config,
    changeDetector,
    registryManager,
  );
  await pluginManager.registerFileHandlers();

  const translationSpinner = spinner();
  translationSpinner.start(chalk.blue('🔍 Searching for files...'));

  // Find all source files to translate
  const filesToTranslate = await findFilesToTranslate(
    config,
    registryManager,
    pluginManager,
    jsonHandler,
    mdxHandler,
  );

  translationSpinner.stop(
    filesToTranslate.length === 0
      ? chalk.yellow('⚠ No files found for translation.')
      : chalk.green(`✅ Found ${filesToTranslate.length} file(s) to process.`),
  );

  if (filesToTranslate.length === 0) return;

  translationSpinner.start(`Translating ${filesToTranslate.length} files...`);
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
  registryManager: IFileRegistryManager,
  pluginManager: IPluginManager,
  jsonHandler: IFileHandler,
  mdxHandler: IFileHandler,
) {
  const fileHandlers = pluginManager.getFileHandlers();
  const files = await Promise.all(
    config.groups.flatMap((group) => {
      const fileHandler = getFileHandler({
        jsonHandler,
        mdxHandler,
        handler: group.handler,
        fileHandlers,
      });
      if (!fileHandler) return []; //

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
            handler: group.handler,
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
  } else if (handler === 'mdx') {
    return mdxHandler;
  } else if (fileHandlers.has(handler)) {
    return fileHandlers.get(handler);
  }
  return null;
}
