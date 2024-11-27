import type { Metadata } from 'next';

import ProfileActivity from '~/components/profile/ProfileActivity';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);
  const title = intl.formatMessage({
    defaultMessage: 'Activity | Profile',
    description: 'Title of Profile Activity page',
    id: 'tO/Ph4',
  });

  return defaultMetadata({
    locale,
    ogImageTitle: title,
    pathname: '/profile',
    title,
  });
}

export default async function Page() {
  return <ProfileActivity />;
}
