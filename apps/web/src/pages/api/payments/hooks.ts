import { buffer } from 'micro';
import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

import { interviewsDetermineSubscriptionPlan } from '~/components/interviews/purchase/InterviewsStripeSyncUtils';
import {
  purchaseCustomerAddPlan,
  purchaseCustomerRemovePlan,
} from '~/components/purchase/PurchaseStripeWebhookHandlers';

import sendPaymentFailedEmail from '~/emails/items/payment-fail/sendPaymentFailedEmail';
import { getErrorMessage } from '~/utils/getErrorMessage';

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
        message: getErrorMessage(error),
      },
      success: false,
    });
  }

  switch (event.type) {
    case 'invoice.paid': {
      const invoice = event.data.object;
      const customerId = invoice.customer;

      if (customerId == null) {
        return res.send('Missing customerId');
      }

      const { productDomain, plan } = await purchaseCustomerAddPlan(
        customerId,
        invoice,
      );

      return res.send(
        `[${productDomain}] ${plan} subscription added to ${customerId}`,
      );
    }

    case 'customer.subscription.deleted': {
      const { productDomain, plan, customerId } =
        await purchaseCustomerRemovePlan(event.data.object);

      return res.send(
        `[${productDomain}] ${plan} subscription removed from ${customerId}`,
      );
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

      await sendPaymentFailedEmail({
        email,
        name: name || 'there',
        userId: customerId as string,
      });

      return res.send(`Error email sent for ${customerId}`);
    }

    case 'checkout.session.completed': {
      const checkoutSession = event.data.object;
      const { customer: customerId } = checkoutSession;
      let { invoice } = checkoutSession;

      if (checkoutSession?.metadata?.ftl !== 'true') {
        return res.send(`${checkoutSession.id} not eligible for FTL`);
      }

      if (typeof invoice === 'string') {
        invoice = await stripe.invoices.retrieve(invoice);
      }

      if (invoice == null) {
        return res.send(`No invoice for ${checkoutSession.id}`);
      }

      const { price } = invoice.lines.data[0];

      if (price == null) {
        return res.send(`No price item for ${checkoutSession.id}`);
      }

      const productId = price.product;

      if (productId !== process.env.STRIPE_PRODUCT_ID_INTERVIEWS) {
        return res.send(`Only interviews product eligible`);
      }

      const plan = interviewsDetermineSubscriptionPlan(price);

      switch (plan) {
        case 'lifetime':
        case 'year': {
          const customerEmail =
            checkoutSession.customer_email ||
            checkoutSession.customer_details?.email;

          if (customerEmail == null) {
            return res.send(`No customer email for ${checkoutSession.id}`);
          }

          // Invite to FTL.
          const results = await fetch(
            `https://www.faangtechleads.com/api/invite?email=${customerEmail}`,
          );
          const data = await results.json();

          return res.json(data);
        }
        default: {
          return res.send(
            `${customerId} purchase of interviews ${plan} not eligible for FTL`,
          );
        }
      }
    }

    default:
      return res.send(`Unhandled event ${event.type}`);
  }
}
