import { globby } from 'globby';

import type { ConfigGroupPathItem, LocaleConfig } from '../config/types';
import type { TranslationFileItem, TranslationFileMetadata } from './types';

// Helper: escape RegExp special characters in a literal string.
function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function generateTargetPaths(
  srcPattern: string,
  destPattern: string,
  srcFile: string,
  locales: ReadonlyArray<string>,
): ReadonlyArray<TranslationFileItem> {
  // Convert the source glob pattern into a regex.
  // We'll split the pattern by the wildcard tokens **/ and *
  const srcTokens = srcPattern.split(/(\*\*\/|\*)/);
  let regexStr = '^';

  for (const token of srcTokens) {
    if (token === '**/') {
      // ** Can match multiple directories (including slashes)
      regexStr += '(.*/)?';
    } else if (token === '*') {
      // * Matches anything except a slash
      regexStr += '([^/]+)';
    } else {
      regexStr += escapeRegExp(token);
    }
  }
  regexStr += '$';

  const srcRegex = new RegExp(regexStr);
  const match = srcRegex.exec(srcFile);

  if (!match) {
    throw new Error('Source file does not match source pattern');
  }

  // The capture groups (starting at index 1) correspond to wildcards in order.
  const captures = match.slice(1).map((capture) => capture || '');

  // Split the destination pattern on tokens: **/, *, or the locale placeholder.
  const destTokens = destPattern.split(/(\*\*\/|\*|{locale})/);

  // For each locale, rebuild the destination path by substituting:
  // - For each wildcard token (**/ or *), use the corresponding captured value (in order).
  // - For a token '{locale}', use the current locale.
  function buildPathForLocale(locale: string) {
    let result = '';
    let captureIndex = 0;

    for (const token of destTokens) {
      if (token === '**/' || token === '*') {
        result += captures[captureIndex];
        captureIndex++;
      } else if (token === '{locale}') {
        result += locale;
      } else {
        result += token;
      }
    }

    return result;
  }

  return locales.map((locale) => ({
    locale,
    path: buildPathForLocale(locale),
  }));
}

export async function expandTargetPaths(
  localeConfig: LocaleConfig,
  pathItem: ConfigGroupPathItem,
): Promise<ReadonlyArray<TranslationFileMetadata>> {
  const paths = await globby(pathItem.source);

  return paths.map((sourcePath) => ({
    source: {
      locale: localeConfig.source,
      path: sourcePath,
    },
    targets: generateTargetPaths(
      pathItem.source,
      pathItem.target,
      sourcePath,
      localeConfig.target,
    ),
  }));
}
