import Stripe from 'stripe';

import countryNames from '~/data/countryCodesToNames.json';

import { publicProcedure, router } from '../trpc';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

export const purchasesRouter = router({
  recent: publicProcedure.query(async () => {
    const charges = await stripe.charges.search({
      limit: 10,
      query: "status:'succeeded'",
    });

    const purchases = charges.data.map((charge) => {
      const countryCode = (charge.billing_details.address?.country ??
        'US') as keyof typeof countryNames;

      return {
        country: countryNames[countryCode],
      };
    });

    return purchases;
  }),
});
