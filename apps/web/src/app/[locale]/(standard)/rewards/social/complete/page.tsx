import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import url from 'node:url';

import RewardsCompletePage from '~/components/rewards/complete/RewardsCompletePage';

import { getIntlServerOnly } from '~/i18n';
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
    ogImageTitle: title,
    pathname: '/rewards/social/complete',
    title,
  });
}

export default async function Page() {
  const viewer = await readViewerFromToken();

  if (viewer == null) {
    return redirect(
      url.format({
        pathname: '/login',
        query: {
          next: '/rewards/social',
        },
      }),
    );
  }

  return <RewardsCompletePage />;
}
