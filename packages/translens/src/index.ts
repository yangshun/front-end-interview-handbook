#!/usr/bin/env node
import { intro, outro, spinner, log } from '@clack/prompts';
import { glob } from 'glob';
import chalk from 'chalk';
import fs from 'fs';

import Config, { CONFIG_PATH } from './config';
import { JsonHandler } from './handlers';

async function initConfig() {
  console.clear();
  intro(`${chalk.blue.bold('Translens Config Setup')}`);

  if (fs.existsSync(CONFIG_PATH)) {
    log.info(chalk.yellow('⚠ Configuration file already exists.'));
    outro('No changes were made.');
    return;
  }

  const s = spinner();
  s.start('Creating default configuration...');

  try {
    Config.initializeConfig(CONFIG_PATH);
    s.stop(chalk.green('✅ Configuration file created successfully!'));
    outro('You can now edit the configuration in ' + chalk.blue(CONFIG_PATH));
  } catch (error: any) {
    s.stop(chalk.red('❌ Failed to create configuration.'));
    log.error(error.message);
  }
}

async function translate() {
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

async function main() {
  const [command] = process.argv.slice(2);

  switch (command) {
    case 'init':
      initConfig();
      break;
    case 'translate':
      translate();
      break;
    default:
      log.error(
        chalk.red(
          'Unknown command. Use `translens init` or `translens translate`.',
        ),
      );
  }
}

main().catch(console.error);
