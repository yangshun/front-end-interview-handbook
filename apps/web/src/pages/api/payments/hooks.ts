import { buffer } from 'micro';
import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

import type { UserProfilePlan } from '~/components/global/UserProfileProvider';

import { sendEmailPaymentFailed } from '~/emails/EmailSender';
import { createSupabaseAdminClientGFE_SERVER_ONLY } from '~/supabase/SupabaseServerGFE';

export const config = { api: { bodyParser: false } };

// This API is called by Stripe whenever checkout/subscription events
// occur in Stripe.
// WARNING: Do not change this file name/path without changing
// the webhook URL in Stripe!
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2023-10-16',
  });
  const signature = req.headers['stripe-signature'] as string;
  const signingSecret = process.env.STRIPE_SIGNING_SECRET as string;
  const reqBuffer = await buffer(req);

  let event: Stripe.Event | null = null;

  try {
    event = stripe.webhooks.constructEvent(reqBuffer, signature, signingSecret);
  } catch (error) {
    return res.status(400).send({
      error: {
        message: (error as Error).message as string,
      },
      success: false,
    });
  }

  const supabaseAdmin = createSupabaseAdminClientGFE_SERVER_ONLY();

  async function fulfillLifetimeOrder(
    checkoutSession: Stripe.Checkout.Session,
  ) {
    const customerId = checkoutSession.customer;
    const items = await stripe.checkout.sessions.listLineItems(
      checkoutSession.id,
    );

    const { price } = items.data[0];

    if (price == null) {
      return res.send('Unknown checkout');
    }

    if (customerId == null) {
      return res.send('Missing customerId');
    }

    if (price.type !== 'one_time') {
      return res.send(
        `Checkout is not for a one-time subscription, handled in subscription update event instead`,
      );
    }

    await supabaseAdmin
      .from('Profile')
      .update({
        plan: 'lifetime',
        premium: true,
      })
      .eq('stripeCustomer', customerId);

    return res.send(`Lifetime subscription added to ${customerId}`);
  }

  async function fulfillSubscriptionOrder(
    subscription: Stripe.Subscription,
  ): Promise<UserProfilePlan> {
    const customerId = subscription.customer;

    const planName: UserProfilePlan = (() => {
      const { interval, interval_count: intervalCount } =
        subscription.items.data[0].plan;

      if (interval === 'year' && intervalCount === 1) {
        return 'year';
      }

      if (interval === 'month' && intervalCount === 3) {
        return 'quarter';
      }

      // Default is monthly.
      return 'month';
    })();

    await supabaseAdmin
      .from('Profile')
      .update({
        plan: planName,
        premium: true,
      })
      .eq('stripeCustomer', customerId);

    return planName;
  }

  switch (event.type) {
    // Some payment methods like PayNow are async despite the
    // Stripe dashboard not mentioning that.
    case 'checkout.session.async_payment_succeeded': {
      const checkoutSession = event.data.object as Stripe.Checkout.Session;

      return await fulfillLifetimeOrder(checkoutSession);
    }

    case 'checkout.session.completed': {
      const checkoutSession = event.data.object as Stripe.Checkout.Session;

      if (checkoutSession.payment_status === 'unpaid') {
        return res.send(
          `Payment is delayed for ${checkoutSession.id}, not fulfilling order yet`,
        );
      }

      return await fulfillLifetimeOrder(checkoutSession);
    }

    // Zero-amount subscriptions (e.g. giveaways) have an `active` subscription created.
    case 'customer.subscription.created': {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer;

      switch (subscription.status) {
        case 'active': {
          const planName = await fulfillSubscriptionOrder(subscription);

          return res.send(`${planName} subscription added to ${customerId}`);
        }

        default: {
          return res.send(`Nothing done to subscription`);
        }
      }
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer;

      switch (subscription.status) {
        case 'active': {
          const planName = await fulfillSubscriptionOrder(subscription);

          return res.send(`${planName} subscription added to ${customerId}`);
        }

        case 'past_due': {
          await stripe.subscriptions.cancel(subscription.id);

          return res.send(`Subscription cancelled`);
        }

        default: {
          return res.send(`Nothing done to subscription`);
        }
      }
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer;

      await supabaseAdmin
        .from('Profile')
        .update({
          plan: null,
          premium: false,
        })
        .eq('stripeCustomer', customerId);

      return res.send(`Subscription removed from ${customerId}`);
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const { last_payment_error: error, customer: customerId } = paymentIntent;

      if (error == null) {
        return res.send(`No payment error found for ${customerId}`);
      }

      const paymentMethod = error.payment_method;

      if (paymentMethod == null) {
        return res.send(`No payment method found for error for ${customerId}`);
      }

      const { name, email } = paymentMethod.billing_details;

      if (email == null) {
        return res.send(`No email found for error for ${customerId}`);
      }

      const result = await sendEmailPaymentFailed(email, name);

      return res.send(`Error email ${result.data?.id} sent for ${customerId}`);
    }

    default:
      return res.send(`Unhandled event ${event.type}`);
  }
}
