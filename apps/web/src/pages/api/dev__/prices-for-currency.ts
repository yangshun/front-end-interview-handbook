import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

/**
 * A convenient API to query prices since Stripe dashboard doesn't support
 * filtering and sorting. Useful for filtering prices for archiving.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2022-11-15',
  });

  const prices = await stripe.prices.search({
    query: `active:"true" AND currency:"${req.query.currency ?? 'usd'}"`,
  });

  return res.status(200).json({ prices });
}
