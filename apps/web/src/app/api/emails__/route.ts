import { type NextRequest, NextResponse } from 'next/server';

import {
  sendInitiateCheckoutFirstTimeEmail,
  sendInitiateCheckoutMultipleTimesEmail,
} from '~/emails/items/checkout/EmailsSenderCheckoutInitiate';
import { sendInterviewsProgressEmail } from '~/emails/items/interviews-progress/EmailsSenderInterviewsProgress';
import {
  sendWelcomeEmailAfter24Hours,
  sendWelcomeEmailImmediate,
} from '~/emails/items/welcome/EmailsSenderWelcomeSeries';
import { createSupabaseAdminClientGFE_SERVER_ONLY } from '~/supabase/SupabaseServerGFE';
import { getErrorMessage } from '~/utils/getErrorMessage';

/**
 * This route is only meant to be called by QStash for
 * sending out scheduled emails.
 *
 * It should not be called directly by browsers and
 * exposed to public.
 */
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

    if (user?.email == null) {
      return NextResponse.json(
        { error: `No user found for ${userId}` },
        { status: 500 },
      );
    }

    const { email } = user;
    const name = profile?.name ?? null;

    switch (emailKey) {
      case 'INTERVIEWS_WELCOME_EMAIL_IMMEDIATE': {
        const result = await sendWelcomeEmailImmediate({
          email,
          name,
          userId,
        });

        return NextResponse.json(result);
      }
      case 'INTERVIEWS_WELCOME_EMAIL_24_HOURS': {
        const result = await sendWelcomeEmailAfter24Hours({
          email,
          name,
          userId,
        });

        return NextResponse.json(result);
      }
      case 'INTERVIEWS_CHECKOUT_FIRST_TIME': {
        const result = await sendInitiateCheckoutFirstTimeEmail({
          countryCode,
          email,
          name,
          userId,
        });

        return NextResponse.json(result);
      }
      case 'INTERVIEWS_CHECKOUT_MULTIPLE_TIMES': {
        const result = await sendInitiateCheckoutMultipleTimesEmail({
          email,
          name,
          userId,
        });

        return NextResponse.json(result);
      }
      case 'INTERVIEWS_PROGRESS': {
        const result = await sendInterviewsProgressEmail({
          email,
          name,
          userId,
        });

        return NextResponse.json(result);
      }
      default:
        return NextResponse.json({ error: `Invalid email key '${emailKey}'` });
    }
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 },
    );
  }
}
