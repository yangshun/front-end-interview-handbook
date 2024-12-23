import EmailsSendStatus from '~/emails/EmailsSendStatus';
import RedisCounter from '~/redis/RedisCounter';

type Props = Readonly<{
  userId: string;
}>;

export default async function emailsClearCheckoutRedis({ userId }: Props) {
  const sendStatusInitiateCheckoutFirstTime = new EmailsSendStatus(
    'INTERVIEWS_CHECKOUT_FIRST_TIME',
    userId,
  );
  const sendStatusInitiateCheckoutMultipleTimes = new EmailsSendStatus(
    'INTERVIEWS_CHECKOUT_MULTIPLE_TIMES',
    userId,
  );
  const checkoutRedisCounter = new RedisCounter(
    'INTERVIEWS_CHECKOUT_COUNT',
    userId,
  );

  // Clear all the checkout email-related Redis keys
  await Promise.all([
    sendStatusInitiateCheckoutFirstTime.del(),
    sendStatusInitiateCheckoutMultipleTimes.del(),
    checkoutRedisCounter.del(),
  ]);
}
