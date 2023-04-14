import Stripe from 'stripe';

import countryNames from '~/data/countryCodesToNames.json';

import { publicProcedure, router } from '../trpc';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15',
});

export const purchasesRouter = router({
  recent: publicProcedure.query(async () => {
    const charges = await stripe.charges.list({
      limit: 5,
    });

    const purchases = charges.data.map((charge) => {
      const firstNameTokens = (charge.billing_details.name ?? '')
        .trim()
        .split(/(\s+)/);

      const countryCode = (charge.billing_details.address?.country ??
        'US') as keyof typeof countryNames;

      return {
        country: countryNames[countryCode],
        name: firstNameTokens.length > 0 ? firstNameTokens[0] : 'Someone',
      };
    });

    return purchases;
  }),
});
