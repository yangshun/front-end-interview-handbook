#!/usr/bin/env node

import { config } from 'dotenv';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { init } from './commands/init';
import { translate } from './commands/translate';

// Load environment variables from .env file
config();

yargs(hideBin(process.argv))
  .command(
    'init',
    'Initializes a config file',
    () => {},
    () => {
      init();
    },
  )
  .command(
    'translate',
    'Translate untranslated strings',
    {
      debug: {
        alias: 'd',
        default: false,
        description: 'Enable debug mode, logs prompts and responses',
        type: 'boolean',
      },
      'dry-run': {
        alias: 'r',
        default: false,
        describe:
          'Whether to execute translations. Shows changed files otherwise',
        type: 'boolean',
      },
    },
    (argv) => {
      translate(argv);
    },
  )
  .demandCommand(1)
  .parse();
