import fs from 'fs';
import path from 'path';

import localeConfig from './locale-config';

export function generateLocalizedFiles(dirPath: string) {
  const sourceFile = path.join(dirPath, `${localeConfig.defaultLocale}.mdx`);

  if (!fs.existsSync(sourceFile)) {
    console.error(`${sourceFile} does not exist`);
  }

  localeConfig.locales.forEach((locale) => {
    // Do nothing for default locale file.
    if (locale === localeConfig.defaultLocale) {
      return;
    }

    const localeFile = path.join(dirPath, `${locale}.mdx`);

    // Locale file exists, don't create.
    if (fs.existsSync(localeFile)) {
      return;
    }

    fs.copyFileSync(sourceFile, localeFile);
  });
}
