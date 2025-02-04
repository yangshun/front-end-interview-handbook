import { outro, spinner, log } from '@clack/prompts';
import { glob } from 'glob';
import chalk from 'chalk';

import Config from '../config';
import { JsonHandler } from '../handlers';

export async function translate() {
  const config = new Config().getConfig();
  const jsonHandler = new JsonHandler(config);

  const translationSpinner = spinner();
  translationSpinner.start('Searching for files...');

  // Find all JSON and MDX files
  const files = await Promise.all(
    config.paths.map((path) => glob(`${path}/**/${config.source}.{json,mdx}`)),
  ).then((results) => results.flat());

  if (files.length === 0) {
    translationSpinner.stop(chalk.yellow('⚠ No files found for translation.'));
    return;
  }

  translationSpinner.stop(
    chalk.green(`✅ Found ${files.length} file(s) to process.`),
  );

  // Process all files concurrently
  await Promise.all(
    files.map(async (file) => {
      try {
        if (file.endsWith('.json')) {
          await jsonHandler.translate(file, config.locales);
          log.success(`✔ Successfully translated: ${chalk.green(file)}`);
        }
      } catch (error: any) {
        log.error(
          `❌ Error processing file ${chalk.red(file)}: ${error.message}`,
        );
      }
    }),
  );

  translationSpinner.stop(
    chalk.green('🚀 Translation completed successfully!'),
  );

  outro(`Processed ${files.length} file(s).`);
}
