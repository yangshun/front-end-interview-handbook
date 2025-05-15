import { generateObject } from 'ai';
import path from 'path';
import { z } from 'zod';

import { RUNS_PATH } from '../core/constants';
import type {
  TranslationGroupBatchId,
  TranslationRequestJob,
  TranslationStringResult,
} from '../core/types';
import { writeFile } from '../lib/file-service';
import { getPromptTemplate } from './prompt';
import type { TranslationAI } from './providers';
import { providerModel } from './providers';

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
  const { jobId, runId, strings } = job;
  const { ai, debug, instructions } = options;
  const filePathPrefix = [RUNS_PATH, runId, jobId];

  try {
    if (strings.length === 0) {
      console.info('No strings to translate');

      return [];
    }

    const model = providerModel(ai);
    const prompt = getPromptTemplate(
      instructions || '',
      JSON.stringify(strings),
    );

    if (debug) {
      await writeFile(path.join(...filePathPrefix, 'prompt.txt'), prompt);
    }

    const result = await generateObject({
      model,
      prompt,
      schema: z.object({
        data: z.array(
          z.object({
            batchId: z.string(),
            id: z.string(),
            translations: z.array(
              z.object({
                locale: z.string(),
                string: z.string(),
              }),
            ),
          }),
        ),
      }),
      temperature: ai.temperature || 0,
    });

    if (debug) {
      await writeFile(
        path.join(...filePathPrefix, 'response.json'),
        JSON.stringify(result, null, 2),
      );
    }

    const translationStringsMap = new Map<string, Record<Locale, string>>();

    result.object.data.forEach((r) => {
      translationStringsMap.set(
        hashStringItem(r.batchId, r.id),
        r.translations.reduce(
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
