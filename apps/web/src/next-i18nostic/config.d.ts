declare module 'next-i18nostic/config' {
  import type { Metadata } from 'next';
  export type HrefLang = keyof NonNullable<
    NonNullable<Metadata['alternates']>['languages']
  >;

  type Config = Readonly<{
    defaultLocale: string;
    localeDetection: boolean | undefined;
    localeHrefLangs: Record<string, HrefLang>;
    locales: ReadonlyArray<string>;
    trailingSlash: boolean | undefined;
  }>;

  // eslint-disable-next-line init-declarations
  const config: Config;
  export default config;
}
