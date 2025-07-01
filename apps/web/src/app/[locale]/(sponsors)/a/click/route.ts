import { redirect } from 'next/navigation';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import nullthrows from 'nullthrows';

import RedisCounter from '~/redis/RedisCounter';
import { getErrorMessage } from '~/utils/getErrorMessage';

// This route is intentionally vaguely named so that ad blockers do not block it.
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const url = searchParams.get('u');
  const adId = searchParams.get('a');

  try {
    new RedisCounter('SPONSORSHIPS_AD_CLICK', nullthrows(adId)).incr();
  } catch (error) {
    console.error(error);

    return NextResponse.json({ err: getErrorMessage(error) }, { status: 500 });
  }

  redirect(nullthrows(url));
}
