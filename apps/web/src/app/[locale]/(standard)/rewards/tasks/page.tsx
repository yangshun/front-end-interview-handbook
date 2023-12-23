import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import RewardsTasksPage from '~/components/rewards/tasks/RewardsTasksPage';

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
    pathname: '/rewards/terms',
    title: intl.formatMessage({
      defaultMessage: 'Terms | Rewards',
      description: 'Title of Rewards Terms page',
      id: 'YkG6kJ',
    }),
  });
}

export default async function Page() {
  const user = await fetchUser();

  if (user == null) {
    return redirect(`/login?next=${encodeURIComponent('/rewards')}`);
  }

  return <RewardsTasksPage />;
}
