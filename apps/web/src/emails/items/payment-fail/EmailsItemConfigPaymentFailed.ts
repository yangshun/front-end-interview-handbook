import type { EmailItemConfig } from '~/emails/EmailsTypes';

import EmailsTemplatePaymentFailed from './EmailsTemplatePaymentFailed';

export const EmailsItemConfigPaymentFailed: EmailItemConfig<
  typeof EmailsTemplatePaymentFailed
> = {
  component: EmailsTemplatePaymentFailed,
  defaultProps: {
    billingPortalUrl: 'https://stripe.com',
    name: 'John Doe',
    pricingPageUrl: 'https://greatfrontend.com/interviews/pricing',
  },
  from: {
    email: 'contact@greatfrontend.com',
    name: 'GreatFrontEnd',
  },
  id: 'PAYMENT_FAILED',
  subject: () => "Your payment has failed, here's how you can fix it",
};
