import JSON5 from 'json5';
import { generateText } from 'ai';
import { TranslationProvider } from '../config/types';
import { TranslationStringArg, TranslationStringMetadata } from '../core/types';
import { providerModel } from './providers';
import path from 'path';
import { writeFile } from '../lib/file-service';
import { PROMPTS_PATH } from '../core/constants';
import { promptTemplate, promptVariables } from './prompt-template';

function hashFileString(filePath: string, id: string): string {
  return `${filePath}#${id}`;
}

export async function generate(
  strings: ReadonlyArray<TranslationStringArg>,
  options: Readonly<{
    provider: TranslationProvider;
    instructions?: string;
  }>,
): Promise<ReadonlyArray<TranslationStringMetadata>> {
  if (strings.length === 0) {
    console.info('No strings to translate');
    return [];
  }

  const { instructions, provider } = options;

  const model = providerModel(provider);
  const prompt = promptTemplate
    .replace(promptVariables.instructions, instructions || '')
    .replace(promptVariables.translationPayload, JSON.stringify(strings));

  const now = Date.now();
  const promptsFilePath = path.join(PROMPTS_PATH, now.toString(), 'prompt.txt');
  await writeFile(promptsFilePath, prompt);

  const { text: rawResults } = await generateText({
    model,
    prompt,
  });

  const responseFilePath = path.join(
    PROMPTS_PATH,
    now.toString(),
    'response.txt',
  );
  await writeFile(responseFilePath, rawResults);
  // Some providers such as Gemini return the results as JSON
  const results = rawResults
    .replace(/^```[\s\S]*?\n/g, '') // Remove backticks and language specifier from the front
    .replace(/\n```\n?$/g, '') // Remove backticks from the end
    .trim();

  const translationStringsArray: ReadonlyArray<
    Readonly<{
      id: string;
      filePath: string;
      translations: Record<Locale, string>;
    }>
  > = JSON5.parse(results); // Use JSON5 since sometimes the response has extra commas

  const translationStringsMap = new Map<string, Record<Locale, string>>();
  translationStringsArray.forEach((item) => {
    translationStringsMap.set(
      hashFileString(item.filePath, item.id),
      item.translations,
    );
  });

  return strings.map((string) => ({
    ...string,
    targets: Object.entries(
      // TODO: report if there are missing results from the LLM
      translationStringsMap.get(hashFileString(string.filePath, string.id))!,
    ).map(([locale, translation]) => ({
      locale,
      string: translation,
    })),
  }));
}
