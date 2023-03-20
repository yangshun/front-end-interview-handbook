import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

import { createSupabaseAdminClientGFE } from '~/supabase/SupabaseServerGFE';

// This API is called by Supabase database hooks whenever a new
// row in the `profile` table is created. It receives a `body` resembling:
//  {
//    type: 'INSERT',
//    table: 'Profile',
//    record: {
//      id: 'ca139f0c-a6f2-48d9-958c-285968b27101',
//      plan: null,
//      premium: false,
//      createdAt: '2022-08-06T11:26:38.52669+00:00',
//      stripeCustomer: null
//    },
//    schema: 'public',
//    old_record: null
//  }
// WARNING: Do not change this file name/path without changing
// the database hook URL in Supabase!
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.query.API_ROUTE_SECRET !== process.env.API_ROUTE_SECRET) {
    return res.status(401).send({
      error: {
        message: 'You are not authorized to call this API',
      },
      success: false,
    });
  }

  const supabaseAdmin = createSupabaseAdminClientGFE();

  const userId = req.body.record?.id as string; // Supabase auth user ID.

  if (userId == null) {
    return res.status(401).send({
      error: {
        message: 'No user ID provided to create Stripe customer',
      },
      success: false,
    });
  }

  const {
    data: { user },
    error,
  } = await supabaseAdmin.auth.admin.getUserById(userId);

  if (error != null) {
    return res.status(error.status ?? 500).send({
      error: {
        message: error.message,
      },
      success: false,
    });
  }

  if (user == null) {
    return res.status(500).send({
      error: {
        message: `No user found for ${userId}`,
      },
      success: false,
    });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2022-11-15',
  });

  const customer = await stripe.customers.create({
    email: user.email,
  });

  await supabaseAdmin
    .from('Profile')
    .update({
      stripeCustomer: customer.id,
    })
    .eq('id', userId);

  res.send({ payload: { customer_id: customer.id }, success: true });
}
