export interface ConfigType {
  provider: TranslationProvider;
  localeConfig: LocaleConfig;
  groups: ConfigGroup[];
}

export interface LocaleConfig {
  source: string; // Source locale
  target: string[]; // Target locales
}

export interface ConfigGroupPathItem {
  source: string; // Source paths for source locale file
  target: string; // Target paths for translated locale file
}

type ConfigPluginType = 'json' | 'mdx' | 'string';
type ConfigPluginOptions = Record<string, any>;
type ConfigPlugin = ConfigPluginType | [ConfigPluginType, ConfigPluginOptions]; // Either just the type or the type and options

export interface ConfigGroup {
  localeConfig?: LocaleConfig; // Optional, group-specific locale config
  name: string; // Unique identifier for a group
  plugin: ConfigPlugin; // Plugin to use for the group
  paths: ConfigGroupPathItem[];
}

export type TranslationProvider = 'openai' | 'deepseek' | 'google';
