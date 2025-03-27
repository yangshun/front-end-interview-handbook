import Config from '../config';
import { expandTargetPaths } from '../core';
import {
  Plugin,
  TranslationGroup,
  TranslationGroupName,
  TranslationJob,
  TranslationStringArg,
} from '../core/types';
import jsonPlugin from '../plugins/json/json-plugin';
import mdxPlugin from '../plugins/mdx/mdx-plugin';
import { generate } from '../translation/generate';
import { groupBy } from 'lodash-es';
import mapAsync from '../utils/map-async';
import chalk from 'chalk';

const DEFAULTS_PLUGINS: Record<string, () => Plugin> = {
  json: jsonPlugin,
  mdx: mdxPlugin,
};

const CONCURRENCY_LIMIT = 5;

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
        status: 'idle',
        pluginInstance,
        strings: [],
      });
    }),
  );

  const longestGroupNameLength = Math.max(
    ...Array.from(groups.keys()).map((name) => name.length),
  );

  const groupStrings: Map<
    TranslationGroupName,
    ReadonlyArray<TranslationStringArg>
  > = new Map();

  // Gather translation strings
  await Promise.all(
    Array.from(groups.values()).map(async (group) => {
      const translationStrings =
        await group.pluginInstance.getTranslationStrings();

      groupStrings.set(group.name, translationStrings);
    }),
  );

  // Convert strings into job queue
  // TODO: Each group creates one job for now, but for long content
  // like MDX, we should split it up into multiple jobs
  const translationJobQueue: Array<TranslationJob> = [];

  for (const [groupName, strings] of groupStrings.entries()) {
    const batchStrings = groupBy(strings, (string) => string.batch);

    Object.keys(batchStrings).forEach((batch) => {
      // Potentially split up into multiple jobs if a batch is too big
      translationJobQueue.push({
        group: groupName,
        strings: batchStrings[batch],
      });
    });
  }

  if (translationJobQueue.length === 0) {
    console.info(`Nothing to translate. Terminating.`);
    return;
  }

  console.info(`⌛ Translating ${translationJobQueue.length} batch(es)`);
  console.info();

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

      const batchPrefix =
        chalk.dim(`[${job.group}]`.padStart(longestGroupNameLength + 2)) +
        ` ${chalk.visible(job.strings[0].batch.replace(/^\.\//, ''))}`;
      console.info(
        `${batchPrefix} ${chalk.dim(`(${job.strings.length} ${job.strings.length === 1 ? 'string' : 'strings'})`)} ⌛`,
      );
      group.status = 'translating';

      const instructions =
        (await group.pluginInstance.getInstructions?.()) || '';
      const translatedStrings = await generate(job.strings, {
        provider: config.provider,
        instructions,
      });

      await group.pluginInstance.onTranslationBatchComplete(translatedStrings);

      console.info(`${batchPrefix} Completed ✅`);
      group.status = 'idle';
    },
    CONCURRENCY_LIMIT,
  );

  console.info();
  console.info(`✅ Translated ${translationJobQueue.length} batch(es)`);
}
