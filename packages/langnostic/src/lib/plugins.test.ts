import { buildTranslatedContentMap, buildTranslationStrings } from './plugins';

describe('buildTranslatedContentMap', () => {
  it('single locale translated content map', () => {
    const translatedStrings = [
      {
        batchId: 'path',
        id: 'id',
        source: {
          locale: 'en-US',
          string: 'Hello',
        },
        targets: [{ locale: 'pt-BR', string: 'Bonjour' }],
      },
    ];

    expect(buildTranslatedContentMap(translatedStrings)).toEqual(
      new Map([['pt-BR', { id: 'Bonjour' }]]),
    );
  });

  test('multiple locales translated content map', () => {
    const translatedStrings = [
      {
        batchId: 'path',
        id: 'greeting',
        source: {
          locale: 'en-US',
          string: 'Hello',
        },
        targets: [
          { locale: 'pt-BR', string: 'Bonjour' },
          { locale: 'es-ES', string: 'Hola' },
        ],
      },
      {
        batchId: 'path',
        id: 'farewell',
        source: {
          locale: 'en-US',
          string: 'Farewell',
        },
        targets: [
          { locale: 'pt-BR', string: 'Au revoir' },
          { locale: 'es-ES', string: 'Adiós' },
        ],
      },
    ];

    expect(buildTranslatedContentMap(translatedStrings)).toEqual(
      new Map([
        ['pt-BR', { farewell: 'Au revoir', greeting: 'Bonjour' }],
        ['es-ES', { farewell: 'Adiós', greeting: 'Hola' }],
      ]),
    );
  });
});

describe('buildTranslationStrings', () => {
  const fileMock = {
    source: { locale: 'en-US', path: 'translations.json' },
    targets: [
      { locale: 'pt-BR', path: 'target.json' },
      { locale: 'zh-CN', path: 'target.json' },
    ],
  };

  test('keys to translate is empty', () => {
    const content = { greeting: 'Hello' };
    const changes = { 'pt-BR': [], 'zh-CN': [] };

    expect(buildTranslationStrings(content, changes, fileMock)).toEqual([]);
  });

  test('keys to translate is not empty', () => {
    const content = { farewell: 'Goodbye', greeting: 'Hello' };
    const changes = {
      'pt-BR': ['greeting'],
      'zh-CN': ['greeting', 'farewell'],
    };

    expect(buildTranslationStrings(content, changes, fileMock)).toEqual([
      {
        batchId: 'translations.json',
        id: 'greeting',
        source: { locale: 'en-US', string: 'Hello' },
        targets: ['pt-BR', 'zh-CN'],
      },
      {
        batchId: 'translations.json',
        id: 'farewell',
        source: { locale: 'en-US', string: 'Goodbye' },
        targets: ['zh-CN'],
      },
    ]);
  });

  test('source content with value containing defaultMessage and description', () => {
    const content = {
      greeting: { defaultMessage: 'Hello', description: 'A common greeting' },
    };
    const changes = { 'pt-BR': ['greeting'] };

    expect(buildTranslationStrings(content, changes, fileMock)).toEqual([
      {
        batchId: 'translations.json',
        id: 'greeting',
        source: {
          description: 'A common greeting',
          locale: 'en-US',
          string: 'Hello',
        },
        targets: ['pt-BR'],
      },
    ]);
  });
});
