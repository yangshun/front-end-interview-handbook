import cookie from 'cookie';
import Cors from 'cors';
import type { NextApiRequest, NextApiResponse } from 'next';

import type { MessageLevel } from '~/logging/logMessage';
import { createServerSupabaseClientGFE } from '~/supabase/SupabaseServerGFE';

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

const levelIcon: Record<MessageLevel, string> = {
  error: '⛔',
  info: '💬',
  success: '✅ ',
  warning: '⚠️',
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await runMiddleware(req, res, cors);

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const supabase = createServerSupabaseClientGFE({ req, res });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const cookies = cookie.parse(req.headers.cookie ?? '');
  const {
    level,
    message,
    title,
    user_identifier: userIdentifier,
    sha,
  } = req.body;

  const finalMessage = [
    `Level: ${levelIcon[level as MessageLevel]}`,
    `Title: ${title}`,
    `Message: ${message}`,
    req.headers.referer && `Referer: ${req.headers.referer}`,
    userIdentifier && `User Identifier: ${userIdentifier}`,
    user?.email && `Email: ${user?.email}`,
    user?.id && `User ID: ${user?.id}`,
    sha && `Client SHA: ${sha}`,
    process.env.VERCEL_GIT_COMMIT_SHA &&
      `Server SHA: ${process.env.VERCEL_GIT_COMMIT_SHA.slice(0, 7)}`,
    cookies.gfp && `GFP: ${cookies.gfp}`,
    cookies.country && `Country: ${cookies.country}`,
  ]
    .filter(Boolean)
    .join('\n');

  await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_API_TOKEN}/sendMessage`,
    {
      body: JSON.stringify({
        // GFE Internal Tg Chat.
        chat_id: +(process.env.TELEGRAM_CHAT_ID ?? ''),
        parse_mode: 'HTML',
        text: finalMessage,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    },
  );

  return res.status(204).send(null);
}
