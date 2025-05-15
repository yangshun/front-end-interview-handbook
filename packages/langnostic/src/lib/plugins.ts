import { groupBy, mapValues } from 'lodash-es';

import type {
  TranslationFileMetadata,
  TranslationStringArg,
  TranslationStringResult,
} from '../core/types';

/**
 * Build a map of translated content for each target locale.
 */
export function buildTranslatedContentMap(
  translatedStrings: ReadonlyArray<TranslationStringResult>,
): Map<Locale, Record<string, string>> {
  const grouped = groupBy(
    translatedStrings.flatMap(({ id, targets }) =>
      targets.map(({ locale, string }) => ({ id, locale, string })),
    ),
    'locale',
  );
  const contentMap = new Map<Locale, Record<string, string>>(
    Object.entries(
      mapValues(grouped, (translations) =>
        Object.fromEntries(translations.map(({ id, string }) => [id, string])),
      ),
    ),
  );

  return contentMap;
}

export function buildTranslationStrings(
  content: Record<
    string,
    | string
    | {
        defaultMessage: string;
        description: string;
      }
  >,
  changes: Record<Locale, ReadonlyArray<string>>,
  file: TranslationFileMetadata,
): ReadonlyArray<TranslationStringArg> {
  return Object.entries(content).reduce<Array<TranslationStringArg>>(
    (acc, [key, value]) => {
      const missingInTargets = file.targets
        .filter((target) => changes[target.locale]?.includes(key))
        .map((target) => target.locale);

      if (missingInTargets.length > 0) {
        acc.push({
          batchId: file.source.path,
          id: key,
          source: getTranslationSource(value, file.source.locale),
          targets: missingInTargets,
        });
      }

      return acc;
    },
    [],
  );
}

function getTranslationSource(
  value: string | { defaultMessage: string; description: string },
  locale: Locale,
): { description?: string; locale: Locale; string: string; } {
  return typeof value === 'object'
    ? { description: value.description, locale, string: value.defaultMessage }
    : { locale, string: value };
}
