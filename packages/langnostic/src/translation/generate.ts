import { generateText } from 'ai';
import JSON5 from 'json5';
import path from 'path';

import { TranslationProvider } from '../config/types';
import {
  TranslationGroupBatchId,
  TranslationJob,
  TranslationStringResult,
} from '../core/types';
import { providerModel } from './providers';
import { writeFile } from '../lib/file-service';
import { RUNS_PATH } from '../core/constants';
import { promptTemplate, promptVariables } from './prompt-template';

function hashStringItem(batchId: TranslationGroupBatchId, id: string): string {
  return `${batchId}#${id}`;
}

export async function generate(
  job: TranslationJob,
  options: Readonly<{
    provider: TranslationProvider;
    instructions?: string;
  }>,
): Promise<ReadonlyArray<TranslationStringResult>> {
  const { runId, jobId, strings } = job;
  const filePathPrefix = [RUNS_PATH, runId, jobId];

  try {
    if (strings.length === 0) {
      console.info('No strings to translate');
      return [];
    }

    const { instructions, provider } = options;

    const model = providerModel(provider);
    const prompt = promptTemplate
      .replace(promptVariables.instructions, instructions || '')
      .replace(promptVariables.translationPayload, JSON.stringify(strings));

    await writeFile(path.join(...filePathPrefix, 'prompt.txt'), prompt);

    const { text: rawResults } = await generateText({
      model,
      prompt,
    });

    await writeFile(path.join(...filePathPrefix, 'response.txt'), rawResults);

    // Some providers such as Gemini return the results as Markdown code blocks
    const results = rawResults
      .replace(/^```[\s\S]*?\n/g, '') // Remove backticks and language specifier from the front
      .replace(/\n```\n?$/g, '') // Remove backticks from the end
      .trim();

    const translationStringsArray: ReadonlyArray<
      Readonly<{
        id: string;
        batchId: string;
        translations: Record<Locale, string>;
      }>
    > = JSON5.parse(results); // Use JSON5 since sometimes the response has extra commas

    const translationStringsMap = new Map<string, Record<Locale, string>>();
    translationStringsArray.forEach((result) => {
      translationStringsMap.set(
        hashStringItem(result.batchId, result.id),
        result.translations,
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
    await writeFile(
      path.join(...filePathPrefix, 'error.log'),
      (err as Error).toString(),
    );
    throw err;
  }
}
