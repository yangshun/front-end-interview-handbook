import { type NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

import { createSupabaseAdminClientGFE_SERVER_ONLY } from '~/supabase/SupabaseServerGFE';

// This API is called by Supabase database hooks whenever a new
// row in the `profile` table is created. It receives a `body` resembling:
// {
//   "type": "INSERT",
//   "table": "Profile",
//   "record": {
//     "id": "d220fee0-2e8c-4670-ba14-eb9881495df8",
//     "plan": null,
//     "premium": false,
//     "createdAt": "2022-08-06T11:26:38.52669+00:00",
//     "stripeCustomer": null
//   },
//   "schema": "public",
//   "old_record": null
// }
// WARNING: Do not change this file name/path and parameters without changing
// the database hook URL in Supabase!

// This hook creates a corresponding Stripe customer for each user.
export async function POST(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  if (searchParams.get('api_route_secret') !== process.env.API_ROUTE_SECRET) {
    return NextResponse.json(
      { error: 'You are not authorized to call this API' },
      { status: 401 },
    );
  }

  const supabaseAdmin = createSupabaseAdminClientGFE_SERVER_ONLY();

  const result = await req.json();
  const userId = result.record?.id as string; // Supabase auth user ID.

  if (userId == null) {
    return NextResponse.json(
      { error: 'No user ID provided to update profile' },
      { status: 401 },
    );
  }

  const {
    data: { user },
    error,
  } = await supabaseAdmin.auth.admin.getUserById(userId);

  if (error != null) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status ?? 500 },
    );
  }

  if (user == null) {
    return NextResponse.json(
      { error: `No user found for ${userId}` },
      { status: 500 },
    );
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16',
    maxNetworkRetries: 2,
  });

  // This is needed because sometimes this hook is called after the
  // checkout route which would have created a Stripe customer.
  // We don't want to create a duplicate Stripe customer.
  // Can't use Prisma here because it's not supported in edge functions.
  const { data: latestProfile } = await supabaseAdmin
    .from('Profile')
    .select('stripeCustomer')
    .eq('id', userId)
    .single();

  // If the customer exists, we'll just update the name if it exists.
  if (latestProfile?.stripeCustomer) {
    console.info(
      `Customer already exists (${latestProfile?.stripeCustomer}) for user ${userId}`,
    );

    const customer = await stripe.customers.update(
      latestProfile?.stripeCustomer,
      {
        name: user.user_metadata.name,
      },
    );

    return NextResponse.json(customer);
  }

  const customer = await stripe.customers.create(
    // Keep parameters across customer creation synced
    // because they use the same idempotency key
    {
      email: user.email,
    },
    {
      idempotencyKey: user.id,
    },
  );

  // Can't use Prisma here because it's not supported in edge functions.
  const data = await supabaseAdmin
    .from('Profile')
    .update({
      stripeCustomer: customer.id,
    })
    .eq('id', userId);

  return NextResponse.json(data);
}
