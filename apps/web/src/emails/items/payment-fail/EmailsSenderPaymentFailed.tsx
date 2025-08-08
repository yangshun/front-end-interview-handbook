import { sendEmailItemWithChecks } from '~/emails/mailjet/EmailsMailjetUtils';
import { getSiteOrigin } from '~/seo/siteUrl';

import { EmailsItemConfigPaymentFailed } from './EmailsItemConfigPaymentFailed';

const THIRTY_DAYS_IN_SECS = 30 * 24 * 3600;

type Product = 'interviews' | 'projects';

export function productHrefs(product: Product) {
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
  billingPortalUrl,
  email,
  name,
  product,
  userId,
}: Readonly<{
  billingPortalUrl?: string;
  email: string;
  name: string | null;
  product: 'interviews' | 'projects';
  userId: string;
}>) {
  const { pricingPageUrl } = productHrefs(product);

  return await sendEmailItemWithChecks(
    {
      email,
      name,
    },
    {
      emailItemConfig: {
        config: EmailsItemConfigPaymentFailed,
        props: {
          billingPortalUrl,
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
