import { cookies } from 'next/headers';
import type { Metadata } from 'next/types';

import countryNames from '~/data/countryCodesToNames.json';

import fetchInterviewsLocalizedPlanPricing from '~/components/interviews/pricing/fetchInterviewsLocalizedPlanPricing';
import { SOCIAL_DISCOUNT_PERCENTAGE } from '~/components/promotions/social/SocialDiscountConfig';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

import PricingPage from './PricingPage';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    description: intl.formatMessage(
      {
        defaultMessage:
          'Pricing plans tailored to your needs. Grab our all-access lifetime plans at a {discountPercentage}% discount today!',
        description: 'Description of Pricing page',
        id: 'CxZ3Vp',
      },
      {
        discountPercentage: SOCIAL_DISCOUNT_PERCENTAGE,
      },
    ),
    locale,
    pathname: '/pricing',
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
  const plans = await fetchInterviewsLocalizedPlanPricing(countryCode);
  const countryName: string =
    countryNames[countryCode as keyof typeof countryNames];

  return (
    <PricingPage
      countryCode={countryCode}
      countryName={countryName}
      plans={plans}
    />
  );
}
