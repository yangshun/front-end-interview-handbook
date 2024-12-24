'server only';

import { Client, type LibraryResponse, type SendEmailV3_1 } from 'node-mailjet';

import EmailsSendStatus from '~/emails/EmailsSendStatus';

import type { EmailKey } from '../EmailsTypes';

import { render } from '@react-email/components';
import type { SetCommandOptions } from '@upstash/redis';

type EmailAttributes = Readonly<{
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
}>;

export async function sendReactEmailWithChecks(
  {
    emailKey,
    userId,
    opts,
  }: { emailKey: EmailKey; opts?: SetCommandOptions; userId: string },
  emailProps: Parameters<typeof sendReactEmail>[0],
) {
  try {
    const sendStatus = new EmailsSendStatus(emailKey, userId);

    if (await sendStatus.isSent()) {
      return;
    }

    await sendReactEmail(emailProps);
    await sendStatus.markAsSent(opts);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

export async function sendReactEmail({
  component,
  ...attrs
}: EmailAttributes &
  Readonly<{
    component: JSX.Element;
  }>) {
  const [html, text] = await Promise.all([
    render(component),
    render(component, { plainText: true }),
  ]);

  return sendEmail({ ...attrs, body: { html, text } });
}

async function sendEmail({
  to,
  from,
  subject,
  replyTo,
  body,
}: EmailAttributes &
  Readonly<{
    body: {
      html: string;
      text: string;
    };
  }>) {
  const mailjetClient = new Client({
    apiKey: process.env.MAILJET_API_KEY,
    apiSecret: process.env.MAILJET_SECRET_KEY,
  });

  const emailData: SendEmailV3_1.Body = {
    Messages: [
      {
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
        Subject: subject,
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
