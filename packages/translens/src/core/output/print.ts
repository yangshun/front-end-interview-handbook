import chalk from 'chalk';
import logUpdate from 'log-update';

import { TranslationGroupId, TranslationGroups } from '../types';
import { batchStatusSymbol } from './spinner-frames';

let timeStart = Date.now();

export function formatDuration(start: number | null, end: number | null) {
  const duration = start ? (end ?? Date.now()) - start : null;

  return duration == null ? '' : `${(duration / 1000).toFixed(1)}s`;
}

function formatGroupId(groupId: TranslationGroupId) {
  return `[${groupId}]`;
}

export function printGroupStatus(groups: TranslationGroups) {
  const longestGroupIdLength = Math.max(
    ...Array.from(groups.keys()).map((name) => formatGroupId(name).length),
  );

  const results: Array<string> = [];
  let completedBatches = 0;
  let totalBatches = 0;

  for (const group of groups.values()) {
    for (const batch of group.batches.values()) {
      const batchPrefix =
        chalk.dim(formatGroupId(group.groupId).padStart(longestGroupIdLength)) +
        ` ${chalk.visible(batch.batchId.replace(/^\.\//, ''))}`;

      if (batch.status === 'success') {
        completedBatches++;
      }
      totalBatches++;

      results.push(
        [
          batchStatusSymbol(batch.status),
          batchPrefix,
          chalk.dim(
            `(${batch.strings.length} ${
              batch.strings.length === 1 ? 'string' : 'strings'
            })`,
          ),
          chalk.dim(formatDuration(batch.time.start, batch.time.end)),
        ].join(' '),
      );
    }
  }

  results.push(
    '',
    [
      `${chalk.bold('Batches:')} `,
      chalk.bold.green(`${completedBatches} successful`) + ',',
      `${totalBatches} total`,
    ].join(' '),
    `${chalk.bold('Duration:')} ${formatDuration(timeStart, Date.now())}`,
  );

  logUpdate(results.join('\n'));
}
