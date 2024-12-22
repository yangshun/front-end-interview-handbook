import EmailsSendStatus from '~/emails/EmailsSendStatus';
import scheduleEmail from '~/emails/qstash/EmailsQstashScheduler';
import RedisCounter from '~/redis/RedisCounter';

const MULTIPLE_CHECKOUT_COUNT = 3;
const EXPIRES_MONTH = 6;

function sixMonthsFromToday() {
  const today = new Date();
  const sixMonthsLater = new Date();

  sixMonthsLater.setMonth(today.getMonth() + EXPIRES_MONTH);

  const timeDifference = sixMonthsLater.getTime() - today.getTime();
  const secondsDifference = timeDifference / 1000;

  return Math.round(secondsDifference);
}

export default async function triggerInitiateCheckoutEmail({
  name,
  email,
  userId,
}: Readonly<{
  email: string;
  name: string;
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
  }

  const isMultipleCheckout = checkoutCount >= MULTIPLE_CHECKOUT_COUNT;
  const checkoutEmailKey = isMultipleCheckout
    ? 'CHECKOUT_MULTIPLE_TIMES'
    : 'CHECKOUT_FIRST_TIME';

  const sendStatus = new EmailsSendStatus(checkoutEmailKey, userId);

  if (await sendStatus.isSentOrScheduled()) {
    return;
  }

  if (checkoutCount !== 1 && checkoutCount !== MULTIPLE_CHECKOUT_COUNT) {
    return;
  }

  const result = await scheduleEmail({
    delayInHours: 24,
    email,
    emailKey: checkoutEmailKey,
    name,
    userId,
  });

  if (result.messageId) {
    await sendStatus.markAsScheduled();
  }
}
