import type { TranslationAI } from '../translation/providers';

export type ConfigType = {
  ai: TranslationAI;
  concurrencyLimit?: number;
  groups: Array<ConfigGroup>;
  localeConfig: LocaleConfig;
};

export type LocaleConfig = {
  source: string; // Source locale
  target: Array<string>; // Target locales
};

export type ConfigGroupPathItem = {
  source: string; // Source paths for source locale file
  target: string; // Target paths for translated locale file
};

type ConfigPluginType = 'json' | 'mdx' | 'string';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ConfigPluginOptions = Record<string, any>;
type ConfigPlugin =
  | ConfigPluginType
  | [ConfigPluginType, ConfigPluginOptions]
  | [ConfigPluginType]; // Either just the type or the type and options

export type ConfigGroup = {
  localeConfig?: LocaleConfig; // Optional, group-specific locale config
  name: string; // Unique identifier for a group
  paths: Array<ConfigGroupPathItem>;
  plugin: ConfigPlugin; // Plugin to use for the group
  stringsPerRequest?: number; // Optional, maximum number of strings per request
};
