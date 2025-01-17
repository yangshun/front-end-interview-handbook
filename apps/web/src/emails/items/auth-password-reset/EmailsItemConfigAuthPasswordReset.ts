import type { EmailItemConfig } from '~/emails/EmailsTypes';

import EmailsTemplateAuthPasswordReset from './EmailsTemplateAuthPasswordReset';

export const EmailsItemConfigAuthPasswordReset: EmailItemConfig<
  typeof EmailsTemplateAuthPasswordReset
> = {
  component: EmailsTemplateAuthPasswordReset,
  defaultProps: {},
  from: {
    email: 'contact@greatfrontend.com',
    name: 'GreatFrontEnd',
  },
  id: 'AUTH_PASSWORD_RESET',
  subject: () => '[GreatFrontEnd] Reset your password',
};
