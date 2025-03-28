export interface LocaleConfig {
  source: string; // Source locale
  target: string[]; // Target locales
}

export interface ConfigGroupPathItem {
  source: string; // source location for the base source locale file
  target: string; // target location for the translated locale file
  excludeKeys?: string[]; // Keys to skip from the translation
  ignore?: string[]; // files to ignore
}

export interface ConfigGroup {
  name: string;
  plugin: 'json' | 'mdx' | 'string'; // Type of default handler or a custom handler
  paths: ConfigGroupPathItem[];
  localeConfig?: LocaleConfig; // Optional, group-specific locale config
}

export type TranslationProvider = 'openai' | 'deepseek' | 'google';

export interface ConfigType {
  provider: TranslationProvider;
  localeConfig: LocaleConfig;
  groups: ConfigGroup[];
}
