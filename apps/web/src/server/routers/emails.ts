import { z } from 'zod';

import scheduleCheckoutInitiateEmail from '~/emails/items/checkout/EmailsSchedulerCheckoutInitiate';
import scheduleWelcomeSeriesEmail from '~/emails/items/welcome/EmailsSchedulerWelcomeSeries';

import { router, userProcedure } from '../trpc';

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
    await scheduleWelcomeSeriesEmail({
      userId: viewer.id,
    });
  }),
});
