import { outro, spinner, log } from '@clack/prompts';
import chalk from 'chalk';

import Config from '../config';
import { JsonHandler } from '../handlers';
import FileEnumerator from '../lib/FileEnumerator';

export async function translate() {
  const config = new Config().getConfig();
  const jsonHandler = new JsonHandler();

  const translationSpinner = spinner();
  translationSpinner.start(chalk.blue('🔍 Searching for files...'));

  // Find all source files to translate
  const files = await Promise.all(
    config.groups.flatMap((group) => {
      if (group.type !== 'json') return []; // Only process JSON files for now

      return group.files.map(async (file) => {
        const sourceLocale =
          group.localeConfig?.source || config.localeConfig.source; // Override the default locale config if provided
        const targetLocales =
          group.localeConfig?.target || config.localeConfig.target; // Override the default locale config if provided

        const targetFilePaths = targetLocales.map((targetLocale) =>
          file.target.replace('{locale}', targetLocale),
        ); // replace {locale} placeholder with target locale

        // Find all files to translate excluding the ignore files from config and target files
        const fileEnumerator = new FileEnumerator(
          file.source,
          targetFilePaths,
          file.ignore,
        );
        const filteredFiles = await fileEnumerator.enumerateFiles();

        // Prepare translation objects for each file
        return filteredFiles.flatMap((sourceFile) =>
          targetLocales
            .filter((locale) => locale !== sourceLocale)
            .map((targetLocale) => ({
              source: sourceFile,
              target: file.target.replace('{locale}', targetLocale), // replace {locale} placeholder with target locale
              excludeKeys: file.excludeKeys,
              targetLocale,
            })),
        );
      });
    }),
  ).then((result) => result.flat());

  translationSpinner.stop(
    files.length === 0
      ? chalk.yellow('⚠ No files found for translation.')
      : chalk.green(`✅ Found ${files.length} file(s) to process.`),
  );

  if (files.length === 0) return;
  translationSpinner.start(`Translating ${files.length} files...`);

  // Process all files concurrently
  await Promise.all(
    files.map(async (file) => {
      try {
        if (file.source.endsWith('.json')) {
          translationSpinner.message(
            chalk.blue(
              `Translating ${chalk.cyan(file.source)} for locale: ${chalk.yellow(file.targetLocale)}`,
            ),
          );
          await jsonHandler.translate(
            {
              source: file.source,
              target: file.target,
              excludeKeys: file.excludeKeys,
            },
            file.targetLocale,
          );
          log.success(
            `✔ Successfully translated: ${chalk.bold(file.source)} -> ${chalk.bold(file.targetLocale)}`,
          );
        }
      } catch (error: any) {
        log.error(
          `❌ Error translating file ${chalk.red(file.source)} for locale ${chalk.red(file.targetLocale)}: ${error.message}`,
        );
      }
    }),
  );

  translationSpinner.stop();
  outro(chalk.green(`🚀 Translation completed for ${files.length} file(s)!`));
}
