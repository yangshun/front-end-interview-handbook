import 'server-only';

import { Client, type LibraryResponse, type SendEmailV3_1 } from 'node-mailjet';
import React from 'react';

import EmailsSendStatus from '~/emails/EmailsSendStatus';

import type { EmailItemConfig } from '../EmailsTypes';
import { renderEmail } from '../render/EmailsRender';

import type { SetCommandOptions } from '@upstash/redis';

function MailjetClient() {
  return new Client({
    apiKey: process.env.MAILJET_API_KEY,
    apiSecret: process.env.MAILJET_SECRET_KEY,
  });
}

export async function sendEmailItemWithChecks<Component extends React.FC<any>>(
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

    const EmailComponent = config.component;

    const result = await sendReactEmail({
      emailElement: <EmailComponent {...props} />,
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

export async function sendReactEmail({
  emailElement,
  ...attrs
}: Omit<Parameters<typeof sendEmail>[0], 'body'> &
  Readonly<{
    emailElement: JSX.Element;
  }>) {
  const { html, text } = await renderEmail(emailElement);

  return sendEmail({ ...attrs, body: { html, text } });
}

async function sendEmail({
  to,
  from,
  subject,
  replyTo,
  body,
}: Readonly<{
  body: {
    html: string;
    text: string;
  };
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
