import type Stripe from 'stripe';

import prisma from '~/server/prisma';

import { projectsPaidPlanFeatures } from './ProjectsPricingFeaturesConfig';

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
  invoice: Stripe.Invoice,
) {
  const userProfile = await prisma.profile.findFirstOrThrow({
    include: {
      projectsProfile: true,
    },
    where: {
      stripeCustomer: customerId.toString(),
    },
  });

  const features = projectsPaidPlanFeatures[planName];
  const creditsForPlan =
    features.credits === 'unlimited' ? 100 : features.credits ?? 0;
  const creditsAtStartOfCycle =
    (userProfile.projectsProfile?.credits ?? 0) + creditsForPlan;

  // Create projects profile if it doesn't exist
  const projectsProfile = await prisma.projectsProfile.upsert({
    create: {
      creditsAtStartOfCycle,
      plan: planName,
      premium: true,
      userId: userProfile.id,
    },
    update: {
      creditsAtStartOfCycle,
      plan: planName,
      premium: true,
    },
    where: {
      id: userProfile.projectsProfile?.id,
    },
  });

  await prisma.projectsChallengeCreditTransaction.create({
    data: {
      amount: creditsForPlan,
      profileId: projectsProfile.id,
      stripeInvoiceId: invoice.id,
      type: 'CREDIT',
    },
  });
}

export async function projectsCustomerRemovePlan(
  customerId: Stripe.Customer | Stripe.DeletedCustomer | string,
) {
  await prisma.projectsProfile.updateMany({
    data: {
      plan: null,
      premium: false,
    },
    where: {
      userProfile: {
        stripeCustomer: customerId.toString(),
      },
    },
  });
}
