import { ITranslationService } from '../interfaces';
import { generateText } from 'ai';

import { createOpenAI } from '@ai-sdk/openai';

export default class DeepSeekTranslationService implements ITranslationService {
  private openai;
  constructor() {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      throw new Error('DEEPSEEK_API_KEY is not added.');
    }
    this.openai = createOpenAI({
      apiKey,
    });
  }
  private async translateAPI(prompt: string): Promise<any> {
    const result = await generateText({
      model: this.openai('gpt-4o-mini'),
      prompt: prompt,
    });
    return JSON.parse(result.text);
  }

  private constructPrompt(
    content: Record<string, string>,
    targetLocale: string,
  ): string {
    return `You are a professional translator. Translate the following text to ${targetLocale}.
Maintain the original meaning, tone, and formatting. Only return the translated text, no explanations or additional content.
It is  a JSON object, translate it values and return the translated content in the same format with its key and value.

Text to translate:
${JSON.stringify(content)}`;
  }

  async translate(
    items: Record<string, string>,
    targetLocale: string,
  ): Promise<Record<string, string>> {
    const prompt = this.constructPrompt(items, targetLocale);
    const translation = await this.translateAPI(prompt);
    return translation;
  }
}
