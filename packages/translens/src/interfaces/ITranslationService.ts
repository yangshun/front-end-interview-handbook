export interface ITranslationService {
  translate(
    items: Record<string, string>,
    targetLocale: string,
  ): Promise<Record<string, string>>;
}
