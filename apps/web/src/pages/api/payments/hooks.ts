import { buffer } from 'micro';
import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

import type { UserProfilePlan } from '~/components/global/UserProfileProvider';

import { createSupabaseAdminClientGFE } from '~/supabase/SupabaseServerGFE';

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
    apiVersion: '2022-11-15',
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

  const supabaseAdmin = createSupabaseAdminClientGFE();

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

    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer;

      switch (subscription.status) {
        case 'active': {
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

          return res.send(`${planName} subscription added to ${customerId}`);
        }

        case 'past_due': {
          await stripe.subscriptions.del(subscription.id);

          return res.send(
            `Subscription ${subscription.id} by ${customerId} cancelled because it's ${subscription.status}`,
          );
        }

        default: {
          return res.send(
            `Nothing done to subscription by ${customerId} with subscription status is ${subscription.status}`,
          );
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

    default:
      return res.send(`Unhandled event ${event.type}`);
  }
}
