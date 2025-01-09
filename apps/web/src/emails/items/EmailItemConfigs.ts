import { EmailsItemConfigCheckoutFirstTime } from './checkout/EmailsItemConfigCheckoutFirstTime';
import { EmailsItemConfigCheckoutMultipleTimes } from './checkout/EmailsItemConfigCheckoutMultipleTimes';
import { EmailsItemConfigEmailVerify } from './email/EmailsItemConfigEmailVerify';
import { EmailsItemConfigInterviewsProgress } from './interviews-progress/EmailsItemConfigInterviewsProgress';
import { EmailsItemConfigPasswordReset } from './password/EmailsItemConfigPasswordReset';
import { EmailsItemConfigPaymentFailed } from './payment-fail/EmailsItemConfigPaymentFailed';
import { EmailsItemConfigWelcomeSeriesAfter24Hours } from './welcome/EmailsItemConfigWelcomeSeriesAfter24Hours';
import { EmailsItemConfigWelcomeSeriesImmediate } from './welcome/EmailsItemConfigWelcomeSeriesImmediate';

export const EmailsItemConfigs = [
  EmailsItemConfigWelcomeSeriesImmediate,
  EmailsItemConfigWelcomeSeriesAfter24Hours,
  EmailsItemConfigInterviewsProgress,
  EmailsItemConfigCheckoutFirstTime,
  EmailsItemConfigCheckoutMultipleTimes,
  EmailsItemConfigPaymentFailed,
  EmailsItemConfigPasswordReset,
  EmailsItemConfigEmailVerify,
] as const;
