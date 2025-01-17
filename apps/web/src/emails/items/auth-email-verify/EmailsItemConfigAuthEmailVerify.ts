import type { EmailItemConfig } from '~/emails/EmailsTypes';

import EmailsTemplateAuthEmailVerify from './EmailsTemplateAuthEmailVerify';

export const EmailsItemConfigAuthEmailVerify: EmailItemConfig<
  typeof EmailsTemplateAuthEmailVerify
> = {
  component: EmailsTemplateAuthEmailVerify,
  defaultProps: {},
  from: {
    email: 'contact@greatfrontend.com',
    name: 'GreatFrontEnd',
  },
  id: 'AUTH_EMAIL_VERIFY',
  subject: () => 'Verify your email address',
};
