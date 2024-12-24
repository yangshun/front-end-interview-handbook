import { z } from 'zod';

import scheduleCheckoutInitiateEmail from '~/emails/items/checkout/EmailsSchedulerCheckoutInitiate';
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
});
