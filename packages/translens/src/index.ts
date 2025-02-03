#!/usr/bin/env node
import { intro, outro, spinner, isCancel, log } from '@clack/prompts';
import chalk from 'chalk';
import fs from 'fs';
import Config, { CONFIG_PATH } from './config';

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
  } catch (error) {
    s.stop(chalk.red('❌ Failed to create configuration.'));
    log.error(String(error));
  }
}

async function main() {
  const [command] = process.argv.slice(2);

  if (command === 'init') {
    initConfig();
  } else if (command === 'translate') {
    console.log('Translate command');
  } else {
    console.log(
      chalk.red(
        'Unknown command. Use `translens init` or `translens translate`.',
      ),
    );
  }
}

main().catch(console.error);
