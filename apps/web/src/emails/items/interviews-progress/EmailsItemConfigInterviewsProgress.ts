import type { EmailItemConfig } from '~/emails/EmailsTypes';

import EmailsTemplateInterviewsProgress from './EmailsTemplateInterviewsProgress';

export const EmailsItemConfigInterviewsProgress: EmailItemConfig<
  typeof EmailsTemplateInterviewsProgress
> = {
  component: EmailsTemplateInterviewsProgress,
  contactListKey: 'PROMOTIONS',
  defaultProps: {},
  from: {
    email: 'team@greatfrontend.com',
    name: 'GreatFrontEnd',
  },
  id: 'INTERVIEWS_PROGRESS',
  subject: () => "Don't miss out: Up to 100% off premium",
};
