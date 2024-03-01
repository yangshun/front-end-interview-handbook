import type { NextApiRequest, NextApiResponse } from 'next';

import countryNames from '~/data/countryCodesToNames.json';

import fetchInterviewsLocalizedPlanPricing from '~/components/interviews/pricing/fetchInterviewsLocalizedPlanPricing';

import logMessage from '~/logging/logMessage';

type CountryCode = keyof typeof countryNames;
type QueryParams = Readonly<{
  country?: string;
}>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { country } = req.query as QueryParams;
  const countryCode: string = country ?? req.cookies.country ?? 'US';

  try {
    const plans = await fetchInterviewsLocalizedPlanPricing(countryCode);

    return res.json({
      country: {
        code: countryCode,
        name: countryNames[countryCode as CountryCode],
      },
      plans,
    });
  } catch (err: any) {
    logMessage({
      level: 'error',
      message: `Error fetching pricing plans for ${countryCode}: ${err.message}`,
      title: 'Pricing plans error',
    });
  }
}
