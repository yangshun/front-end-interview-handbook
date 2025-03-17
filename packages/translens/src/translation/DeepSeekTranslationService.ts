import { ITranslationService } from '../interfaces';
import { generateText } from 'ai';

import { deepseek } from '@ai-sdk/deepseek';

export default class DeepSeekTranslationService implements ITranslationService {
  private async translateAPI(prompt: string): Promise<any> {
    const { text } = await generateText({
      model: deepseek('deepseek-chat'),
      prompt,
    });
    return JSON.parse(text);
  }

  private constructPrompt(
    content: Record<string, string>,
    targetLocale: string,
  ): string {
    return `You are a professional translator. Translate the following text to ${targetLocale}.
Maintain the original meaning, tone, and formatting. Only return the translated text, no explanations or additional content.
It is a JSON object, translate its values and return the translated content in the same format with its key and value.

JSON to translate:
${JSON.stringify(content)}`;
  }

  async translate(
    items: Record<string, string>,
    targetLocale: string,
  ): Promise<Record<string, string>> {
    const prompt = this.constructPrompt(items, targetLocale);

    return await this.translateAPI(prompt);
  }
}
