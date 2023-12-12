import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { parseJWTAccessToken } from '~/supabase/SupabaseServerGFE';

/**
 * Test parsing of the Supabase auth token.
 */
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('supabase-auth-token');
    const data = parseJWTAccessToken(token!.value);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
