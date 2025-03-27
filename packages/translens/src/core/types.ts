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
  filePath: string;
  source: TranslationStringItem;
  targets: ReadonlyArray<TranslationStringItem>;
}>;

export type TranslationStringArg = Readonly<{
  id: string;
  filePath: string;
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
   * The plugin that should start tracking these files
   */
  trackFiles: (
    filesMetadata: ReadonlyArray<TranslationFileMetadata>,
  ) => Promise<void>;
  /**
   * Plugin-specific prompt
   */
  getInstructions?: () => Promise<string>;
  /**
   * Return a list of strings to be translated and their target locales
   */
  getTranslationStrings: () => Promise<ReadonlyArray<TranslationStringArg>>;
  /**
   * Called when the runner completes translating all the strings
   */
  onTranslationComplete: (
    translatedStrings: ReadonlyArray<TranslationStringMetadata>,
  ) => Promise<void>;
}

export type TranslationJob = Readonly<{
  group: TranslationGroupName;
  strings: ReadonlyArray<TranslationStringArg>;
}>;

export interface JsonChangeDetector {
  /**
   * Get the missing translation keys for each target locale
   */
  getMissingTranslationKeys(
    file: TranslationFileMetadata,
  ): Promise<Record<Locale, Array<string>>>;
  /**
   * Get the removed translation keys for each target locale
   * which are not present in the source file
   */
  getRemovedTranslationKeys(
    file: TranslationFileMetadata,
  ): Promise<Record<Locale, Array<string>>>;
}

export interface Registry {
  frontmatter: Record<string, string>;
  content: {
    source: {
      locale: Locale;
      hashes: Array<string>;
    };
    targets: Record<Locale, Array<string>>;
  };
}
