import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import RewardsTasksPage from '~/components/rewards/tasks/RewardsTasksPage';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';
import { readUserFromToken } from '~/supabase/SupabaseServerGFE';

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
    pathname: '/rewards/social/tasks',
    title: intl.formatMessage({
      defaultMessage: 'Tasks | Rewards',
      description: 'Title of Rewards tasks page',
      id: '8gXpts',
    }),
  });
}

export default async function Page() {
  const user = readUserFromToken();

  if (user == null) {
    return redirect(`/login?next=${encodeURIComponent('/rewards/social')}`);
  }

  return <RewardsTasksPage />;
}
