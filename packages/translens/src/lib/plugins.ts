import { groupBy, mapValues } from 'lodash-es';
import {
  TranslationStringArg,
  TranslationFileMetadata,
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
      targets.map(({ locale, string }) => ({ locale, id, string })),
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
  changes: Record<Locale, Array<string>>,
  file: TranslationFileMetadata,
): Array<TranslationStringArg> {
  return Object.entries(content).reduce<TranslationStringArg[]>(
    (acc, [key, value]) => {
      const missingInTargets = file.targets
        .filter((target) => changes[target.locale]?.includes(key))
        .map((target) => target.locale);

      if (missingInTargets.length > 0) {
        acc.push({
          id: key,
          batchId: file.source.path,
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
): { string: string; locale: Locale; description?: string } {
  return typeof value === 'object'
    ? { string: value.defaultMessage, description: value.description, locale }
    : { string: value, locale };
}
