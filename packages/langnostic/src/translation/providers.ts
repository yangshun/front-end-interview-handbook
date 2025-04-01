import { deepseek } from '@ai-sdk/deepseek';
import { google } from '@ai-sdk/google';
import { openai } from '@ai-sdk/openai';
import { LanguageModelV1 } from 'ai';

import { TranslationProvider } from '../config/types';

export function providerModel(provider: TranslationProvider): LanguageModelV1 {
  switch (provider) {
    case 'deepseek': {
      return deepseek('deepseek-chat');
    }
    case 'google': {
      return google('gemini-1.5-flash-8b-latest');
    }
    case 'openai': {
      return openai('gpt-4o-mini');
    }
    default: {
      throw new Error(`Unsupported provider: ${provider}`);
    }
  }
}
