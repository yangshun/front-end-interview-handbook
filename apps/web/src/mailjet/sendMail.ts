'server only';

import { Client, type LibraryResponse, type SendEmailV3_1 } from 'node-mailjet';

export async function sendEmail({
  to,
  from,
  subject,
  templateId,
  replyTo,
  variables,
}: Readonly<{
  from: {
    email: string;
    name: string;
  };
  replyTo?: {
    email: string;
    name?: string;
  };
  subject: string;
  templateId: number;
  to: {
    email: string;
    name: string | null;
  };
  variables?: Record<string, string>;
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
        ReplyTo: replyTo
          ? {
              Email: replyTo.email,
              Name: replyTo.name,
            }
          : undefined,
        Subject: subject,
        TemplateID: templateId,
        TemplateLanguage: true,
        To: [
          {
            Email: to.email,
            Name: to.name || 'Recipient name',
          },
        ],
        Variables: variables,
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
