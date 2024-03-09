import { buffer } from 'micro';
import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

import {
  purchaseCustomerAddPlan,
  purchaseCustomerRemovePlan,
} from '~/components/purchase/PurchaseStripeWebhookHandlers';

import { sendEmailPaymentFailed } from '~/emails/EmailSender';
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
        invoice.lines.data[0].price,
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

      const result = await sendEmailPaymentFailed(email, name);

      return res.send(`Error email ${result.data?.id} sent for ${customerId}`);
    }

    default:
      return res.send(`Unhandled event ${event.type}`);
  }
}
