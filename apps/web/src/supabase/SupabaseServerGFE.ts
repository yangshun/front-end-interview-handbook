// TODO: Try to make it server-only.
// The last time I tried the logging routes failed, saying that this can only be used in server components.
// import 'server-only';

import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { SupabaseClient, User } from '@supabase/supabase-js';
import { createClient } from '@supabase/supabase-js';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

import type { Database } from './database.types';

export type SupabaseClientGFE = SupabaseClient<Database>;

/**
 * Next.js-specific Supabase client to be used within server-side code.
 */
export function createSupabaseClientGFE_SERVER_ONLY(
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
export function createSupabaseAdminClientGFE_SERVER_ONLY() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_ROLE_KEY as string,
  );
}

/**
 * @deprecated Makes a database call to get the full user data from the `auth` schema.
 * If you only need the user id or token, use `readViewerFromToken` instead.
 */
export async function fetchUser_DO_NOT_USE_IF_ONLY_USER_ID_OR_EMAIL_NEEDED(
  authToken?: string,
): Promise<User | null> {
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

    const supabaseAdmin = createSupabaseAdminClientGFE_SERVER_ONLY();
    const {
      data: { user },
    } = await supabaseAdmin.auth.getUser(tokens.accessToken);

    return user;
  } catch (error) {
    // TODO: Log error.
    return null;
  }
}

export type Viewer = SupabaseJwtUser;

// TODO(auth): Migrate fetchUser() to this function as much as possible.
export async function readViewerFromToken(
  authToken?: string,
): Promise<Viewer | null> {
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

    return await parseJWTAccessToken(supabaseAuthToken);
  } catch (error) {
    // TODO: Log error.
    return null;
  }
}

function decodeSupabaseAuthTokens(authTokens: string): Readonly<{
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
  } catch (error) {
    // TODO: report error.
    return {
      accessToken: null,
      providerRefreshToken: null,
      providerToken: null,
      refreshToken: null,
    };
  }
}

type SupabaseJwtUser = Readonly<{
  email: string; // User Email.
  id: string; // User ID.
}>;

type SupabaseJwtPayload = Readonly<{
  email: string; // User Email.
  sub: string; // User ID.
}>;

const encodedSecret = new TextEncoder().encode(
  process.env.SUPABASE_JWT_SECRET!,
);

export async function parseJWTAccessToken(
  token: string,
): Promise<SupabaseJwtUser> {
  const { accessToken } = decodeSupabaseAuthTokens(token);

  if (!accessToken) {
    throw new Error('Unable to parse Supabase auth token');
  }

  const { payload } = await jwtVerify(accessToken, encodedSecret);

  const jwtPayload = payload as SupabaseJwtPayload;

  return {
    email: jwtPayload.email,
    id: jwtPayload.sub,
  };
}
