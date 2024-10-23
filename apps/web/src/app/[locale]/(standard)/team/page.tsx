import type { Metadata } from 'next/types';

import MarketingTeamPage from '~/components/marketing/team/MarketingTeamPage';
import { teamUsers } from '~/components/marketing/team/MarketingTeamUsers';

import defaultMetadata from '~/seo/defaultMetadata';

export const dynamic = 'force-static';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  return defaultMetadata({
    description:
      'Our diverse network of team members, contributors, industry experts, and community leaders spans across the globe.',
    locale,
    pathname: '/team',
    title: 'Our Team',
  });
}

export default async function Page() {
  return <MarketingTeamPage users={teamUsers} />;
}
