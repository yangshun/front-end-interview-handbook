import { z } from 'zod';

import { emailsVerifyHash } from '~/emails/EmailsHash';
import { EmailContactListKeyZodEnum } from '~/emails/EmailsTypes';
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
  resubscribe: publicProcedure
    .input(
      z.object({
        contactListKey: EmailContactListKeyZodEnum,
        email: z.string().email('Email is invalid'),
        hash: z.string(),
      }),
    )
    .mutation(async ({ input: { email, hash, contactListKey } }) => {
      const contactListId = emailsContactListKeyToId(contactListKey);

      if (!emailsVerifyHash(email, hash)) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `Error resubscribing ${email}`,
        });
      }

      try {
        const mailjetClient = MailjetClient();

        await mailjetClient
          .post('contactslist', { version: 'v3' })
          .id(contactListId)
          .action('managecontact')
          .request({
            Action: 'addforce',
            Email: email,
          });

        return `Successfully resubscribed ${email}`;
      } catch {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Something went wrong',
        });
      }
    }),
  scheduleWelcomeSeries: publicProcedure
    .input(
      z.object({
        userId: z.string().uuid('uuid is invalid'),
      }),
    )
    .mutation(async ({ input: { userId } }) => {
      await scheduleWelcomeSeriesEmail({
        userId,
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
      } catch {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Unable to sign up for newsletter',
        });
      }
    }),
  unsubscribe: publicProcedure
    .input(
      z.object({
        contactListKey: EmailContactListKeyZodEnum,
        email: z.string().email('Email is invalid'),
        hash: z.string(),
      }),
    )
    .mutation(async ({ input: { email, hash, contactListKey } }) => {
      const contactListId = emailsContactListKeyToId(contactListKey);

      if (!emailsVerifyHash(email, hash)) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `Error unsubscribing ${email}`,
        });
      }

      try {
        const mailjetClient = MailjetClient();

        await mailjetClient
          .post('contactslist', { version: 'v3' })
          .id(contactListId)
          .action('managecontact')
          .request({
            Action: 'unsub',
            Email: email,
          });

        return `Successfully unsubscribed ${email}`;
      } catch {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Something went wrong',
        });
      }
    }),
});
