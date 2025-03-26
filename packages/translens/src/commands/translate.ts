import Config from '../config';
import { expandTargetPaths } from '../core';
import { providerModel } from '../translation/providers';
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

const DEFAULTS_PLUGINS: Record<string, () => Plugin> = {
  json: jsonPlugin,
  mdx: mdxPlugin,
};

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

  // Convert strings into job queue.
  // TODO: Each group creates one job for now, but for long content
  // like MDX, we should split it up into multiple jobs
  const translationJobQueue: Array<TranslationJob> = [];
  for (const [groupName, strings] of groupStrings.entries()) {
    // Potentially split up into multiple jobs if too big
    translationJobQueue.push({
      group: groupName,
      strings,
    });
  }

  // Translate the strings
  // TODO: parallelize with concurrency limit
  for (const job of translationJobQueue) {
    const group = groups.get(job.group);
    if (!group) {
      throw Error(`Group ${job.group} not found.`);
    }

    console.info(
      `Translating group: ${job.group} (${job.strings.length} strings)`,
    );
    group.status = 'translating';

    const translatedStrings = await generate(config.provider, job.strings);
    await group.pluginInstance.translationComplete(translatedStrings);

    console.info(
      `Done translating group: ${job.group} (${job.strings.length} strings)`,
    );
    group.status = 'idle';
  }
}
