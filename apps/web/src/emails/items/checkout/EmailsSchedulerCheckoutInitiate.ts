import { scheduleEmailWithChecks } from '~/emails/qstash/EmailsQstashScheduler';
import RedisCounter from '~/redis/RedisCounter';

const CHECKOUT_ATTEMPTS_TO_QUALIFY_FOR_DISCOUNT = 3;
const SIX_MONTHS_IN_SECS = 6 * 30 * 24 * 3600;
const SCHEDULE_DELAY_HOURS = 24;

export default async function scheduleCheckoutInitiateEmail({
  countryCode,
  name,
  email,
  userId,
}: Readonly<{
  countryCode: string | null;
  email: string;
  name: string | null;
  userId: string;
}>) {
  const checkoutRedisCounter = new RedisCounter(
    'INTERVIEWS_CHECKOUT_COUNT',
    userId,
  );

  const checkoutCount = await checkoutRedisCounter.incr();

  if (checkoutCount === 1) {
    await checkoutRedisCounter.expire(SIX_MONTHS_IN_SECS);
    await scheduleEmailWithChecks({
      countryCode,
      delayInHours: SCHEDULE_DELAY_HOURS,
      email,
      emailKey: 'INTERVIEWS_CHECKOUT_FIRST_TIME',
      name,
      userId,
    });
  } else if (checkoutCount === CHECKOUT_ATTEMPTS_TO_QUALIFY_FOR_DISCOUNT) {
    await scheduleEmailWithChecks({
      countryCode,
      delayInHours: SCHEDULE_DELAY_HOURS,
      email,
      emailKey: 'INTERVIEWS_CHECKOUT_MULTIPLE_TIMES',
      name,
      userId,
    });
  }
}
