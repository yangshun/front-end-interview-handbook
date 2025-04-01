import { buildTranslatedContentMap, buildTranslationStrings } from './plugins';

describe('buildTranslatedContentMap', () => {
  it('single locale translated content map', () => {
    const translatedStrings = [
      {
        id: 'id',
        batchId: 'path',
        source: {
          string: 'Hello',
          locale: 'en-US',
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
        id: 'greeting',
        batchId: 'path',
        source: {
          string: 'Hello',
          locale: 'en-US',
        },
        targets: [
          { locale: 'pt-BR', string: 'Bonjour' },
          { locale: 'es-ES', string: 'Hola' },
        ],
      },
      {
        id: 'farewell',
        batchId: 'path',
        source: {
          string: 'Farewell',
          locale: 'en-US',
        },
        targets: [
          { locale: 'pt-BR', string: 'Au revoir' },
          { locale: 'es-ES', string: 'Adiós' },
        ],
      },
    ];
    expect(buildTranslatedContentMap(translatedStrings)).toEqual(
      new Map([
        ['pt-BR', { greeting: 'Bonjour', farewell: 'Au revoir' }],
        ['es-ES', { greeting: 'Hola', farewell: 'Adiós' }],
      ]),
    );
  });
});

describe('buildTranslationStrings', () => {
  const fileMock = {
    source: { path: 'translations.json', locale: 'en-US' },
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
    const content = { greeting: 'Hello', farewell: 'Goodbye' };
    const changes = {
      'pt-BR': ['greeting'],
      'zh-CN': ['greeting', 'farewell'],
    };
    expect(buildTranslationStrings(content, changes, fileMock)).toEqual([
      {
        id: 'greeting',
        batchId: 'translations.json',
        source: { string: 'Hello', locale: 'en-US' },
        targets: ['pt-BR', 'zh-CN'],
      },
      {
        id: 'farewell',
        batchId: 'translations.json',
        source: { string: 'Goodbye', locale: 'en-US' },
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
        id: 'greeting',
        batchId: 'translations.json',
        source: {
          string: 'Hello',
          locale: 'en-US',
          description: 'A common greeting',
        },
        targets: ['pt-BR'],
      },
    ]);
  });
});
