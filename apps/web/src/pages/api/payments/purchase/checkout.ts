import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import { isProhibitedCountry } from '~/lib/stripeUtils';

import type { PricingPlanType } from '~/data/PricingPlans';

import {
  createSupabaseAdminClientGFE,
  fetchUser,
} from '~/supabase/SupabaseServerGFE';

import type { QueryParams } from './checkout_session_internal_and_called_on_server_only__';

export const config = {
  runtime: 'edge',
};

// Prohibited by partners like DBS and Stripe.
const prohibitedCities = new Set([
  'crimea',
  'donetsk',
  'kherson',
  'luhansk',
  'zaporizhzhia',
]);

// This API exists as a standard API route because the Stripe npm module
// uses some Node.js APIs which are not available in Edge runtimes.
// So we separate out the checkout session generation functionality into
// two parts:
//  1. Part that requires next/server (available on middlewares and Edge runtime) like geolocation to get the user location and convert it into a currency (this file).
//  2. Part that requires Node.js APIs, the generation of the checkout session.
export default async function handler(req: NextRequest) {
  const url = new URL(req.url);
  const { origin, searchParams } = url;
  const supabaseAdmin = createSupabaseAdminClientGFE();

  const user = await fetchUser(req.cookies.get('supabase-auth-token')?.value);

  if (user == null) {
    return new Response(
      JSON.stringify({
        error: {
          message: 'Unauthorized request. Check that you are logged in.',
        },
        success: false,
      }),
      {
        headers: {
          'content-type': 'application/json',
        },
        status: 401,
      },
    );
  }

  const countryCode = req.geo?.country ?? 'US';

  try {
    if (isProhibitedCountry(countryCode)) {
      throw new Error(`Prohibited country: ${countryCode}`);
    }

    const city = req.geo?.city;

    if (city != null && prohibitedCities.has(city.toLowerCase())) {
      throw new Error(`Prohibited city: ${city}`);
    }

    const region = req.geo?.region;

    // We don't really know what region refers to, so we just check
    // against prohibited cities as well.
    if (region != null && prohibitedCities.has(region.toLowerCase())) {
      throw new Error(`Prohibited region: ${region}`);
    }

    const { data, error } = await supabaseAdmin
      .from('Profile')
      .select('stripeCustomer')
      .eq('id', user.id)
      .single();

    if (error != null) {
      throw new Error(error.message);
    }

    if (data == null) {
      throw new Error(`No user found for ${user.id}`);
    }

    let stripeCustomerId = data.stripeCustomer;

    // This happens when Supabase's webhooks don't fire during user signup
    // and there's no corresponding Stripe customer for the user.
    // We create a customer on the fly and update the `Profile` table.
    if (!stripeCustomerId) {
      console.info(`No Stripe customer found for ${user.id}, creating one`);

      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: '2022-11-15',
      });

      const customer = await stripe.customers.create({
        email: user.email,
      });

      stripeCustomerId = customer.id;

      await supabaseAdmin
        .from('Profile')
        .update({
          stripeCustomer: customer.id,
        })
        .eq('id', user.id);
    }

    const queryParams: QueryParams = {
      country_code: countryCode,
      plan_type: searchParams.get('plan_type') as PricingPlanType,
      stripe_customer_id: stripeCustomerId,
    };

    if (user.email != null) {
      queryParams.receipt_email = user.email;
    }

    // First Promoter tracking ID.
    const tid = req.cookies.get('_fprom_tid')?.value;

    if (tid != null) {
      queryParams.first_promoter_tid = tid;
    }

    const response = await fetch(
      `${origin}/api/payments/purchase/checkout_session_internal_and_called_on_server_only__?${new URLSearchParams(
        queryParams,
      )}`,
    );
    const payload = await response.json();

    return NextResponse.json(payload);
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        error: {
          message: err.message,
        },
        success: false,
      }),
      {
        headers: {
          'content-type': 'application/json',
        },
        status: 500,
      },
    );
  }
}
