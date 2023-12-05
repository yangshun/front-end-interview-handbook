import type { NextApiRequest, NextApiResponse } from 'next';

import { sendEmailPaymentFailed } from '~/emails/EmailSender';

/**
 * For testing, send to delivered@resend.dev (https://resend.com/docs/dashboard/emails/send-test-emails)
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const data = await sendEmailPaymentFailed(
      req.query.email as string,
      req.query.name as string,
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
