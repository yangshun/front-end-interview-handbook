import { intro, outro, spinner, log } from '@clack/prompts';
import chalk from 'chalk';
import fs from 'fs';

import Config from '../config';
import { CONFIG_PATH } from '../core/constants';

export async function init() {
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
