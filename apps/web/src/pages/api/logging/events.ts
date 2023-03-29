import cookie from 'cookie';
import Cors from 'cors';
import type { NextApiRequest, NextApiResponse } from 'next';

import { parseJWTAccessToken } from '~/supabase/SupabaseServerGFE';

import Client from '@axiomhq/axiom-node';

const client = new Client({
  orgId: process.env.AXIOM_ORG_ID,
  token: process.env.AXIOM_TOKEN,
});

const cors = Cors({
  methods: ['POST'],
});

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  // eslint-disable-next-line @typescript-eslint/ban-types
  fn: Function,
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await runMiddleware(req, res, cors);

  if (process.env.NODE_ENV !== 'production') {
    return res
      .status(403)
      .json({ message: `Only send in ${process.env.NODE_ENV}` });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const cookies = cookie.parse(req.headers.cookie ?? '');

  let userEmail = null;
  let userId = null;

  try {
    if (cookies['supabase-auth-token']) {
      const { sub, email } = parseJWTAccessToken(
        cookies['supabase-auth-token'],
      );

      userId = sub || null;
      userEmail = email || null;
    }
  } catch (err) {
    // TODO: Log error.
  }

  const { clientSHA, name, pathname, payload, query, value } = req.body;

  const eventPayload = {
    event: {
      name,
      payload,
      value,
    },
    git: {
      client: (clientSHA || '').slice(0, 7) || undefined,
      server:
        (process.env.VERCEL_GIT_COMMIT_SHA || '').slice(0, 7) || undefined,
    },
    request: {
      country: cookies.country,
      pathname,
      query,
      referer: req.headers.referer,
    },
    user: {
      email: userEmail,
      fingerprint: cookies.gfp,
      id: userId,
    },
  };

  await client.ingestEvents('events', [eventPayload]);

  return res.status(204).send(null);
}
