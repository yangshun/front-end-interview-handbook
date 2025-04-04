import { generateObject } from 'ai';
import path from 'path';
import { z } from 'zod';

import {
  TranslationGroupBatchId,
  TranslationRequestJob,
  TranslationStringResult,
} from '../core/types';
import { providerModel, TranslationAI } from './providers';
import { writeFile } from '../lib/file-service';
import { RUNS_PATH } from '../core/constants';
import { promptTemplate, promptVariables } from './prompt';

function hashStringItem(batchId: TranslationGroupBatchId, id: string): string {
  return `${batchId}#${id}`;
}

export async function generate(
  job: TranslationRequestJob,
  options: Readonly<{
    ai: TranslationAI;
    debug?: boolean;
    instructions?: string;
  }>,
): Promise<ReadonlyArray<TranslationStringResult>> {
  const { runId, jobId, strings } = job;
  const { ai, debug, instructions } = options;
  const filePathPrefix = [RUNS_PATH, runId, jobId];

  try {
    if (strings.length === 0) {
      console.info('No strings to translate');
      return [];
    }

    const model = providerModel(ai);
    const prompt = promptTemplate
      .replace(promptVariables.instructions, instructions || '')
      .replace(promptVariables.translationPayload, JSON.stringify(strings));

    if (debug) {
      await writeFile(path.join(...filePathPrefix, 'prompt.txt'), prompt);
    }

    const result = await generateObject({
      model,
      schema: z.object({
        data: z.array(
          z.object({
            id: z.string(),
            batchId: z.string(),
            translations: z.array(
              z.object({
                locale: z.string(),
                string: z.string(),
              }),
            ),
          }),
        ),
      }),
      prompt,
    });

    if (debug) {
      await writeFile(
        path.join(...filePathPrefix, 'response.json'),
        JSON.stringify(result, null, 2),
      );
    }

    const translationStringsMap = new Map<string, Record<Locale, string>>();
    result.object.data.forEach((result) => {
      translationStringsMap.set(
        hashStringItem(result.batchId, result.id),
        result.translations.reduce(
          (acc, { locale, string }) => ({
            ...acc,
            [locale]: string,
          }),
          {},
        ),
      );
    });

    return strings.map((string) => ({
      ...string,
      targets: Object.entries(
        // TODO: report if there are missing results from the LLM
        translationStringsMap.get(hashStringItem(string.batchId, string.id))!,
      ).map(([locale, translation]) => ({
        locale,
        string: translation,
      })),
    }));
  } catch (err) {
    if (debug) {
      await writeFile(
        path.join(...filePathPrefix, 'error.log'),
        (err as Error).toString(),
      );
    }
    throw err;
  }
}
