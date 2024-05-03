import cookie from 'cookie';
import Cors from 'cors';
import type { NextApiRequest, NextApiResponse } from 'next';

import type { MessageLevel } from '~/logging/logMessage';
import { createSupabaseClientGFE_SERVER_ONLY } from '~/supabase/SupabaseServerGFE';

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

  const supabase = createSupabaseClientGFE_SERVER_ONLY({ req, res });
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

  const messageRows: ReadonlyArray<{ key: string; value: string }> = [
    { key: 'Level', value: levelIcon[level as MessageLevel] },
    {
      key: 'Title',
      value: title,
    },
    {
      key: 'Message',
      value: message,
    },
    req.headers.referer
      ? {
          key: 'Referer',
          value: URL.canParse(req.headers.referer)
            ? new URL(req.headers.referer).pathname
            : req.headers.referer,
        }
      : null,
    userIdentifier && { key: 'User Identifier', value: userIdentifier },
    user?.email && { key: 'Email', value: user?.email },
    user?.id && { key: 'User ID', value: user?.id },
    {
      key: 'SHA',
      value: `${sha} (C) ${
        process.env.VERCEL_GIT_COMMIT_SHA
          ? process.env.VERCEL_GIT_COMMIT_SHA.slice(0, 7)
          : '<nil>'
      } (S)`,
    },
    cookies.gfp && { key: 'GFP', value: cookies.gfp },
    cookies.country && { key: 'Country', value: cookies.country },
  ].flatMap((item) => (item != null ? [item] : []));

  const finalMessage = messageRows
    .map(({ key, value }) => key + ': ' + value)
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
