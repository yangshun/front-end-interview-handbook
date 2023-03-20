import type { NextApiRequest, NextApiResponse } from 'next';

import { sendMessage } from '~/lib/telegram';

import fetchLocalizedPlanPricing from '~/components/pricing/fetchLocalizedPlanPricing';

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
    sendMessage({
      message: `Error fetching pricing plans for ${countryCode}: ${err.message}`,
      severity: 'error',
    });
  }
}
