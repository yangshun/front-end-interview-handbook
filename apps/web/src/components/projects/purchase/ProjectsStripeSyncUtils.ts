import type Stripe from 'stripe';

import { createSupabaseAdminClientGFE_SERVER_ONLY } from '~/supabase/SupabaseServerGFE';

import type { ProjectsSubscriptionPlan } from '@prisma/client';

export function projectsDetermineSubscriptionPlan(
  price: Stripe.Price | null,
): ProjectsSubscriptionPlan {
  if (price == null) {
    throw new Error('Price is not found');
  }

  const { type, recurring } = price;

  if (type === 'recurring' && recurring != null) {
    const { interval, interval_count: intervalCount } = recurring;

    if (interval === 'year' && intervalCount === 1) {
      return 'ANNUAL';
    }

    if (interval === 'month' && intervalCount === 1) {
      return 'MONTH';
    }
  }

  throw new Error('Unable to determine plan');
}

export async function projectsCustomerAddPlan(
  customerId: Stripe.Customer | Stripe.DeletedCustomer | string,
  planName: ProjectsSubscriptionPlan,
) {
  const supabaseAdmin = createSupabaseAdminClientGFE_SERVER_ONLY();

  // TODO(projects): Try to merge into one query using joins.
  const { data: userProfile } = await supabaseAdmin
    .from('Profile')
    .select('id')
    .eq('stripeCustomer', customerId)
    .single();

  await supabaseAdmin
    .from('ProjectsProfile')
    .update({
      plan: planName,
      premium: true,
    })
    .eq('userId', userProfile?.id);
}

export async function projectsCustomerRemovePlan(
  customerId: Stripe.Customer | Stripe.DeletedCustomer | string,
) {
  const supabaseAdmin = createSupabaseAdminClientGFE_SERVER_ONLY();

  // TODO(projects): Try to merge into one query using joins.
  const { data: userProfile } = await supabaseAdmin
    .from('Profile')
    .select('id')
    .eq('stripeCustomer', customerId)
    .single();

  await supabaseAdmin
    .from('ProjectsProfile')
    .update({
      plan: null,
      premium: false,
    })
    .eq('userId', userProfile?.id);
}
