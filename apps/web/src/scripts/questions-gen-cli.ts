import chalk from 'chalk';

import { generate } from './questions-generate';

const time = Date.now();

console.info(
  chalk.inverse.cyan('info'),
  '   -',
  'generating questions metadata...',
);
generate().then(() => {
  console.info(
    chalk.inverse.green('success'),
    '-',
    `done in ${Date.now() - time}ms`,
  );
});
