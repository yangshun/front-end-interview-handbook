import { buffer } from 'micro';
import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

import type { InterviewsProfileSubscriptionPlan } from '~/components/global/UserProfileProvider';
import {
  interviewsCustomerAddPlan,
  interviewsCustomerRemovePlan,
  interviewsDetermineSubscriptionPlan,
} from '~/components/interviews/purchase/InterviewsStripeSyncUtils';

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
      const invoice = event.data.object as Stripe.Invoice;
      const customerID = invoice.customer;

      if (customerID == null) {
        return res.send('Missing customerID');
      }

      const planName: InterviewsProfileSubscriptionPlan =
        interviewsDetermineSubscriptionPlan(invoice.lines.data[0].price);

      await interviewsCustomerAddPlan(customerID, planName);

      return res.send(`${planName} subscription added to ${customerID}`);
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      const customerID = subscription.customer;

      await interviewsCustomerRemovePlan(customerID);

      return res.send(`Subscription removed from ${customerID}`);
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const { last_payment_error: error, customer: customerID } = paymentIntent;

      if (error == null) {
        return res.send(`No payment error found for ${customerID}`);
      }

      const paymentMethod = error.payment_method;

      if (paymentMethod == null) {
        return res.send(`No payment method found for error for ${customerID}`);
      }

      const { name, email } = paymentMethod.billing_details;

      if (email == null) {
        return res.send(`No email found for error for ${customerID}`);
      }

      const result = await sendEmailPaymentFailed(email, name);

      return res.send(`Error email ${result.data?.id} sent for ${customerID}`);
    }

    default:
      return res.send(`Unhandled event ${event.type}`);
  }
}
