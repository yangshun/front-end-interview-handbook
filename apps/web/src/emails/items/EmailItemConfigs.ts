import { EmailsItemConfigAuthEmailVerify } from './auth-email-verify/EmailsItemConfigAuthEmailVerify';
import { EmailsItemConfigAuthPasswordReset } from './auth-password-reset/EmailsItemConfigAuthPasswordReset';
import { EmailsItemConfigCheckoutFirstTime } from './checkout/EmailsItemConfigCheckoutFirstTime';
import { EmailsItemConfigCheckoutMultipleTimes } from './checkout/EmailsItemConfigCheckoutMultipleTimes';
import { EmailsItemConfigInterviewsProgress } from './interviews-progress/EmailsItemConfigInterviewsProgress';
import { EmailsItemConfigPaymentFailed } from './payment-fail/EmailsItemConfigPaymentFailed';
import { EmailsItemConfigSponsorsAdRequestConfirmation } from './sponsors/EmailsItemConfigSponsorsAdRequestConfirmation';
import { EmailsItemConfigSponsorsAdRequestReview } from './sponsors/EmailsItemConfigSponsorsAdRequestReview';
import { EmailsItemConfigWelcomeSeriesAfter24Hours } from './welcome/EmailsItemConfigWelcomeSeriesAfter24Hours';
import { EmailsItemConfigWelcomeSeriesImmediate } from './welcome/EmailsItemConfigWelcomeSeriesImmediate';

export const EmailsItemConfigs = [
  EmailsItemConfigWelcomeSeriesImmediate,
  EmailsItemConfigWelcomeSeriesAfter24Hours,
  EmailsItemConfigInterviewsProgress,
  EmailsItemConfigCheckoutFirstTime,
  EmailsItemConfigCheckoutMultipleTimes,
  EmailsItemConfigPaymentFailed,
  EmailsItemConfigAuthPasswordReset,
  EmailsItemConfigAuthEmailVerify,
  EmailsItemConfigSponsorsAdRequestConfirmation,
  EmailsItemConfigSponsorsAdRequestReview,
] as const;

export const EmailsItemSponsorsConfig = [
  EmailsItemConfigSponsorsAdRequestConfirmation,
  EmailsItemConfigSponsorsAdRequestReview,
] as const;
