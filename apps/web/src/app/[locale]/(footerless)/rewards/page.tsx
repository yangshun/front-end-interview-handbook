import type { Metadata } from 'next';

import RewardsIntro from '~/components/rewards/RewardsIntro';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';
import { fetchUser } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    locale,
    pathname: '/rewards',
    title: intl.formatMessage({
      defaultMessage: 'Rewards',
      description: 'Title of Rewards page',
      id: 'HQunmZ',
    }),
  });
}

export default async function RewardsPage() {
  const user = await fetchUser();

  return <RewardsIntro isSignedIn={user != null} />;
}
