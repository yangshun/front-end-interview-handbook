import type { Metadata } from 'next';
import url from 'node:url';

import RewardsCompletePage from '~/components/rewards/complete/RewardsCompletePage';

import { getIntlServerOnly } from '~/i18n';
import i18nRedirect from '~/next-i18nostic/src/utils/i18nRedirect';
import defaultMetadata from '~/seo/defaultMetadata';
import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);
  const title = intl.formatMessage({
    defaultMessage: 'Complete | Rewards',
    description: 'Title of Rewards Complete page',
    id: 'XIMn32',
  });

  return defaultMetadata({
    locale,
    ogImageProduct: null,
    ogImageTitle: title,
    pathname: '/rewards/social/complete',
    title,
  });
}

export default async function Page({ params }: Props) {
  const viewer = await readViewerFromToken();
  const { locale } = params;

  if (viewer == null) {
    return i18nRedirect(
      url.format({
        pathname: '/login',
        query: {
          next: '/rewards/social',
        },
      }),
      { locale },
    );
  }

  return <RewardsCompletePage />;
}
