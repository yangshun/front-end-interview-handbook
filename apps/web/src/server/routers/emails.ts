import { z } from 'zod';

import scheduleCheckoutInitiateEmail from '~/emails/items/checkout/EmailsSchedulerCheckoutInitiate';
import { scheduleEmailWithChecks } from '~/emails/qstash/EmailsQstashScheduler';
import prisma from '~/server/prisma';

import { router, userProcedure } from '../trpc';

export const emailsRouter = router({
  checkoutInitiate: userProcedure
    .input(
      z.object({
        countryCode: z.string().nullable(),
      }),
    )
    .mutation(async ({ input: { countryCode }, ctx: { viewer } }) => {
      const profile = await prisma.profile.findUnique({
        select: {
          name: true,
        },
        where: {
          id: viewer.id,
        },
      });

      return await scheduleCheckoutInitiateEmail({
        countryCode: countryCode ?? null,
        email: viewer.email,
        name: profile?.name ?? null,
        userId: viewer.id,
      });
    }),
  scheduleWelcomeSeries: userProcedure.mutation(async ({ ctx: { viewer } }) => {
    const profile = await prisma.profile.findUnique({
      select: {
        name: true,
      },
      where: {
        id: viewer.id,
      },
    });

    const name = profile?.name ?? null;
    const { email, id: userId } = viewer;

    await Promise.all([
      scheduleEmailWithChecks({
        delayInHours: 0.1, // TODO(emails): change to 5 minutes
        email,
        emailKey: 'INTERVIEWS_WELCOME_EMAIL_IMMEDIATE',
        name,
        userId,
      }),
      scheduleEmailWithChecks({
        delayInHours: 24,
        email,
        emailKey: 'INTERVIEWS_WELCOME_EMAIL_24_HOURS',
        name,
        userId,
      }),
    ]);
  }),
});
