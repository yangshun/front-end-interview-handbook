import { type NextRequest, NextResponse } from 'next/server';

import {
  sendInitiateCheckoutFirstTimeEmail,
  sendInitiateCheckoutMultipleTimesEmail,
} from '~/emails/items/checkout/EmailsSenderCheckoutInitiate';
import sendInterviewsProgressEmail from '~/emails/items/interviews-progress/EmailsSenderInterviewsProgress';
import {
  sendWelcomeEmailAfter24Hours,
  sendWelcomeEmailImmediate,
} from '~/emails/items/welcome/EmailsSenderWelcomeSeries';
import { createSupabaseAdminClientGFE_SERVER_ONLY } from '~/supabase/SupabaseServerGFE';

export async function POST(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  if (searchParams.get('api_route_secret') !== process.env.API_ROUTE_SECRET) {
    return NextResponse.json(
      { error: 'You are not authorized to call this API' },
      { status: 401 },
    );
  }

  try {
    const request = await req.json();
    const { emailKey, userId, countryCode } = request;

    const supabaseAdmin = createSupabaseAdminClientGFE_SERVER_ONLY();
    const [
      {
        data: { user },
        error: getUserError,
      },
      { data: profile, error: getProfileError },
    ] = await Promise.all([
      supabaseAdmin.auth.admin.getUserById(userId),
      // Can't use Prisma here because it's not supported in edge functions
      supabaseAdmin.from('Profile').select('name').eq('id', userId).single(),
    ]);

    const error = getUserError ?? getProfileError ?? null;

    if (error != null) {
      return NextResponse.json(
        { error: error.message },
        { status: 'status' in error ? error.status : 500 },
      );
    }

    if (user == null || user.email == null) {
      return NextResponse.json(
        { error: `No user found for ${userId}` },
        { status: 500 },
      );
    }

    const { email } = user;
    const name = profile?.name ?? null;

    // TODO(emails): remove non-scheduled emails from function
    switch (emailKey) {
      case 'INTERVIEWS_WELCOME_EMAIL_IMMEDIATE':
        await sendWelcomeEmailImmediate({
          email,
          name,
          userId,
        });
        break;
      case 'INTERVIEWS_WELCOME_EMAIL_24_HOURS':
        await sendWelcomeEmailAfter24Hours({
          email,
          name,
          userId,
        });
        break;
      case 'INTERVIEWS_CHECKOUT_FIRST_TIME':
        await sendInitiateCheckoutFirstTimeEmail({
          countryCode,
          email,
          name,
          userId,
        });
        break;
      case 'INTERVIEWS_CHECKOUT_MULTIPLE_TIMES':
        await sendInitiateCheckoutMultipleTimesEmail({
          email,
          name,
          userId,
        });
        break;
      case 'INTERVIEWS_PROGRESS':
        await sendInterviewsProgressEmail({
          email,
          name,
          userId,
        });
        break;
      default:
        return NextResponse.json(
          { error: `Invalid email key '${emailKey}'` },
          { status: 400 },
        );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
