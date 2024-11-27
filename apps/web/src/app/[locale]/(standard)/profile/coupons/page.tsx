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
  const title = intl.formatMessage({
    defaultMessage: 'Coupons | Profile',
    description: 'Title of Profile coupons page',
    id: 'myWGmV',
  });

  return defaultMetadata({
    locale,
    ogImageTitle: title,
    pathname: '/profile/coupons',
    title,
  });
}

export default async function ProfileCouponsPage() {
  return <ProfileCoupons />;
}
