import { generateText } from 'ai';
import { TranslationProvider } from '../config/types';
import {
  TranslationGroupName,
  TranslationStringArg,
  TranslationStringItem,
} from '../core/types';
import { providerModel } from './providers';

const prompt = `You are a professional translator. Maintain the original meaning, tone, and formatting. Only return the translated text, no explanations or additional content.

You are given a JSON object, translate its values and return in the following format:

{
  "abc": [
      { "string: "Hello, World!", "locale": "en-US" },
      // Other locales
    ],
  },
  // Other items
}

JSON object:


`;

export async function generate(
  provider: TranslationProvider,
  groupName: TranslationGroupName,
  strings: ReadonlyArray<TranslationStringArg>,
) {
  const model = providerModel(provider);

  const { text } = await generateText({
    model,
    prompt: prompt + JSON.stringify(strings),
  });

  const translationIdToStringItems: Record<
    string,
    ReadonlyArray<TranslationStringItem>
  > = JSON.parse(text);

  return strings.map((string) => ({
    id: string.id,
    source: string.source,
    targets: translationIdToStringItems[string.id],
  }));
}
