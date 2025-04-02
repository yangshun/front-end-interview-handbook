import type { Metadata } from 'next/types';

import MarketingTeamPage from '~/components/marketing/team/MarketingTeamPage';
import { teamUsers } from '~/components/marketing/team/MarketingTeamUsers';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

export const dynamic = 'force-static';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    description: intl.formatMessage({
      defaultMessage:
        'Our diverse network of team members, contributors, industry experts, and community leaders spans across the globe.',
      description: 'Team page subtitle',
      id: '2s9sfp',
    }),
    locale,
    pathname: '/team',
    title: intl.formatMessage({
      defaultMessage: 'Our Team',
      description: 'Team page title',
      id: 'Mn7jsR',
    }),
  });
}

export default async function Page() {
  return <MarketingTeamPage users={teamUsers} />;
}
