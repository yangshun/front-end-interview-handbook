import type { EmailItemConfig } from '~/emails/EmailsTypes';

import EmailsTemplateSponsorsAdRequestSubmissionAdvertiser from './EmailsTemplateSponsorsAdRequestSubmissionAdvertiser';

export const EmailsItemConfigSponsorsAdRequestSubmissionAdvertiser: EmailItemConfig<
  typeof EmailsTemplateSponsorsAdRequestSubmissionAdvertiser
> = {
  component: EmailsTemplateSponsorsAdRequestSubmissionAdvertiser,
  defaultProps: {
    name: 'John',
    requestUrl: '/advertise-with-us/request',
  },
  from: {
    email: 'contact@greatfrontend.com',
    name: 'GreatFrontEnd',
  },
  id: 'SPONSORS_AD_REQUEST_SUBMISSION_ADVERTISER',
  subject: () => 'GreatFrontEnd: Your Ad Request Received!',
};
