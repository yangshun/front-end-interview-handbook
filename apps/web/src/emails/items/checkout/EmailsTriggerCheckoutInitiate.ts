import { scheduleEmailWithChecks } from '~/emails/qstash/EmailsQstashScheduler';
import RedisCounter from '~/redis/RedisCounter';

const CHECKOUT_ATTEMPTS_TO_TRIGGER_DISCOUNT = 3;
const EXPIRY_IN_MONTHS = 6;
const SCHEDULE_DELAY_HOURS = 24;

function sixMonthsFromToday() {
  const today = new Date();
  const sixMonthsLater = new Date();

  sixMonthsLater.setMonth(today.getMonth() + EXPIRY_IN_MONTHS);

  const timeDifference = sixMonthsLater.getTime() - today.getTime();
  const secondsDifference = timeDifference / 1000;

  return Math.round(secondsDifference);
}

export default async function triggerInitiateCheckoutEmail({
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
  const sixMonthsInSec = sixMonthsFromToday();
  const checkoutRedisCounter = new RedisCounter(
    'INTERVIEWS_CHECKOUT_COUNT',
    userId,
  );

  const checkoutCount = await checkoutRedisCounter.incr();

  if (checkoutCount === 1) {
    await checkoutRedisCounter.expire(sixMonthsInSec);
    await scheduleEmailWithChecks({
      countryCode,
      delayInHours: SCHEDULE_DELAY_HOURS,
      email,
      emailKey: 'INTERVIEWS_CHECKOUT_FIRST_TIME',
      name,
      userId,
    });
  } else if (checkoutCount === CHECKOUT_ATTEMPTS_TO_TRIGGER_DISCOUNT) {
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
