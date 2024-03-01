import Stripe from 'stripe';

import absoluteUrl from '~/lib/absoluteUrl';

import countryNames from '~/data/countryCodesToNames.json';

import { createSupabaseAdminClientGFE_SERVER_ONLY } from '~/supabase/SupabaseServerGFE';

import { publicProcedure, router, userProcedure } from '../trpc';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

export const purchasesRouter = router({
  billingPortal: userProcedure.mutation(async ({ ctx: { user, req } }) => {
    const { origin } = absoluteUrl(req);

    const supabaseAdmin = createSupabaseAdminClientGFE_SERVER_ONLY();
    const { data, error } = await supabaseAdmin
      .from('Profile')
      .select('stripeCustomer')
      .eq('id', user.id)
      .single();

    if (error != null) {
      throw new Error(error.message);
    }

    if (data == null) {
      throw new Error(`No profile found for ${user.id}`);
    }

    if (data.stripeCustomer == null) {
      throw new Error(`No Stripe customer found for ${user.id}`);
    }

    const stripeCustomerId = data.stripeCustomer;

    const session = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: `${origin}/profile/billing`,
    });

    return session.url;
  }),
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
