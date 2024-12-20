import { type NextRequest, NextResponse } from 'next/server';

import {
  createMailjetContact,
  updateMailjetContactsLists,
} from '~/emails/mailjet/EmailsMailjetCreateContact';
import { createSupabaseAdminClientGFE_SERVER_ONLY } from '~/supabase/SupabaseServerGFE';

// This API is called by Supabase database hooks whenever a new
// row in the `profile` table is created. It receives a `body` resembling:
// {
//   "type": "INSERT",
//   "table": "Profile",
//   "record": {
//     "id": "d220fee0-2e8c-4670-ba14-eb9881495df8",
//     "plan": null,
//     "premium": false,
//     "createdAt": "2022-08-06T11:26:38.52669+00:00",
//     "stripeCustomer": null
//   },
//   "schema": "public",
//   "old_record": null
// }
// WARNING: Do not change this file name/path and parameters without changing
// the database hook URL in Supabase!

const blackListedUsernames = new Set([
  'gfe',
  'greatfrontend',
  'me',
  'hello',
  'hi',
  'dev',
  'info',
  'contact',
  '123',
]);

// This hook updates some fields on the Profile with information from email or GitHub OAuth.
export async function POST(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  if (searchParams.get('api_route_secret') !== process.env.API_ROUTE_SECRET) {
    return NextResponse.json(
      { error: 'You are not authorized to call this API' },
      { status: 401 },
    );
  }

  const supabaseAdmin = createSupabaseAdminClientGFE_SERVER_ONLY();

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

  const suggestedUsername =
    user.user_metadata.user_name ||
    user.email?.split('@')[0].replaceAll(/[^_a-zA-Z0-9]/g, '');

  // Check if username is one of the banned/common words.
  // If so, we'll just not update the username.
  const username = blackListedUsernames.has(suggestedUsername)
    ? null
    : suggestedUsername;

  let mailjetContactId = undefined;

  // Don't create Mailjet contacts for dev environment.
  if (process.env.NODE_ENV !== 'development') {
    // Wrap in try/catch so that Mailjet creation failure
    // does not block the other updates.
    try {
      const { data } = await createMailjetContact(user.email!);

      if (data?.contactId) {
        mailjetContactId = data.contactId;
      }

      await updateMailjetContactsLists(user.email!);
    } catch (err) {
      console.error(err);
    }
  }

  const data = await supabaseAdmin
    .from('Profile')
    .update({
      // Use GitHub avatar. Avatar field will be left empty for email signups.
      avatarUrl: user.user_metadata.avatar_url,
      // Use GitHub username or leave empty.
      gitHubUsername: user.user_metadata.user_name || undefined,
      // Mailjet contact ID.
      mailjetContactId: mailjetContactId ? String(mailjetContactId) : undefined,
      // Use GitHub name or leave empty.
      name: user.user_metadata.name,
      // Use GitHub username or derive from email.
      username,
    })
    .eq('id', userId);

  return NextResponse.json(data);
}
