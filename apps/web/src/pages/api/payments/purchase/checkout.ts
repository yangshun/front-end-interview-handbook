import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { isProhibitedCountry } from '~/lib/stripeUtils';

import type {
  PricingPlansLocalized,
  PricingPlanType,
} from '~/data/PricingPlans';

import logMessage from '~/logging/logMessage';
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
    logMessage({
      level: 'error',
      message: `Attempted to checkout while not logged in`,
    });

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
    logMessage({
      level: 'info',
      message: `User attempting to checkout`,
      userIdentifier: user.email,
    });

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

    if (data.stripeCustomer == null) {
      throw new Error(`No Stripe customer found for ${user.id}`);
    }

    const stripeCustomerId = data.stripeCustomer;
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
    const payload = (await response.json()) as PricingPlansLocalized;

    return NextResponse.json(payload);
  } catch (err: any) {
    logMessage({
      level: 'error',
      message: `Error generating checkout session for ${countryCode}`,
      userIdentifier: user.id,
    });

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
