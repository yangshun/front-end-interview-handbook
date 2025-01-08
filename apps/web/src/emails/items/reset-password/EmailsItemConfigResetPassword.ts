import type { EmailItemConfig } from '~/emails/EmailsTypes';

import EmailsTemplateResetPassword from './EmailsTemplateResetPassword';

export const EmailsItemConfigResetPassword: EmailItemConfig<
  typeof EmailsTemplateResetPassword
> = {
  component: EmailsTemplateResetPassword,
  defaultProps: {},
  from: {
    email: 'contact@greatfrontend.com',
    name: 'GreatFrontEnd',
  },
  id: 'RESET_PASSWORD',
  subject: () => 'Reset Your Password',
};
