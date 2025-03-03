import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import nullthrows from 'nullthrows';

import RedisCounter from '~/redis/RedisCounter';
import { getErrorMessage } from '~/utils/getErrorMessage';

export async function POST(req: NextRequest) {
  try {
    const { a } = await req.json();

    new RedisCounter('SPONSORSHIPS_AD_IMPRESSION', nullthrows(a)).incr();

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ err: getErrorMessage(error) }, { status: 500 });
  }
}
