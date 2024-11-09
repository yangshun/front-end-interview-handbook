import nextI18nosticConfig from 'next-i18nostic/config';

export default function generateStaticParamsWithLocale<T>(
  params: ReadonlyArray<T>,
  // For now generate static params for default locales
  // for non-prod so that the builds are faster.
  defaultLocaleOnly = process.env.VERCEL_ENV !== 'production',
  paramName = 'locale',
  // TODO: Improve typing.
) {
  if (defaultLocaleOnly) {
    return params.map((paramValues) => ({
      ...paramValues,
      [paramName]: nextI18nosticConfig.defaultLocale,
    }));
  }

  return nextI18nosticConfig.locales
    .map((locale) =>
      params.map((paramValues) => ({
        ...paramValues,
        [paramName]: locale,
      })),
    )
    .flat();
}
