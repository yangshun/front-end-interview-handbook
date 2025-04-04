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
    () => {},
    () => {
      translate();
    },
  )
  .demandCommand(1)
  .parse();
