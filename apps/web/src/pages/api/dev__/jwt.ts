import cookie from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

import { parseJWTAccessToken } from '~/supabase/SupabaseServerGFE';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const cookies = cookie.parse(req.headers.cookie ?? '');
  const data = parseJWTAccessToken(cookies['supabase-auth-token']);

  return res.status(200).json(data);
}
