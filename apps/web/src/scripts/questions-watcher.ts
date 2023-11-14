import chalk from 'chalk';
import chokidar from 'chokidar';
import _ from 'lodash-es';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { generate } from './questions-generate';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const cwd = process.cwd();

async function regenerateArtifactsImpl() {
  console.info(
    chalk.inverse.cyan(`wait`),
    '  -',
    'regenerating questions artifacts...',
  );

  const time = Date.now();

  await generate();

  console.info(
    chalk.inverse.magenta(`event`),
    ' -',
    `regenerated successfully in ${Date.now() - time}ms`,
  );
}

const regenerateArtifacts = _.debounce(regenerateArtifactsImpl, 50);

const watcher = chokidar
  .watch(path.resolve(path.join(__dirname, '../../questions/')), {
    atomic: true,
  })
  .on('ready', () => {
    console.info(chalk.inverse.green(`ready`), ' -', 'started watching');
    watchEvents();
  });

function watchEvents() {
  watcher
    .on('change', async (changedPath: string) => {
      console.info(
        chalk.inverse.yellow(`change`),
        '-',
        path.relative(cwd, changedPath),
      );
      await regenerateArtifacts();
    })
    .on('add', async (changedPath: string) => {
      console.info(
        chalk.inverse.yellow(`add`),
        '   -',
        path.relative(cwd, changedPath),
      );
      await regenerateArtifacts();
    })
    .on('unlink', async (changedPath: string) => {
      console.info(
        chalk.inverse.yellow(`remove`),
        '-',
        path.relative(cwd, changedPath),
      );
      await regenerateArtifacts();
    })
    .on('addDir', async (addedDir: string) => {
      console.info(
        chalk.inverse.yellow(`addDir`),
        '-',
        path.relative(cwd, addedDir),
      );
      await regenerateArtifacts();
    })
    .on('unlinkDir', async (unlinkedDir: string) => {
      console.info(
        chalk.inverse.yellow(`unlinkDir`),
        '-',
        path.relative(cwd, unlinkedDir),
      );
      await regenerateArtifacts();
    });
}
