import { deepseek } from '@ai-sdk/deepseek';
import { openai } from '@ai-sdk/openai';

import { LanguageModel } from 'ai';
import { TranslationProvider } from '../config/types';

export function providerModel(provider: TranslationProvider): LanguageModel {
  switch (provider) {
    case 'openai': {
      return openai('gpt-4-turbo');
    }
    case 'deepseek': {
      return deepseek('deepseek-chat');
    }
    default: {
      throw new Error(`Unsupported provider: ${provider}`);
    }
  }
}
