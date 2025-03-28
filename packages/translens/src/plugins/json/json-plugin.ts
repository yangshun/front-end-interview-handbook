import {
  Plugin,
  TranslationFileMetadata,
  TranslationStringArg,
} from '../../core/types';
import {
  ensureFileAndDirExists,
  readFile,
  writeFile,
} from '../../lib/file-service';
import {
  buildTranslatedContentMap,
  buildTranslationStrings,
} from '../../lib/plugins';
import { processFileForChanges } from './json-change-detector';

type TranslationEntry =
  | Readonly<{ defaultMessage: string; description: string }>
  | string;

export default function JsonPlugin(): Plugin {
  const files: Array<TranslationFileMetadata> = [];

  return {
    type: 'json',
    async trackFiles(filesMetadata) {
      // Start tracking files
      files.push(...filesMetadata);
    },
    async getInstructions() {
      return 'The strings are in ICU syntax';
    },
    async getTranslationStrings() {
      const translationStrings: Array<TranslationStringArg> = [];
      for (const file of files) {
        // Process file to get keys that need to be translated
        const keysToTranslate = await processFileForChanges(file);

        const sourceJson = await readJson(file.source.path);

        if (!sourceJson) continue;

        translationStrings.push(
          ...buildTranslationStrings(sourceJson, keysToTranslate, file),
        );
      }
      return translationStrings;
    },
    async onTranslationBatchComplete(translatedStrings) {
      if (!translatedStrings.length) {
        return;
      }

      const file = files.find(
        (file) => file.source.path === translatedStrings[0].batchId,
      );
      if (!file) {
        return;
      }

      const translatedContentMap = buildTranslatedContentMap(translatedStrings);
      const sourceJson = await readJson(file.source.path);
      if (!sourceJson) return;

      // Write to each target file concurrently
      await Promise.all(
        file.targets.map((target) =>
          processTargetFile(target, translatedContentMap, sourceJson),
        ),
      );
    },
  };
}

function mergeTranslations(
  targetJson: Record<string, TranslationEntry>,
  translatedContent: Record<string, string>,
  sourceJson: Record<string, TranslationEntry>,
): Record<string, TranslationEntry> {
  Object.entries(translatedContent).forEach(([key, value]) => {
    targetJson[key] =
      typeof sourceJson[key] === 'object'
        ? {
            defaultMessage: value,
            description: sourceJson[key].description,
          }
        : value;
  });

  return sortKeys(targetJson);
}

function sortKeys(
  obj: Record<string, TranslationEntry>,
): Record<string, TranslationEntry> {
  return Object.keys(obj)
    .sort()
    .reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {});
}

async function readJson(
  path: string,
): Promise<Record<string, TranslationEntry> | null> {
  try {
    const content = await readFile(path);
    return JSON.parse(content);
  } catch {
    return null;
  }
}

async function writeJson(path: string, data: Record<string, TranslationEntry>) {
  await writeFile(path, JSON.stringify(sortKeys(data), null, 2));
}

async function processTargetFile(
  target: { path: string; locale: string },
  translatedContentMap: Map<string, Record<string, string>>,
  sourceJson: Record<string, TranslationEntry>,
) {
  // Ensure target file and its directory exist
  await ensureFileAndDirExists(target.path, JSON.stringify({}, null, 2));

  const targetJson = (await readJson(target.path)) || {};
  const translatedContent = translatedContentMap.get(target.locale) || {};

  const mergedContent = mergeTranslations(
    targetJson,
    translatedContent,
    sourceJson,
  );
  await writeJson(target.path, mergedContent);
}
