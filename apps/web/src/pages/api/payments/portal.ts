import cookie from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

import absoluteUrl from '~/lib/absoluteUrl';

import {
  createSupabaseAdminClientGFE_SERVER_ONLY,
  readUserFromToken,
} from '~/supabase/SupabaseServerGFE';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { origin } = absoluteUrl(req);

  const user = await readUserFromToken(
    cookie.parse(req.headers?.cookie ?? '')['supabase-auth-token'],
  );

  if (user == null) {
    return res.status(401).send({
      error: {
        message: 'Unauthorized request. Check that you are logged in.',
      },
      success: false,
    });
  }

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

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2023-10-16',
  });

  const session = await stripe.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: `${origin}/profile/billing`,
  });

  res.send({
    payload: {
      url: session.url,
    },
    success: true,
  });
}
