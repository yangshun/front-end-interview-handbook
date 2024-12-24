import { z } from 'zod';

import scheduleCheckoutInitiateEmail from '~/emails/items/checkout/EmailsSchedulerCheckoutInitiate';
import { scheduleEmailWithChecks } from '~/emails/qstash/EmailsQstashScheduler';

import { router, userProcedure } from '../trpc';

const ONE_DAY_SECS = 24 * 60 * 60;
const ONE_MIN_SECS = 60;

export const emailsRouter = router({
  checkoutInitiate: userProcedure
    .input(
      z.object({
        countryCode: z.string().nullable(),
      }),
    )
    .mutation(async ({ input: { countryCode }, ctx: { viewer } }) => {
      await scheduleCheckoutInitiateEmail({
        countryCode: countryCode ?? null,
        userId: viewer.id,
      });
    }),
  scheduleWelcomeSeries: userProcedure.mutation(async ({ ctx: { viewer } }) => {
    const { id: userId } = viewer;

    await Promise.all([
      scheduleEmailWithChecks({
        delayInSeconds: ONE_MIN_SECS,
        emailKey: 'INTERVIEWS_WELCOME_EMAIL_IMMEDIATE',
        userId,
      }),
      scheduleEmailWithChecks({
        delayInSeconds: ONE_DAY_SECS,
        emailKey: 'INTERVIEWS_WELCOME_EMAIL_24_HOURS',
        userId,
      }),
    ]);
  }),
});
