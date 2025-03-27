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
export type TranslationGroupBatchId = string;
export interface TranslationGroup extends ConfigGroup {
  pluginInstance: Plugin;
  batches: Map<TranslationGroupBatchId, TranslationGroupBatch>;
}

export type TranslationGroups = Map<TranslationGroupName, TranslationGroup>;
export type TranslationGroupBatchStatus =
  | 'pending'
  | 'translating'
  | 'success'
  | 'failed';

export type TranslationGroupBatch = {
  batchId: TranslationGroupBatchId;
  status: TranslationGroupBatchStatus;
  time: {
    start: null | number;
    end: null | number;
  };
  strings: ReadonlyArray<TranslationStringArg>;
};

export type TranslationStringItem = Readonly<{
  string: string;
  locale: Locale;
}>;

export type TranslationStringMetadata = Readonly<{
  id: string;
  batch: string;
  source: TranslationStringItem;
  targets: ReadonlyArray<TranslationStringItem>;
}>;

export type TranslationStringArg = Readonly<{
  id: string;
  batch: string;
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
   * Called when the runner completes translating strings in an entire batch
   */
  onTranslationBatchComplete: (
    translatedStrings: ReadonlyArray<TranslationStringMetadata>,
  ) => Promise<void>;
  onTranslationComplete?: () => Promise<void>;
}

export type TranslationJob = Readonly<{
  group: TranslationGroupName;
  batch: TranslationGroupBatchId;
  strings: ReadonlyArray<TranslationStringArg>;
}>;

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
