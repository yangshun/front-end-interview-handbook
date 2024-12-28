import { z } from 'zod';

import scheduleCheckoutInitiateEmail from '~/emails/items/checkout/EmailsSchedulerCheckoutInitiate';
import scheduleWelcomeSeriesEmail from '~/emails/items/welcome/EmailsSchedulerWelcomeSeries';
import { emailsContactListKeyToId } from '~/emails/mailjet/EmailsMailjetContactLists';
import MailjetClient from '~/emails/mailjet/MailjetClient';
import { publicProcedure } from '~/server/trpc';

import { router, userProcedure } from '../trpc';

import { TRPCError } from '@trpc/server';

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
  signUpForNewsletter: publicProcedure
    .input(
      z.object({
        email: z.string().email('Email is invalid'),
      }),
    )
    .mutation(async ({ input: { email } }) => {
      const contactListId = emailsContactListKeyToId('NEWSLETTER');

      try {
        const mailjetClient = MailjetClient();

        await mailjetClient
          .post('contactslist', { version: 'v3' })
          .id(contactListId)
          .action('managecontact')
          .request({
            Action: 'addnoforce',
            Email: email,
          });

        return 'Subscribed successfully!';
      } catch (err: any) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: err.response.data.ErrorInfo.Email,
        });
      }
    }),
});
