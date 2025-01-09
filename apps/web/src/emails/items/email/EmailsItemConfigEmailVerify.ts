import type { EmailItemConfig } from '~/emails/EmailsTypes';

import EmailsTemplateEmailVerify from './EmailsTemplateEmailVerify';

export const EmailsItemConfigEmailVerify: EmailItemConfig<
  typeof EmailsTemplateEmailVerify
> = {
  component: EmailsTemplateEmailVerify,
  defaultProps: {},
  from: {
    email: 'contact@greatfrontend.com',
    name: 'GreatFrontEnd',
  },
  id: 'EMAIL_VERIFY',
  subject: () => 'Verify your GreatFrontEnd account email address',
};
