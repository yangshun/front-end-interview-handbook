// TODO: Try to make it server-only.
// The last time I tried the logging routes failed, saying that this can only be used in server components.
// import 'server-only';

import { cookies } from 'next/headers';

import type { Database } from './database.types';

import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { SupabaseClient, User } from '@supabase/supabase-js';
import { createClient } from '@supabase/supabase-js';

export type SupabaseClientGFE = SupabaseClient<Database>;

/**
 * Next.js specific Supabase client to be used within server-side code.
 */
export function createServerSupabaseClientGFE(
  ...args: Parameters<typeof createServerSupabaseClient>
) {
  return createServerSupabaseClient<Database>(...args);
}

/**
 * Supabase client to be used on the server only because
 * it uses the service role key.
 *
 * Doesn't allow additional options because there's no
 * use case for it yet.
 */
export function createSupabaseAdminClientGFE() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_ROLE_KEY as string,
  );
}

export async function fetchUser(authToken?: string): Promise<User | null> {
  try {
    let supabaseAuthToken = authToken;

    if (supabaseAuthToken == null) {
      // TODO: Allow cookie to be passed in as a param because cookies()
      // crashes when used in serverless API routes.
      // Remove authToken param when fixed.
      // https://github.com/vercel/next.js/issues/46356
      const cookieStore = cookies();

      supabaseAuthToken = cookieStore.get('supabase-auth-token')?.value;
    }

    if (supabaseAuthToken == null) {
      return null;
    }

    const tokens = decodeSupabaseAuthTokens(supabaseAuthToken);

    if (tokens == null || tokens.accessToken == null) {
      return null;
    }

    const supabaseAdmin = createSupabaseAdminClientGFE();
    const {
      data: { user },
    } = await supabaseAdmin.auth.getUser(tokens.accessToken);

    return user;
  } catch (err) {
    // TODO: Log error.
    return null;
  }
}

export function decodeSupabaseAuthTokens(authTokens: string): Readonly<{
  accessToken: string | null;
  providerRefreshToken: string | null;
  providerToken: string | null;
  refreshToken: string | null;
}> {
  // The shape of the `supabase-auth-token` cookie:
  // [
  //   session.access_token,
  //   session.refresh_token,
  //   session.provider_token,
  //   session.provider_refresh_token,
  // ]
  const [accessToken, refreshToken, providerToken, providerRefreshToken] =
    JSON.parse(decodeURIComponent(authTokens));

  try {
    return { accessToken, providerRefreshToken, providerToken, refreshToken };
  } catch (err) {
    // TODO: report error.
    return {
      accessToken: null,
      providerRefreshToken: null,
      providerToken: null,
      refreshToken: null,
    };
  }
}

export function parseJWTAccessToken(token: string): Readonly<{
  // User ID.
  email: string;
  sub: string; // User Email.
}> {
  const { accessToken } = decodeSupabaseAuthTokens(token);

  if (!accessToken) {
    throw new Error('Unable to parse Supabase auth token');
  }

  return JSON.parse(
    Buffer.from(accessToken.split('.')[1], 'base64').toString(),
  );
}
