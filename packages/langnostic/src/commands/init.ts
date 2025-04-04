import { intro, outro, spinner } from '@clack/prompts';
import chalk from 'chalk';
import path from 'path';

import Config from '../config';

export async function init() {
  intro(`${chalk.blue.bold('Langnostic Config Setup')}`);

  const s = spinner();
  s.start('Creating default configuration...');

  const initResult = Config.initializeConfig();

  switch (initResult.result) {
    case 'created': {
      s.stop(chalk.green('Configuration file created successfully!'));
      outro(
        'You can now edit the configuration in ' +
          chalk.blue(path.relative(process.cwd(), initResult.filepath)),
      );
      break;
    }
    case 'exists': {
      s.stop(
        'Config file already exists at ' +
          chalk.blue(path.relative(process.cwd(), initResult.filepath)),
      );
      break;
    }
    case 'error': {
      s.stop('Error occurred');
      break;
    }
    default: {
      const _: never = initResult;
      break;
    }
  }

  process.exit(0);
}
