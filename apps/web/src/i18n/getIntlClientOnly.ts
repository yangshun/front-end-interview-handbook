import { createIntl, createIntlCache } from '~/components/intl';

import { getLocaleMessages } from '.';

// For use outside of server components.
export async function getIntlClientOnly(locale: string) {
  const cache = createIntlCache();
  const messages = await getLocaleMessages(locale);

  return createIntl(
    {
      locale,
      messages,
    },
    cache,
  );
}
