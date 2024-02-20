import type { Metadata } from 'next';

import ProfileCoupons from '~/components/profile/ProfileCoupons';

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

  return defaultMetadata({
    locale,
    pathname: '/projects/settings/coupons',
    title: intl.formatMessage({
      defaultMessage: 'Coupons | Settings | Projects',
      description: 'Title of coupons page',
      id: '/+z694',
    }),
  });
}

export default async function Page() {
  return <ProfileCoupons />;
}
