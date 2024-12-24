import url from 'url';

import type { EmailKey } from '~/emails/EmailsTypes';

const WELCOME_EMAIL_KEY: EmailKey = 'INTERVIEWS_WELCOME_EMAIL_IMMEDIATE';

export default async function scheduleWelcomeSeriesEmail({
  name,
  email,
  signedUpViaInterviews,
  userId,
}: Readonly<{
  email: string;
  name: string;
  signedUpViaInterviews: boolean;
  userId: string;
}>) {
  try {
    // TODO(emails): Move to tRPC and call underlying schedule function from tRPC if it does not exceed the serverless function size limit
    await fetch(
      url.format({
        pathname: `/api/emails__`,
        query: {
          // TODO(emails): do not ship with this!
          api_route_secret: process.env.API_ROUTE_SECRET,
        },
      }),
      {
        body: JSON.stringify({
          email,
          emailKey: WELCOME_EMAIL_KEY,
          name,
          signedUpViaInterviews,
          userId,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      },
    );
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
