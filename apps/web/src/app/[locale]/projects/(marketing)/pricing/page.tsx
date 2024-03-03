import { cookies } from 'next/headers';
import type { Metadata } from 'next/types';

import countryNames from '~/data/countryCodesToNames.json';

import fetchProjectsPricingPlanPaymentConfigLocalizedRecord from '~/components/projects/purchase/fetchProjectsPricingPlanPaymentConfigLocalizedRecord';
import ProjectsPricingPage from '~/components/projects/purchase/ProjectsPricingPage';
import { SOCIAL_DISCOUNT_PERCENTAGE } from '~/components/promotions/social/SocialDiscountConfig';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    description: intl.formatMessage(
      {
        defaultMessage: 'Pricing plans tailored to your needs.',
        description: 'Description of Pricing page',
        id: 'b9gr/u',
      },
      {
        discountPercentage: SOCIAL_DISCOUNT_PERCENTAGE,
      },
    ),
    locale,
    pathname: '/projects/pricing',
    title: intl.formatMessage({
      defaultMessage: 'Pricing',
      description: 'Title of Pricing page',
      id: 'PeXK7/',
    }),
  });
}

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
  searchParams?: Readonly<{ cty?: string }>;
}>;

export default async function Page({ searchParams }: Props) {
  const cookieStore = cookies();
  // 1. Read from query param (for overrides, useful for testing).
  // 2. Read from cookie set during middleware.
  // 3. Defaults to US in case something blows up.
  const countryCode: string =
    searchParams?.cty ?? cookieStore.get('country')?.value ?? 'US';
  const plansPaymentConfig =
    await fetchProjectsPricingPlanPaymentConfigLocalizedRecord(countryCode);
  const countryName: string =
    countryNames[countryCode as keyof typeof countryNames];

  return (
    <ProjectsPricingPage
      countryCode={countryCode}
      countryName={countryName}
      plansPaymentConfig={plansPaymentConfig}
    />
  );
}
