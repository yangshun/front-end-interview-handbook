import { Plugin } from '../core/types';

export default function jsonPlugin(): Plugin {
  const files = [];

  return {
    identifier: 'json',
    async trackFiles(filesMetadata) {
      // Start tracking files
      files.push(...filesMetadata);
    },
    async getTranslationStrings() {
      // Load files and determine which strings need to be translated
      return [
        {
          id: 'hero-title',
          source: {
            string: 'Navigate front end interviews with ease',
            description: 'Hero text',
            locale: 'en-US',
          },
          targets: ['zh-CN', 'pt-BR'],
        },
        {
          id: 'hero-subtitle',
          source: {
            string:
              'Meet the front end interview prep platform built to make your interviews much easier.',
            description: 'Hero subtitle',
            locale: 'en-US',
          },
          targets: ['zh-CN', 'ja-JP '],
        },
      ];
    },
    async translationComplete(translatedStrings) {
      // Write translated strings back to filesystem
      console.dir(translatedStrings, { depth: null });
    },
  };
}
