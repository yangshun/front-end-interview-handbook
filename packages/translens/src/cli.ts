#!/usr/bin/env node

import { log } from '@clack/prompts';
import chalk from 'chalk';

import { init } from './commands/init';
import { translate } from './commands/translate';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

async function main() {
  const [command] = process.argv.slice(2);

  switch (command) {
    case 'init':
      init();
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
