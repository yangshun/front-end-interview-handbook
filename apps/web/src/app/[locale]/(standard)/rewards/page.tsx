import type { Metadata } from 'next';

import RewardsIntroPage from '~/components/rewards/RewardsIntroPage';

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

export default async function Page() {
  const user = await fetchUser();

  return <RewardsIntroPage isSignedIn={user != null} />;
}
