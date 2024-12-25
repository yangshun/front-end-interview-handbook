import type { EmailItemConfig } from '~/emails/EmailsTypes';

import EmailsTemplateWelcomeSeriesAfter24Hours from './EmailsTemplateWelcomeSeriesAfter24Hours';

export const EmailsItemConfigWelcomeSeriesAfter24Hours: EmailItemConfig<
  typeof EmailsTemplateWelcomeSeriesAfter24Hours
> = {
  component: EmailsTemplateWelcomeSeriesAfter24Hours,
  defaultProps: {},
  from: {
    email: 'hello@greatfrontend.com',
    name: 'GreatFrontEnd',
  },
  id: 'INTERVIEWS_WELCOME_EMAIL_24_HOURS',
  subject: () =>
    '✨ Actual prep strategies by real users to clinch multiple Front End offers',
};
