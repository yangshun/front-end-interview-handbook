import nextI18nosticConfig from 'next-i18nostic/config';

export default function generateStaticParamsWithLocale<T>(
  params: ReadonlyArray<T>,
  paramName = 'locale',
  // TODO: Improve typing.
): Array<any> {
  return nextI18nosticConfig.locales
    .map((locale) =>
      params.map((paramValues) => ({
        ...paramValues,
        [paramName]: locale,
      })),
    )
    .flat();
}
