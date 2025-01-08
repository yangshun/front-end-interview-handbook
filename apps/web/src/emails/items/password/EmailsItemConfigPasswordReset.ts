import type { EmailItemConfig } from '~/emails/EmailsTypes';

import EmailsTemplatePasswordReset from './EmailsTemplatePasswordReset';

export const EmailsItemConfigPasswordReset: EmailItemConfig<
  typeof EmailsTemplatePasswordReset
> = {
  component: EmailsTemplatePasswordReset,
  defaultProps: {},
  from: {
    email: 'contact@greatfrontend.com',
    name: 'GreatFrontEnd',
  },
  id: 'PASSWORD_RESET',
  subject: () => '[GreatFrontEnd] Reset Your Password',
};
