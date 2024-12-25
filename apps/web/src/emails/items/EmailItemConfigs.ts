import { EmailsItemConfigCheckoutFirstTime } from './checkout/EmailsItemConfigCheckoutFirstTime';
import { EmailsItemConfigCheckoutMultipleTimes } from './checkout/EmailsItemConfigCheckoutMultipleTimes';
import { EmailsItemConfigInterviewsProgress } from './interviews-progress/EmailsItemConfigInterviewsProgress';
import { EmailsItemConfigPaymentFailed } from './payment-fail/EmailsItemConfigPaymentFailed';
import { EmailsItemConfigWelcomeSeriesAfter24Hours } from './welcome/EmailsItemConfigWelcomeSeriesAfter24Hours';
import { EmailsItemConfigWelcomeSeriesImmediate } from './welcome/EmailsItemConfigWelcomeSeriesImmediate';

export const EmailItemConfigs = [
  EmailsItemConfigWelcomeSeriesImmediate,
  EmailsItemConfigWelcomeSeriesAfter24Hours,
  EmailsItemConfigInterviewsProgress,
  EmailsItemConfigCheckoutFirstTime,
  EmailsItemConfigCheckoutMultipleTimes,
  EmailsItemConfigPaymentFailed,
] as const;
