import Config from '../config';
import { expandTargetPaths } from '../core';
import {
  Plugin,
  TranslationGroup,
  TranslationGroupName,
  TranslationJob,
} from '../core/types';
import jsonPlugin from '../plugins/json/json-plugin';
import mdxPlugin from '../plugins/mdx/mdx-plugin';
import { generate } from '../translation/generate';
import { groupBy } from 'lodash-es';
import mapAsync from '../utils/map-async';
import { printGroupStatus } from '../core/output/print';

const DEFAULTS_PLUGINS: Record<string, () => Plugin> = {
  json: jsonPlugin,
  mdx: mdxPlugin,
};
const CONCURRENCY_LIMIT = 5;
const REFRESH_INTERVAL = 1000 / 16;

export async function translate() {
  const config = new Config().getConfig();
  const groups = new Map<TranslationGroupName, TranslationGroup>();

  // Discover files to translate
  await Promise.all(
    config.groups.map(async (group) => {
      const groupFiles = await Promise.all(
        group.paths.map(async (groupPath) => {
          return await expandTargetPaths(
            group.localeConfig ?? config.localeConfig,
            groupPath,
          );
        }),
      );

      const groupFilesFlattened = groupFiles.flat();
      const pluginInstance = DEFAULTS_PLUGINS[group.plugin]();
      await pluginInstance.trackFiles(groupFilesFlattened);

      groups.set(group.name, {
        ...group,
        pluginInstance,
        batches: new Map(),
      });
    }),
  );

  // Gather translation strings
  await Promise.all(
    Array.from(groups.values()).map(async (group) => {
      const translationStrings =
        await group.pluginInstance.getTranslationStrings();

      const batchIds = groupBy(translationStrings, (string) => string.batch);

      Object.keys(batchIds).forEach((batchId) => {
        group.batches.set(batchId, {
          batchId,
          status: 'pending',
          strings: batchIds[batchId],
          time: { start: null, end: null },
        });
      });
    }),
  );

  // Convert strings into job queue
  // TODO: Each group creates one job for now, but for long content
  // like MDX, we should split it up into multiple jobs
  const translationJobQueue: Array<TranslationJob> = [];

  for (const group of groups.values()) {
    for (const batch of group.batches.values()) {
      // Potentially split up into multiple jobs if a batch is too big
      translationJobQueue.push({
        group: group.name,
        batch: batch.batchId,
        strings: batch.strings,
      });
    }
  }

  if (translationJobQueue.length === 0) {
    console.info(`Nothing to translate. Terminating.`);
    return;
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
      try {
        batch.status = 'translating';
        batch.time.start = Date.now();

        const instructions =
          (await group.pluginInstance.getInstructions?.()) || '';
        const translatedStrings = await generate(job.strings, {
          provider: config.provider,
          instructions,
        });

        await group.pluginInstance.onTranslationBatchComplete(
          translatedStrings,
        );

        batch.status = 'success';
      } catch {
        batch.status = 'failed';
      }
      batch.time.end = Date.now();
    },
    CONCURRENCY_LIMIT,
  );

  print();

  clearInterval(intervalId);
  process.exit(0);
}
