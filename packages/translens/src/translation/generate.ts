import JSON5 from 'json5';
import { generateText } from 'ai';
import { TranslationProvider } from '../config/types';
import { TranslationStringArg, TranslationStringMetadata } from '../core/types';
import { providerModel } from './providers';
import path from 'path';
import { writeFile } from '../lib/file-service';
import { PROMPTS_PATH } from '../core/constants';

const promptTemplate = `You are a professional translator. Maintain the original meaning, tone, and formatting.

- You are given a JSON object containing a list of strings and the target locales within <json> tags
- Translate the source strings within the JSON object from the source locale to the target locales
- The expected return format is provided within <format> tags
- Respond with only the translated object, strictly adhering to the format, no need for additional explanations or context
- Return all the translated object for all the strings
- If the string to be translated is a react import state, return the same object without translation

<format>
[
  {
    "id": "abc",
    "filePath": "path/to/file",
    "translations": {
      "zh-CN": "...",
      "pt-BR": "...",
      // Other locales
    },
  },
  // Other items
]
</format>
<json>
[DATA]
</json>
`;

function hashFileString(filePath: string, id: string): string {
  return `${filePath}#${id}`;
}

export async function generate(
  provider: TranslationProvider,
  strings: ReadonlyArray<TranslationStringArg>,
): Promise<ReadonlyArray<TranslationStringMetadata>> {
  if (strings.length === 0) {
    console.info('No strings to translate');
    return [];
  }

  const model = providerModel(provider);
  const prompt = promptTemplate.replace('[DATA]', JSON.stringify(strings));

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
