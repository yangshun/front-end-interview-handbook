import type Stripe from 'stripe';

import type { InterviewsProfileSubscriptionPlan } from '../global/UserProfileProvider';
import {
  interviewsCustomerAddPlan,
  interviewsCustomerRemovePlan,
  interviewsDetermineSubscriptionPlan,
} from '../interviews/purchase/InterviewsStripeSyncUtils';
import {
  projectsCustomerAddPlan,
  projectsCustomerRemovePlan,
  projectsDetermineSubscriptionPlan,
} from '../projects/purchase/ProjectsStripeSyncUtils';

import type { ProjectsSubscriptionPlan } from '@prisma/client';

export async function purchaseCustomerAddPlan(
  customerId: Stripe.Customer | Stripe.DeletedCustomer | string,
  invoice: Stripe.Invoice,
) {
  const { price } = invoice.lines.data[0];

  if (price == null) {
    throw new Error('Price is not found');
  }

  const productId = price.product;

  switch (productId) {
    // TODO: Support interviews lifetime upgrade as well.
    case process.env.STRIPE_PRODUCT_ID_INTERVIEWS: {
      const planName: InterviewsProfileSubscriptionPlan =
        interviewsDetermineSubscriptionPlan(price);

      await interviewsCustomerAddPlan(customerId, planName);

      return { customerId, plan: planName, productDomain: 'interviews' };
    }
    case process.env.STRIPE_PRODUCT_ID_PROJECTS: {
      const planName: ProjectsSubscriptionPlan =
        projectsDetermineSubscriptionPlan(price);

      await projectsCustomerAddPlan(customerId, planName, invoice);

      return { customerId, plan: planName, productDomain: 'projects' };
    }
    default: {
      throw new Error(`Unknown product ${productId}`);
    }
  }
}

export async function purchaseCustomerRemovePlan(
  subscription: Stripe.Subscription,
) {
  const customerId = subscription.customer;
  const { price } = subscription.items.data[0];
  const productID = price.product;

  switch (productID) {
    case process.env.STRIPE_PRODUCT_ID_INTERVIEWS: {
      await interviewsCustomerRemovePlan(customerId);

      return {
        customerId,
        plan: interviewsDetermineSubscriptionPlan(price),
        productDomain: 'interviews',
      };
    }
    case process.env.STRIPE_PRODUCT_ID_PROJECTS: {
      await projectsCustomerRemovePlan(customerId);

      return {
        customerId,
        plan: projectsDetermineSubscriptionPlan(price),
        productDomain: 'projects',
      };
    }
    default: {
      throw new Error(`Unknown product ${productID}`);
    }
  }
}
