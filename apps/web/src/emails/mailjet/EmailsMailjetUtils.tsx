import type { Contact, ContactSubscription } from 'node-mailjet';
import { type LibraryResponse, type SendEmailV3_1 } from 'node-mailjet';
import React from 'react';

import EmailsSendStatus from '~/emails/EmailsSendStatus';
import { getErrorMessage } from '~/utils/getErrorMessage';

import { emailsContactListKeyToId } from './EmailsMailjetContactLists';
import MailjetClient from './MailjetClient';
import { emailsGenerateHash } from '../EmailsHash';
import type { EmailContactListKey } from '../EmailsTypes';
import type { EmailItemConfig } from '../EmailsTypes';
import { renderEmail } from '../render/EmailsRender';

import type { SetCommandOptions } from '@upstash/redis';

/**
 * Sends an email based on an email item config
 *
 * Performs the following checks first:
 * - User has received the same email before
 * - User was added to the exclusion list or has unsubscribed from the associated contact list
 *
 * Do not use this function for emails that MUST be delivered,
 * such as password reset and privacy policy changes
 */
export async function sendEmailItemWithChecks<
  Component extends React.FC<IntentionallyAny>,
>(
  recipient: Readonly<{
    email: string;
    name: string | null;
  }>,
  {
    emailItemConfig,
    redis,
    userId,
  }: {
    emailItemConfig: Readonly<{
      config: EmailItemConfig<Component>;
      props: EmailItemConfig<Component>['defaultProps'];
    }>;
    redis?: {
      opts: SetCommandOptions;
    };
    userId: string;
  },
) {
  try {
    const sendStatus = new EmailsSendStatus(emailItemConfig.config.id, userId);

    if (await sendStatus.isSent()) {
      return { reason: 'SENT_BEFORE', sent: false };
    }

    const { props, config } = emailItemConfig;

    const canBeUnsubscribed = config.contactListKey != null;

    // User has unsubscribed from the contact list this email belongs to
    if (canBeUnsubscribed) {
      const [excludedFromCampaigns, unsubscribed] = await Promise.all([
        emailIsExcludedFromCampaigns(recipient.email),
        emailIsUnsubscribedFromContactList({
          email: recipient.email,
          emailContactListKey: config.contactListKey,
        }),
      ]);

      if (excludedFromCampaigns) {
        return { reason: 'EXCLUSION_LIST', sent: false };
      }

      if (unsubscribed) {
        return { reason: 'UNSUBSCRIBED', sent: false };
      }
    }

    const EmailComponent = config.component;

    const result = await sendReactEmail({
      emailElement: (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <EmailComponent
          {...props}
          unsub={
            canBeUnsubscribed
              ? {
                  email: recipient.email,
                  hash: emailsGenerateHash(recipient.email),
                  list: config.contactListKey,
                }
              : undefined
          }
        />
      ),
      from: config.from,
      replyTo: config.replyTo,
      subject: config.subject(props),
      to: recipient,
    });

    await sendStatus.markAsSent(redis?.opts);

    return { result, sent: true };
  } catch (error) {
    return { error: getErrorMessage(error), reason: 'ERROR', sent: false };
  }
}

/**
 * Sends an email made using react-email using Mailjet without any checks.
 * At the moment there's no use case for exposing this outside of the module.
 */
export async function sendReactEmail({
  emailElement,
  ...attrs
}: Omit<Parameters<typeof sendEmail_NO_CHECKS>[0], 'body'> &
  Readonly<{
    emailElement: JSX.Element;
  }>) {
  const { html, text } = await renderEmail(emailElement);

  return sendEmail_NO_CHECKS({ ...attrs, body: { html, text } });
}

/**
 * Sends an email using Mailjet without any checks.
 * At the moment there's no use case for exposing this outside of the module.
 */
async function sendEmail_NO_CHECKS({
  to,
  cc,
  from,
  subject,
  replyTo,
  body,
}: Readonly<{
  body: {
    html: string;
    text: string;
  };
  cc?: ReadonlyArray<{
    email: string;
    name?: string;
  }>;
  from: {
    email: string;
    name: string;
  };
  replyTo?: {
    email: string;
    name?: string;
  };
  subject: string;
  to: {
    email: string;
    name: string | null;
  };
}>) {
  const mailjetClient = MailjetClient();

  const emailData: SendEmailV3_1.Body = {
    Messages: [
      {
        Cc:
          cc && cc.length > 0
            ? cc.map((item) => ({
                Email: item.email,
                Name: item.name,
              }))
            : undefined,
        From: {
          Email: from.email,
          Name: from.name,
        },
        HTMLPart: body.html,
        ReplyTo: replyTo
          ? {
              Email: replyTo.email,
              Name: replyTo.name,
            }
          : undefined,
        Subject:
          process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
            ? subject
            : `[${process.env.NEXT_PUBLIC_VERCEL_ENV || 'dev'}] ${subject}`,
        TextPart: body.text,
        To: [
          {
            Email: to.email,
            Name: to.name || to.email,
          },
        ],
      },
    ],
  };

  try {
    const result: LibraryResponse<SendEmailV3_1.Response> = await mailjetClient
      .post('send', { version: 'v3.1' })
      .request(emailData);

    return result.body.Messages[0];
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

export async function emailIsExcludedFromCampaigns(
  email: string,
): Promise<boolean> {
  const mailjetClient = MailjetClient();

  try {
    const result: LibraryResponse<Contact.GetContactResponse> =
      await mailjetClient.get('contact', { version: 'v3' }).id(email).request();

    return result.body.Data[0].IsExcludedFromCampaigns;
  } catch (error) {
    return false;
  }
}

export async function emailIsUnsubscribedFromContactList({
  email,
  emailContactListKey,
}: Readonly<{
  email: string;
  emailContactListKey: EmailContactListKey;
}>): Promise<boolean> {
  const mailjetClient = MailjetClient();
  const contactListId = emailsContactListKeyToId(emailContactListKey);

  try {
    const result: LibraryResponse<ContactSubscription.GetContactGetContactsListsResponse> =
      await mailjetClient
        .get('contact', { version: 'v3' })
        .id(email)
        .action('getcontactslists')
        .request();

    const contactLists = result.body.Data;
    const contactList = contactLists.find(
      (contactList_) => contactList_.ListID === contactListId,
    );

    // If user is not part of the contact list, assume subscribed
    // TODO(emails): This default behavior to assume subscribed can
    // be removed after we correctly sync user emails with Mailjet
    return contactList?.IsUnsub ?? false;
  } catch (error) {
    console.error('Error checking subscription status:', error);

    return false;
  }
}
