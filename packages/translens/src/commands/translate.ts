import Config from '../config';
import { expandTargetPaths } from '../core';
import {
  Plugin,
  TranslationGroup,
  TranslationGroupId,
  TranslationJob,
} from '../core/types';
import jsonPlugin from '../plugins/json/json-plugin';
import mdxPlugin from '../plugins/mdx/mdx-plugin';
import { generate } from '../translation/generate';
import { chunk, groupBy } from 'lodash-es';
import mapAsync from '../utils/map-async';
import { printGroupStatus } from '../core/output/print';

const DEFAULTS_PLUGINS: Record<string, (options?: any) => Plugin> = {
  json: jsonPlugin,
  mdx: mdxPlugin,
};
const DEFAULT_CONCURRENCY_LIMIT = 5;
const DEFAULT_BATCH_CHUNK_SIZE = 5;
const REFRESH_INTERVAL = 1000 / 16;

export async function translate() {
  const config = new Config().getConfig();
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
        group.batches.set(batchId, {
          batchId,
          status: 'pending',
          errors: [],
          translations: [],
          strings: batchIds[batchId],
          time: { start: null, end: null },
        });
      });
    }),
  );

  // Convert strings into job queue
  const translationJobQueue: Array<TranslationJob> = [];

  for (const group of groups.values()) {
    for (const batch of group.batches.values()) {
      // Split up into multiple jobs based on chunk size
      const chunks = chunk(batch.strings, DEFAULT_BATCH_CHUNK_SIZE);
      chunks.forEach((chunk, chunkIndex) => {
        translationJobQueue.push({
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

  if (translationJobQueue.length === 0) {
    console.info('Nothing to translate. Terminating.');
    process.exit(0);
  }

  function print() {
    printGroupStatus(groups);
  }

  const intervalId = setInterval(print, REFRESH_INTERVAL);

  // Translate the strings
  await mapAsync(
    translationJobQueue,
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
      if (batch.status === 'pending') {
        batch.status = 'translating';
        batch.time.start = Date.now();
      }

      try {
        const instructions = (await group.plugin.getInstructions?.()) || '';
        const translatedStrings = await generate(job, {
          provider: config.provider,
          instructions,
        });

        batch.translations.push(...translatedStrings);

        if (batch.translations.length === batch.strings.length) {
          batch.status = 'success';
          batch.time.end = Date.now();

          await group.plugin.onTranslationBatchComplete(batch.translations);
        }
      } catch (err) {
        batch.errors.push(err as Error);
        batch.status = 'error';
        batch.time.end = Date.now();
      }
    },
    DEFAULT_CONCURRENCY_LIMIT,
  );

  printGroupStatus(groups);

  clearInterval(intervalId);
  process.exit(0);
}
