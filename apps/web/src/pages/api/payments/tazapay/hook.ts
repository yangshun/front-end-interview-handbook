import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'node:crypto';
import url from 'node:url';
import getRawBody from 'raw-body';

import { interviewsCustomerAddPlan } from '~/components/interviews/purchase/InterviewsStripeSyncUtils';

import sendPaymentFailedEmail from '~/emails/items/payment-fail/EmailsSenderPaymentFailed';
import prisma from '~/server/prisma';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Need to define the type ourself because Tazapay SDK is not working and there is no other way
type TazapayWebhookEvent = Readonly<{
  created_at: string;
  data: {
    customer?: string;
    customer_details: {
      email: string;
      name: string;
    };
    metadata?: {
      ftl?: string;
    };
  };
  id: string;
  type: 'checkout.paid' | 'payment_attempt.failed';
}>;

// This API is called by Tazapay whenever checkout/subscription events
// occur in Tazapay.
// WARNING: Do not change this file name/path without changing
// the webhook URL in Tazapay!
// Also, this webhook currently only handles Interviews product for lifetime plan
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const rawBody = await getRawBody(req);
  const jsonString = rawBody.toString('utf8');
  const event = JSON.parse(jsonString) as TazapayWebhookEvent;
  const { signature } = req.headers;
  const signingSecret = process.env.TAZAPAY_SIGNING_SECRET as string;

  const message = event.id + jsonString + event.created_at;

  const constructedSignature = crypto
    .createHmac('sha256', signingSecret)
    .update(message)
    .digest('base64');

  if (signature !== constructedSignature) {
    return res.status(401).send({
      error: {
        message: 'Unauthorized',
      },
      success: false,
    });
  }

  const customerId = event.data.customer;

  switch (event.type) {
    case 'checkout.paid': {
      const { customer_details, metadata } = event.data;

      if (customerId == null) {
        return res.send('Missing customerId');
      }

      await interviewsCustomerAddPlan(customerId, 'lifetime');

      if (metadata?.ftl === 'true') {
        // Invite to FTL
        await fetch(
          url.format({
            hostname: 'faangtechleads.com',
            pathname: '/api/invite',
            protocol: 'https',
            query: { email: customer_details.email },
          }),
        );
      }

      return res.send(
        `Interviews lifetime subscription added to ${customerId}`,
      );
    }
    case 'payment_attempt.failed': {
      const { customer_details } = event.data;

      if (customerId == null) {
        return res.send('Missing customerId');
      }

      const userProfile = await prisma.profile.findFirstOrThrow({
        where: {
          tazapayCustomerId: customerId.toString(),
        },
      });

      await sendPaymentFailedEmail({
        email: customer_details.email,
        name: customer_details.name,
        product: 'interviews',
        userId: userProfile.id,
      });

      return res.send(`Error email sent for ${customerId}`);
    }

    default:
      return res.send(`Unhandled event ${event.type}`);
  }
}
