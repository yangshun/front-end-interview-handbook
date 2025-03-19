import fs from 'fs/promises';
import { JsonChangeDetector} from '../core/types';
import { fileExists } from '../lib/fileExists';

export default function jsonChangeDetector(): JsonChangeDetector {
  return {
    async getMissingTranslationKeys(file) {
      // Read and parse the source JSON file
      const sourceContent = await fs.readFile(file.source.path, 'utf8');
      const sourceJson = JSON.parse(sourceContent);
      const sourceKeys = Object.keys(sourceJson);
      const result: Record<Locale, Array<string>> = {};

      // Process each target file
      for (const target of file.targets) {
        const isFileExists = await fileExists(target.path);
        if (!isFileExists) {
          result[target.locale] = sourceKeys;
        } else {
          // Read and parse the target JSON file
          const targetContent = await fs.readFile(target.path, 'utf8');
          const targetJson = JSON.parse(targetContent);
          const missingKeys = sourceKeys.filter((key) => !(key in targetJson));
          result[target.locale] = missingKeys;
        }
      }

      return result;
    },
  };
}
