import { type NextRequest, NextResponse } from 'next/server';

import { sendEmailPaymentFailed } from '~/emails/EmailSender';
import { getErrorMessage } from '~/utils/getErrorMessage';

/**
 * For testing, send to delivered@resend.dev
 *
 * Reference: https://resend.com/docs/dashboard/emails/send-test-emails)
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;

    const data = await sendEmailPaymentFailed(
      searchParams.get('email') as string,
      searchParams.get('name') as string,
    );

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 },
    );
  }
}
