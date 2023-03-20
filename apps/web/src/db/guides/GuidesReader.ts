import fs from 'fs';
import path from 'path';

export function readGuidesContents(
  directoryPath: string,
  locale = 'en',
): string {
  const fileContents = (() => {
    try {
      return fs.readFileSync(path.join(directoryPath, `${locale}.mdx`));
    } catch {
      // Fallback to English.
      return fs.readFileSync(path.join(directoryPath, `en.mdx`));
    }
  })();

  return fileContents.toString();
}
