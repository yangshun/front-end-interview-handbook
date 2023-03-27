import type { NextApiRequest, NextApiResponse } from 'next';

import fetchLocalizedPlanPricing from '~/components/pricing/fetchLocalizedPlanPricing';

import logMessage from '~/logging/logMessage';

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
    const plans = await fetchLocalizedPlanPricing(countryCode);

    return res.json({
      countryCode,
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
