import type { Metadata } from 'next';

import ProfileCoupons from '~/components/profile/ProfileCoupons';

import { getIntlServerOnly } from '~/i18n';
import defaultProjectsMetadata from '~/seo/defaultProjectsMetadata';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultProjectsMetadata(intl, {
    locale,
    pathname: '/projects/settings/coupons',
    title: intl.formatMessage({
      defaultMessage: 'Coupons | Settings',
      description: 'Title of coupons page',
      id: 'i0RFBu',
    }),
  });
}

export default async function Page() {
  return <ProfileCoupons />;
}
