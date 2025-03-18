import { Plugin } from '../core/types';

export default function mdxPlugin(): Plugin {
  const files = [];

  return {
    identifier: 'mdx',
    async trackFiles(filesMetadata) {
      // Start tracking files
      files.push(...filesMetadata);
    },
    async getTranslationStrings() {
      // Load files and determine which strings need to be translated
      return [
        {
          id: 'title',
          source: {
            string: 'Concurrency',
            locale: 'en-US',
          },
          targets: ['zh-CN', 'pt-BR'],
        },
        {
          id: 'description',
          source: {
            string:
              'This introduces the term "Hello world!" to non-programmers',
            locale: 'en-US',
          },
          targets: ['zh-CN', 'ja-JP'],
        },
      ];
    },
    async translationComplete(translatedStrings) {
      // Write translated strings back to filesystem
      console.dir(translatedStrings, { depth: null });
    },
  };
}
