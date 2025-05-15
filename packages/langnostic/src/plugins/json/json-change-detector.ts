import type { TranslationFileMetadata } from '../../core/types';
import { fileExists, readFile, writeFile } from '../../lib/file-service';

function compareJsonData(
  sourceJson: Record<string, string>,
  targetJson: Record<string, string> | null,
): Readonly<{
  keysToTranslate: Array<string>;
  removedKeys: Array<string>;
}> {
  if (!targetJson) {
    return {
      keysToTranslate: Object.keys(sourceJson),
      removedKeys: [],
    };
  }

  return {
    keysToTranslate: Object.keys(sourceJson).filter(
      (key) => !(key in targetJson),
    ),
    removedKeys: Object.keys(targetJson).filter((key) => !(key in sourceJson)),
  };
}

export async function processFileForChanges(
  file: TranslationFileMetadata,
): Promise<Record<Locale, Array<string>>> {
  const sourceContent = await readFile(file.source.path);
  const sourceJson = JSON.parse(sourceContent);
  const result: Record<Locale, Array<string>> = {};

  // Process each target file
  for (const target of file.targets) {
    const isFileExists = await fileExists(target.path);
    const targetContent = isFileExists ? await readFile(target.path) : null;
    const targetJson = targetContent ? JSON.parse(targetContent) : null;
    const { keysToTranslate, removedKeys } = compareJsonData(
      sourceJson,
      targetJson,
    );

    result[target.locale] = keysToTranslate;

    // Remove keys that are no longer present in the source JSON from the target file
    if (removedKeys.length > 0) {
      removedKeys.forEach((key) => {
        delete targetJson[key];
      });
      await writeFile(target.path, JSON.stringify(targetJson, null, 2));
    }
  }

  return result;
}

// Only export for testing
export const __test__ = {
  compareJsonData,
};
