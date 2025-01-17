import type { EmailItemConfig } from '~/emails/EmailsTypes';

import EmailsTemplateCheckoutMultipleTimes from './EmailsTemplateCheckoutMultipleTimes';

export const EmailsItemConfigCheckoutMultipleTimes: EmailItemConfig<
  typeof EmailsTemplateCheckoutMultipleTimes
> = {
  component: EmailsTemplateCheckoutMultipleTimes,
  contactListKey: 'PROMOTIONS',
  defaultProps: {
    coupon: {
      code: '8FGTYIAV',
      expiryDays: 2,
      percentOff: 25,
    },
    name: 'John',
  },
  from: {
    email: 'team@greatfrontend.com',
    name: 'GreatFrontEnd',
  },
  id: 'INTERVIEWS_CHECKOUT_MULTIPLE_TIMES',
  subject: ({ coupon }) =>
    `Act fast: ${coupon.percentOff}% off reserved just for you, ends in ${coupon.expiryDays * 24} hours!`,
};
