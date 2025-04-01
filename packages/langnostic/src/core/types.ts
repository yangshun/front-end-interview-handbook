import { TranslationGroupBatch } from './runner/TranslationGroupBatch';

export type TranslationFileItem = Readonly<{
  path: string;
  locale: Locale;
}>;

export type TranslationFileMetadata = Readonly<{
  source: TranslationFileItem;
  targets: ReadonlyArray<TranslationFileItem>;
}>;

export type TranslationGroupId = string;
export type TranslationGroupBatchId = string;
export type TranslationJobId = string;
export type TranslationRunId = string;

export interface TranslationGroup {
  groupId: TranslationGroupId;
  plugin: Plugin;
  batches: Map<TranslationGroupBatchId, TranslationGroupBatch>;
}

export type TranslationGroups = Map<TranslationGroupId, TranslationGroup>;
export type TranslationGroupBatchStatus =
  | 'queued'
  | 'translating'
  | 'success'
  | 'error';

export type TranslationString = Readonly<{
  string: string;
  locale: Locale;
}>;

export type TranslationStringResult = Readonly<{
  id: string;
  batchId: TranslationGroupBatchId;
  source: TranslationString;
  targets: ReadonlyArray<TranslationString>;
}>;

export type TranslationStringArg = Readonly<{
  id: string;
  batchId: TranslationGroupBatchId;
  source: TranslationString &
    Readonly<{
      description?: string; // Optional context for the translation
    }>;
  // Let plugin decide which locales to translate to because
  // only it knows what hasn't been translated
  targets: ReadonlyArray<Locale>;
}>;

export interface Plugin {
  /**
   * Unique identifier for the plugin type
   */
  type: string;
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
    translatedStrings: ReadonlyArray<TranslationStringResult>,
  ) => Promise<void>;
}

export type TranslationJob = Readonly<{
  runId: TranslationRunId;
  jobId: TranslationJobId;
  group: TranslationGroupId;
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
