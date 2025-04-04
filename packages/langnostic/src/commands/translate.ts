import { chunk, groupBy } from 'lodash-es';

import Config from '../config';
import { expandTargetPaths } from '../core';
import {
  Plugin,
  TranslationGroup,
  TranslationGroupId,
  TranslationRequestJob,
} from '../core/types';
import jsonPlugin from '../plugins/json/json-plugin';
import mdxPlugin from '../plugins/mdx/mdx-plugin';
import { generate } from '../translation/generate';
import mapAsync from '../utils/map-async';
import { printGroupStatus } from '../core/output/print';
import { TranslationGroupBatch } from '../core/runner/TranslationGroupBatch';

const DEFAULTS_PLUGINS: Record<string, (options?: any) => Plugin> = {
  json: jsonPlugin,
  mdx: mdxPlugin,
};
const DEFAULT_CONCURRENCY_LIMIT = 5;
const REFRESH_INTERVAL = 1000 / 16;

export async function translate({
  dryRun = false,
}: Readonly<{
  dryRun?: boolean;
}>) {
  const config = new Config().config;
  const groups = new Map<TranslationGroupId, TranslationGroup>();
  const runId = new Date().toISOString();

  // Discover files to translate
  await Promise.all(
    config.groups.map(async (group) => {
      const groupFiles = await Promise.all(
        group.paths.map(
          async (groupPath) =>
            await expandTargetPaths(
              group.localeConfig ?? config.localeConfig,
              groupPath,
            ),
        ),
      );

      const { plugin } = group;
      const pluginInstance =
        typeof plugin === 'string'
          ? DEFAULTS_PLUGINS[plugin]()
          : DEFAULTS_PLUGINS[plugin[0]](plugin[1]);

      await pluginInstance.trackFiles(groupFiles.flat());

      groups.set(group.name, {
        groupId: group.name,
        plugin: pluginInstance,
        stringsPerRequest:
          group.stringsPerRequest ?? pluginInstance.stringsPerRequest,
        batches: new Map(),
      });
    }),
  );

  // Gather translation strings
  await Promise.all(
    Array.from(groups.values()).map(async (group) => {
      const translationStrings = await group.plugin.getTranslationStrings();

      const batchIds = groupBy(translationStrings, (string) => string.batchId);

      Object.keys(batchIds).forEach((batchId) => {
        group.batches.set(
          batchId,
          new TranslationGroupBatch(batchId, batchIds[batchId]),
        );
      });
    }),
  );

  // Convert strings into job queue
  const jobQueue: Array<TranslationRequestJob> = [];

  for (const group of groups.values()) {
    for (const batch of group.batches.values()) {
      // Split up into multiple jobs
      const chunks = chunk(batch.strings, group.stringsPerRequest);
      chunks.forEach((chunk, chunkIndex) => {
        jobQueue.push({
          runId,
          jobId: [
            group.groupId,
            batch.batchId.replace(/^\.\//, '').replace(/\//g, '#'),
            chunkIndex,
          ].join('-'),
          group: group.groupId,
          batch: batch.batchId,
          strings: chunk,
        });
      });
    }
  }

  if (jobQueue.length === 0) {
    console.info('Nothing to translate. Terminating.');
    process.exit(0);
  }

  function print() {
    printGroupStatus(groups);
  }

  if (dryRun) {
    console.info('The following are pending translations:\n');
    printGroupStatus(groups, { showSummary: false });
    process.exit(0);
  }

  const intervalId = setInterval(print, REFRESH_INTERVAL);

  // Translate the strings
  await mapAsync(
    jobQueue,
    async (job) => {
      const group = groups.get(job.group);
      if (!group) {
        throw Error(`Group ${job.group} not found.`);
      }

      // Not possible to be empty, but just in case
      if (job.strings.length === 0) {
        return;
      }

      const batch = groups.get(job.group)!.batches.get(job.batch)!;
      batch.startTranslating();

      try {
        const instructions = (await group.plugin.getInstructions?.()) || '';
        const translatedStrings = await generate(job, {
          ai: config.ai,
          instructions,
        });

        batch.addTranslations(translatedStrings);

        if (batch.status === 'success') {
          await group.plugin.onTranslationBatchComplete(batch.translations);
        }
      } catch (err) {
        batch.addError(err as Error);
      }
    },
    config.concurrencyLimit ?? DEFAULT_CONCURRENCY_LIMIT,
  );

  printGroupStatus(groups);

  clearInterval(intervalId);
  process.exit(0);
}
