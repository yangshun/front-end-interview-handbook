import type { Metadata } from 'next';

// The only reason it's a JSON file is so that next-sitemap can read it.
import configJSON from './config.json';

type HrefLang = keyof NonNullable<
  NonNullable<Metadata['alternates']>['languages']
>;

type Config = Readonly<{
  defaultLocale: string;
  localeDetection?: boolean | undefined;
  localeHrefLangs: Record<string, HrefLang>;
  locales: ReadonlyArray<string>;
  trailingSlash: boolean | undefined;
}>;

// TODO: don't cast it.
const config = configJSON as Config;

export default config;
