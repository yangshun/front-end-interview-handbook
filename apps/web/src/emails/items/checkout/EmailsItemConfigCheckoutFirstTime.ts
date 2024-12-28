import type { EmailItemConfig } from '~/emails/EmailsTypes';

import EmailsTemplateCheckoutFirstTime from './EmailsTemplateCheckoutFirstTime';

export const EmailsItemConfigCheckoutFirstTime: EmailItemConfig<
  typeof EmailsTemplateCheckoutFirstTime
> = {
  component: EmailsTemplateCheckoutFirstTime,
  contactListKey: 'MARKETING',
  defaultProps: {
    countryCode: 'US',
    name: 'John',
  },
  from: {
    email: 'yangshun@greatfrontend.com',
    name: 'Yangshun from GreatFrontEnd',
  },
  id: 'INTERVIEWS_CHECKOUT_FIRST_TIME',
  replyTo: {
    email: 'yangshun@greatfrontend.com',
    name: 'Yangshun Tay',
  },
  subject: ({ name }) =>
    `Hi ${name ?? 'there'}, this is Yangshun from GreatFrontEnd`,
};
