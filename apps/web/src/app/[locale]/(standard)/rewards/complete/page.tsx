import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import RewardsComplete from '~/components/rewards/RewardsComplete';

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
    pathname: '/rewards/complete',
    title: intl.formatMessage({
      defaultMessage: 'Complete | Rewards',
      description: 'Title of Rewards Complete page',
      id: 'XIMn32',
    }),
  });
}

export default async function RewardsCompletePage() {
  const user = await fetchUser();

  if (user == null) {
    return redirect(`/login?next=${encodeURIComponent('/rewards')}`);
  }

  return <RewardsComplete />;
}
