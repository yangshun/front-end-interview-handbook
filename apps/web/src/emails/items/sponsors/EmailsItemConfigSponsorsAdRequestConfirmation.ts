import type { EmailItemConfig } from '~/emails/EmailsTypes';

import EmailsTemplateSponsorsAdRequestConfirmation from './EmailsTemplateSponsorsAdRequestConfirmation';

export const EmailsItemConfigSponsorsAdRequestConfirmation: EmailItemConfig<
  typeof EmailsTemplateSponsorsAdRequestConfirmation
> = {
  component: EmailsTemplateSponsorsAdRequestConfirmation,
  defaultProps: {
    name: 'John',
    requestUrl: '/advertise-with-us/request',
  },
  from: {
    email: 'hello@greatfrontend.com',
    name: 'GreatFrontEnd Sponsorships',
  },
  id: 'SPONSORS_AD_REQUEST_CONFIRMATION',
  subject: () => 'GreatFrontEnd: Your Ad Request Received!',
};
