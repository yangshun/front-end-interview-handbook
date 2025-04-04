import { deepseek } from '@ai-sdk/deepseek';
import { google } from '@ai-sdk/google';
import { openai } from '@ai-sdk/openai';
import { LanguageModelV1 } from 'ai';

type TranslationModel =
  | Readonly<{
      provider: 'openai';
      model?: Parameters<typeof openai>[0];
    }>
  | Readonly<{
      provider: 'google';
      model?: Parameters<typeof google>[0];
    }>
  | Readonly<{
      provider: 'deepseek';
      model?: Parameters<typeof deepseek>[0];
    }>;
export type TranslationAI = Readonly<{ temperature?: number }> &
  TranslationModel;

export function providerModel(ai: TranslationAI): LanguageModelV1 {
  switch (ai.provider) {
    case 'deepseek': {
      return deepseek(ai.model ?? 'deepseek-chat');
    }
    case 'google': {
      return google(ai.model ?? 'gemini-2.0-flash-lite');
    }
    case 'openai': {
      return openai(ai.model ?? 'gpt-4o-mini');
    }
    default: {
      // @ts-expect-error
      throw new Error(`Unsupported provider: ${ai.provider}`);
    }
  }
}
