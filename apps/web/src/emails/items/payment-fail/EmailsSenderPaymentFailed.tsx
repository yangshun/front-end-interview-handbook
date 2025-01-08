import Stripe from 'stripe';

import { sendEmailItemWithChecks } from '~/emails/mailjet/EmailsMailjetUtils';
import { getSiteOrigin } from '~/seo/siteUrl';
import prisma from '~/server/prisma';

import { EmailsItemConfigPaymentFailed } from './EmailsItemConfigPaymentFailed';

const THIRTY_DAYS_IN_SECS = 30 * 24 * 3600;

type Product = 'interviews' | 'projects';

function productHrefs(product: Product) {
  switch (product) {
    case 'interviews': {
      return {
        pricingPageUrl: new URL(
          '/interviews/pricing',
          getSiteOrigin(),
        ).toString(),
      };
    }
    case 'projects': {
      return {
        pricingPageUrl: new URL(
          '/projects/pricing',
          getSiteOrigin(),
        ).toString(),
      };
    }
  }
}

export default async function sendPaymentFailedEmail({
  name,
  email,
  userId,
  product,
}: Readonly<{
  email: string;
  name: string | null;
  product: 'interviews' | 'projects';
  userId: string;
}>) {
  const { pricingPageUrl } = productHrefs(product);

  const { stripeCustomer: stripeCustomerId } =
    await prisma.profile.findFirstOrThrow({
      select: {
        stripeCustomer: true,
      },
      where: {
        id: userId,
      },
    });

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2023-10-16',
  });
  const session = await stripe.billingPortal.sessions.create({
    customer: stripeCustomerId!,
    return_url: pricingPageUrl,
  });

  return await sendEmailItemWithChecks(
    {
      email,
      name,
    },
    {
      emailItemConfig: {
        config: EmailsItemConfigPaymentFailed,
        props: {
          billingPortalUrl: session.url,
          name,
          pricingPageUrl,
        },
      },
      redis: {
        opts: {
          ex: THIRTY_DAYS_IN_SECS,
        },
      },
      userId,
    },
  );
}
