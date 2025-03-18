import { ConfigGroup } from '../config/types';

export type TranslationFileItem = Readonly<{
  path: string;
  locale: Locale;
}>;

export type TranslationFileMetadata = Readonly<{
  source: TranslationFileItem;
  targets: ReadonlyArray<TranslationFileItem>;
}>;

export type TranslationGroupName = string;

export interface TranslationGroup extends ConfigGroup {
  status: 'idle' | 'pending_translations' | 'translating';
  pluginInstance: Plugin;
  strings: ReadonlyArray<TranslationStringArg>;
}

export type TranslationStringItem = Readonly<{
  string: string;
  locale: Locale;
}>;

export type TranslationStringMetadata = Readonly<{
  id: string;
  source: TranslationStringItem;
  targets: ReadonlyArray<TranslationStringItem>;
}>;

export type TranslationStringArg = Readonly<{
  id: string;
  source: TranslationStringItem &
    Readonly<{
      description?: string; // Optional context for the translation
    }>;
  // Let plugin decide which locales to translate to because
  // only it knows what hasn't been translated
  targets: ReadonlyArray<Locale>;
}>;

export interface Plugin {
  /**
   * Unique identifier for the plugin
   */
  identifier: string;
  /**
   * The plugin that should start tracking the file
   */
  trackFiles: (
    filesMetadata: ReadonlyArray<TranslationFileMetadata>,
  ) => Promise<void>;
  /**
   * The plugin that should start tracking the file
   */
  getTranslationStrings: () => Promise<ReadonlyArray<TranslationStringArg>>;
  /**
   * Called when the runner completes translating all the strings
   */
  translationComplete: (
    translatedStrings: ReadonlyArray<TranslationStringMetadata>,
  ) => Promise<void>;
}

export type TranslationJob = Readonly<{
  group: TranslationGroupName;
  strings: ReadonlyArray<TranslationStringArg>;
}>;
