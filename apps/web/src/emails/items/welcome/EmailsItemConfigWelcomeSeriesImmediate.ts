import type { EmailItemConfig } from '~/emails/EmailsTypes';

import EmailsTemplateWelcomeSeriesImmediate from './EmailsTemplateWelcomeSeriesImmediate';

export const EmailsItemConfigWelcomeSeriesImmediate: EmailItemConfig<
  typeof EmailsTemplateWelcomeSeriesImmediate
> = {
  component: EmailsTemplateWelcomeSeriesImmediate,
  contactListKey: 'INTERVIEWS_TIPS',
  defaultProps: {},
  from: {
    email: 'team@greatfrontend.com',
    name: 'GreatFrontEnd',
  },
  id: 'INTERVIEWS_WELCOME_EMAIL_IMMEDIATE',
  subject: () =>
    '🚀 Start Here: Your Simple, Proven Roadmap to Front End Interview Success',
};
