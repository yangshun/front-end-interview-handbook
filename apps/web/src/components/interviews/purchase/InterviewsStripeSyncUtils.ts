import type Stripe from 'stripe';

import type { InterviewsProfileSubscriptionPlan } from '~/components/global/UserProfileProvider';

import prisma from '~/server/prisma';

export function interviewsDetermineSubscriptionPlan(
  price: Stripe.Price | null,
): InterviewsProfileSubscriptionPlan {
  if (price == null) {
    throw new Error('Price is not found');
  }

  const { recurring, type } = price;

  if (type === 'one_time') {
    return 'lifetime';
  }

  if (type === 'recurring' && recurring != null) {
    const { interval, interval_count: intervalCount } = recurring;

    if (interval === 'year' && intervalCount === 1) {
      return 'year';
    }

    if (interval === 'month' && intervalCount === 3) {
      return 'quarter';
    }

    if (interval === 'month' && intervalCount === 1) {
      return 'month';
    }
  }

  throw new Error('Unable to determine plan');
}

export async function interviewsCustomerAddPlan(
  customerId: Stripe.Customer | Stripe.DeletedCustomer | string,
  planName: InterviewsProfileSubscriptionPlan,
) {
  await prisma.profile.updateMany({
    data: {
      plan: planName,
      premium: true,
    },
    where: {
      OR: [
        { stripeCustomer: customerId.toString() },
        // { tazapayCustomer: customerId.toString() }, // TODO: check for tazapay customer ID
      ],
    },
  });
}

export async function interviewsCustomerRemovePlan(
  customerId: Stripe.Customer | Stripe.DeletedCustomer | string,
) {
  await prisma.profile.updateMany({
    data: {
      plan: null,
      premium: false,
    },
    where: {
      stripeCustomer: customerId.toString(),
    },
  });
}
