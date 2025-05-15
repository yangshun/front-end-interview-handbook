import type {
  TranslationGroupBatchId,
  TranslationGroupBatchStatus,
  TranslationStringArg,
  TranslationStringResult,
} from '../types';

export class TranslationGroupBatch {
  #batchId: TranslationGroupBatchId;
  #status: TranslationGroupBatchStatus;
  #errors: Array<Error>;
  #time: {
    end: number | null;
    start: number | null;
  };
  #translations: Array<TranslationStringResult>;
  #strings: ReadonlyArray<TranslationStringArg>;

  constructor(
    batchId: TranslationGroupBatchId,
    strings: ReadonlyArray<TranslationStringArg>,
  ) {
    this.#batchId = batchId;
    this.#status = 'queued';
    this.#errors = [];
    this.#time = { end: null, start: null };
    this.#translations = [];
    this.#strings = strings;
  }

  get batchId() {
    return this.#batchId;
  }

  get status() {
    return this.#status;
  }

  get strings() {
    return this.#strings;
  }

  get translations() {
    return this.#translations;
  }

  startTranslating() {
    if (this.#status !== 'queued') {
      return;
    }

    this.#status = 'translating';
    this.#time.start = Date.now();
  }

  addTranslations(results: ReadonlyArray<TranslationStringResult>) {
    if (this.#status !== 'translating') {
      throw Error(
        'Cannot add translations to a batch that is not translating.',
      );
    }

    this.#translations.push(...results);

    if (this.#translations.length === this.#strings.length) {
      this.#status = 'success';
      this.#time.end = Date.now();
    }
  }

  addError(error: Error) {
    this.#errors.push(error);
    if (this.#status !== 'queued') {
      return;
    }

    this.#status = 'error';
    this.#time.end = Date.now();
  }

  get duration(): number | null {
    return this.#time.start
      ? (this.#time.end ?? Date.now()) - this.#time.start
      : null;
  }
}
