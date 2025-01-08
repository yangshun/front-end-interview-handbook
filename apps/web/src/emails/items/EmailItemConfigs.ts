import { EmailsItemConfigCheckoutFirstTime } from './checkout/EmailsItemConfigCheckoutFirstTime';
import { EmailsItemConfigCheckoutMultipleTimes } from './checkout/EmailsItemConfigCheckoutMultipleTimes';
import { EmailsItemConfigInterviewsProgress } from './interviews-progress/EmailsItemConfigInterviewsProgress';
import { EmailsItemConfigPaymentFailed } from './payment-fail/EmailsItemConfigPaymentFailed';
import { EmailsItemConfigResetPassword } from './reset-password/EmailsItemConfigResetPassword';
import { EmailsItemConfigWelcomeSeriesAfter24Hours } from './welcome/EmailsItemConfigWelcomeSeriesAfter24Hours';
import { EmailsItemConfigWelcomeSeriesImmediate } from './welcome/EmailsItemConfigWelcomeSeriesImmediate';

export const EmailsItemConfigs = [
  EmailsItemConfigWelcomeSeriesImmediate,
  EmailsItemConfigWelcomeSeriesAfter24Hours,
  EmailsItemConfigInterviewsProgress,
  EmailsItemConfigCheckoutFirstTime,
  EmailsItemConfigCheckoutMultipleTimes,
  EmailsItemConfigPaymentFailed,
  EmailsItemConfigResetPassword,
] as const;
