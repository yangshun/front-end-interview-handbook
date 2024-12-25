import type { EmailItemConfig } from '~/emails/EmailsTypes';

import EmailsTemplateWelcomeSeriesImmediate from './EmailsTemplateWelcomeSeriesImmediate';

export const EmailsItemConfigWelcomeSeriesImmediate: EmailItemConfig<
  typeof EmailsTemplateWelcomeSeriesImmediate
> = {
  component: EmailsTemplateWelcomeSeriesImmediate,
  defaultProps: {},
  from: {
    email: 'hello@greatfrontend.com',
    name: 'GreatFrontEnd',
  },
  id: 'INTERVIEWS_WELCOME_EMAIL_IMMEDIATE',
  subject: () =>
    '🚀 Start Here: Your Simple, Proven Roadmap to Front End Interview Success',
};
