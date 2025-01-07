import EmailsSendStatus from '~/emails/EmailsSendStatus';
import { scheduleEmailWithChecks } from '~/emails/qstash/EmailsQstashScheduler';
import RedisCounter from '~/redis/RedisCounter';

import { EmailsItemConfigCheckoutFirstTime } from './EmailsItemConfigCheckoutFirstTime';

const CHECKOUT_ATTEMPTS_TO_QUALIFY_FOR_DISCOUNT = 3;
const ONE_DAY_SECS = 24 * 60 * 60;
const THREE_MONTHS_IN_SECS = 3 * 30 * ONE_DAY_SECS;

export default async function scheduleCheckoutInitiateEmail({
  countryCode,
  userId,
}: Readonly<{
  countryCode: string | null;
  userId: string;
}>) {
  const checkoutRedisCounter = new RedisCounter(
    'INTERVIEWS_CHECKOUT_COUNT',
    userId,
  );

  const checkoutCount = await checkoutRedisCounter.incr();

  await checkoutRedisCounter.expire(THREE_MONTHS_IN_SECS);

  if (checkoutCount === 1) {
    await scheduleEmailWithChecks({
      countryCode,
      delayInSeconds: ONE_DAY_SECS,
      emailKey: 'INTERVIEWS_CHECKOUT_FIRST_TIME',
      userId,
    });
  }

  if (checkoutCount >= CHECKOUT_ATTEMPTS_TO_QUALIFY_FOR_DISCOUNT) {
    // We don't want to send out checkout first time email along
    // with the multiple checkout email. Just send the latter and
    // mark the first email as sent so that it doesn't get sent out.
    const sendStatusCheckoutFirstTime = new EmailsSendStatus(
      EmailsItemConfigCheckoutFirstTime.id,
      userId,
    );

    if (await sendStatusCheckoutFirstTime.isScheduled()) {
      await sendStatusCheckoutFirstTime.markAsSent();
    }

    await scheduleEmailWithChecks({
      countryCode,
      delayInSeconds: ONE_DAY_SECS,
      emailKey: 'INTERVIEWS_CHECKOUT_MULTIPLE_TIMES',
      userId,
    });
  }
}
