import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { parseJWTAccessToken } from '~/supabase/SupabaseServerGFE';
import { getErrorMessage } from '~/utils/getErrorMessage';

// Test that this API also works on Vercel's edge runtime, which
// contains only a subset of Node.js APIs.
export const runtime = 'edge';

/**
 * Test parsing of the Supabase auth token.
 */
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('supabase-auth-token');
    const data = await parseJWTAccessToken(token!.value);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ err: getErrorMessage(error) }, { status: 500 });
  }
}
