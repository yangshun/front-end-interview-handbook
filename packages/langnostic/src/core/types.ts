import type { TranslationGroupBatch } from './runner/TranslationGroupBatch';

export type TranslationFileItem = Readonly<{
  locale: Locale;
  path: string;
}>;

export type TranslationFileMetadata = Readonly<{
  source: TranslationFileItem;
  targets: ReadonlyArray<TranslationFileItem>;
}>;

export type TranslationGroupId = string;
export type TranslationGroupBatchId = string;
export type TranslationJobId = string;
export type TranslationRunId = string;

export type TranslationGroup = {
  batches: Map<TranslationGroupBatchId, TranslationGroupBatch>;
  groupId: TranslationGroupId;
  plugin: Plugin;
  stringsPerRequest: number;
}

export type TranslationGroups = Map<TranslationGroupId, TranslationGroup>;
export type TranslationGroupBatchStatus =
  'error' | 'queued' | 'success' | 'translating';

export type TranslationString = Readonly<{
  locale: Locale;
  string: string;
}>;

export type TranslationStringResult = Readonly<{
  batchId: TranslationGroupBatchId;
  id: string;
  source: TranslationString;
  targets: ReadonlyArray<TranslationString>;
}>;

export type TranslationStringArg = Readonly<{
  batchId: TranslationGroupBatchId;
  id: string;
  source: Readonly<{
      description?: string; // Optional context for the translation
    }> & TranslationString;
  // Let plugin decide which locales to translate to because
  // only it knows what hasn't been translated
  targets: ReadonlyArray<Locale>;
}>;

export type Plugin = {
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
    translatedStrings: ReadonlyArray<TranslationStringResult>,
  ) => Promise<void>;
  /**
   * Strings per request
   */
  stringsPerRequest: number;
  /**
   * The plugin that should start tracking these files
   */
  trackFiles: (
    filesMetadata: ReadonlyArray<TranslationFileMetadata>,
  ) => Promise<void>;
  /**
   * Unique identifier for the plugin type
   */
  type: string;
}

export type TranslationRequestJob = Readonly<{
  batch: TranslationGroupBatchId;
  group: TranslationGroupId;
  jobId: TranslationJobId;
  runId: TranslationRunId;
  strings: ReadonlyArray<TranslationStringArg>;
}>;

export type Registry = {
  content: {
    source: {
      hashes: Array<string>;
      locale: Locale;
    };
    targets: Record<Locale, Array<string>>;
  };
  frontmatter: Record<string, string>;
}
