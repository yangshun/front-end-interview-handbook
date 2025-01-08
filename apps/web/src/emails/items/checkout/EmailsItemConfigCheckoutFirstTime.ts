import type { EmailItemConfig } from '~/emails/EmailsTypes';

import EmailsTemplateCheckoutFirstTime from './EmailsTemplateCheckoutFirstTime';

export const EmailsItemConfigCheckoutFirstTime: EmailItemConfig<
  typeof EmailsTemplateCheckoutFirstTime
> = {
  component: EmailsTemplateCheckoutFirstTime,
  defaultProps: {
    countryCode: 'US',
    hook: 0,
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
    name
      ? `${name.split(/\s+/)[0]}, just wanted to reach out and say hello`
      : 'Just wanted to reach out and say hello',
};
