import { scheduleEmailWithChecks } from '~/emails/qstash/EmailsQstashScheduler';
import RedisCounter from '~/redis/RedisCounter';

const CHECKOUT_ATTEMPTS_TO_QUALIFY_FOR_DISCOUNT = 3;
const ONE_DAY_SECS = 24 * 60 * 60;
const SIX_MONTHS_IN_SECS = 6 * 30 * ONE_DAY_SECS;

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
      delayInSeconds: ONE_DAY_SECS,
      email,
      emailKey: 'INTERVIEWS_CHECKOUT_FIRST_TIME',
      name,
      userId,
    });
  } else if (checkoutCount === CHECKOUT_ATTEMPTS_TO_QUALIFY_FOR_DISCOUNT) {
    await scheduleEmailWithChecks({
      countryCode,
      delayInSeconds: ONE_DAY_SECS,
      email,
      emailKey: 'INTERVIEWS_CHECKOUT_MULTIPLE_TIMES',
      name,
      userId,
    });
  }
}
