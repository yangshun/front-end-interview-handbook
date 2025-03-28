import chalk from 'chalk';

import { TranslationGroupBatchStatus } from '../types';

const spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

let index = 0;
setInterval(() => {
  index = (index + 1) % spinnerFrames.length;
}, 80);

export function batchStatusSymbol(status: TranslationGroupBatchStatus) {
  switch (status) {
    case 'pending': {
      return chalk.grey('.');
    }
    case 'translating': {
      return spinnerFrames[index];
    }
    case 'success': {
      return chalk.green('✔');
    }
    case 'error': {
      return chalk.redBright('✕');
    }
  }
}
