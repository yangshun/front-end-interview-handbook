import { type NextRequest, NextResponse } from 'next/server';

import { createSupabaseAdminClientGFE } from '~/supabase/SupabaseServerGFE';

// This API is called by Supabase database hooks whenever a new
// row in the `profile` table is created. It receives a `body` resembling:
//  {
//    type: 'INSERT',
//    table: 'Profile',
//    record: {
//      id: 'ca139f0c-a6f2-48d9-958c-285968b27101',
//      plan: null,
//      premium: false,
//      createdAt: '2022-08-06T11:26:38.52669+00:00',
//      stripeCustomer: null
//    },
//    schema: 'public',
//    old_record: null
//  }
// WARNING: Do not change this file name/path and parameters without changing
// the database hook URL in Supabase!

// This hook updates some fields on the Profile with information from email or GitHub OAuth.
export async function POST(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  if (searchParams.get('api_route_secret') !== process.env.API_ROUTE_SECRET) {
    return NextResponse.json(
      { error: 'You are not authorized to call this API' },
      { status: 401 },
    );
  }

  const supabaseAdmin = createSupabaseAdminClientGFE();

  const result = await req.json();
  const userId = result.record?.id as string; // Supabase auth user ID.

  if (userId == null) {
    return NextResponse.json(
      { error: 'No user ID provided to update profile' },
      { status: 401 },
    );
  }

  const {
    data: { user },
    error,
  } = await supabaseAdmin.auth.admin.getUserById(userId);

  if (error != null) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status ?? 500 },
    );
  }

  if (user == null) {
    return NextResponse.json(
      { error: `No user found for ${userId}` },
      { status: 500 },
    );
  }

  const data = await supabaseAdmin
    .from('Profile')
    .update({
      // Use GitHub avatar. Avatar field will be left empty for email signups.
      avatarUrl: user.user_metadata.avatar_url,
      // Use GitHub name or leave empty.
      name: user.user_metadata.name,
      // Use GitHub username or derive from email.
      username:
        user.user_metadata.user_name ||
        user.email?.split('@')[0].replaceAll(/[^_a-zA-Z0-9]/g, ''),
    })
    .eq('id', userId);

  return NextResponse.json(data);
}
