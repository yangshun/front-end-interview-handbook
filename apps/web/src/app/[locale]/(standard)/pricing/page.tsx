import { cookies } from 'next/headers';
import type { Metadata } from 'next/types';

import fetchLocalizedPlanPricing from '~/components/pricing/fetchLocalizedPlanPricing';

import defaultMetadata from '~/seo/defaultMetadata';

import PricingPage from './PricingPage';

export async function generateMetadata(): Promise<Metadata> {
  return defaultMetadata({
    description:
      'Pricing plans tailored to your needs. Grab our all-access lifetime plans at a 30% discount today!',
    pathname: '/pricing',
    title: 'Pricing',
  });
}

type Props = Readonly<{
  searchParams?: Readonly<{ cty?: string }>;
}>;

export default async function Page({ searchParams }: Props) {
  const cookieStore = cookies();
  // 1. Read from query param (for overrides, useful for testing).
  // 2. Read from cookie set during middleware.
  // 3. Defaults to US in case something blows up.
  const countryCode: string =
    searchParams?.cty ?? cookieStore.get('country')?.value ?? 'US';
  const plans = await fetchLocalizedPlanPricing(countryCode);

  return <PricingPage countryCode={countryCode} plans={plans} />;
}
