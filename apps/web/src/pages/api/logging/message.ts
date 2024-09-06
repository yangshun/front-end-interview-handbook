import Cors from 'cors';
import type { NextApiRequest, NextApiResponse } from 'next';

import { currentExperiment } from '~/components/experiments';

import { gfeFingerprintName } from '~/logging/fingerprint';
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
    userIdentifier ? { key: 'User Identifier', value: userIdentifier } : null,
    user?.email ? { key: 'Email', value: user?.email } : null,
    user?.id ? { key: 'User ID', value: user?.id } : null,
    {
      key: 'SHA',
      value: `${sha} (C) ${
        process.env.VERCEL_GIT_COMMIT_SHA
          ? process.env.VERCEL_GIT_COMMIT_SHA.slice(0, 7)
          : '<nil>'
      } (S)`,
    },
    req.cookies[gfeFingerprintName]
      ? {
          key: 'GFP',
          value: req.cookies[gfeFingerprintName],
        }
      : null,
    req.cookies.country ? { key: 'Country', value: req.cookies.country } : null,
    currentExperiment.isRunning
      ? {
          key: 'Experiment',
          value: req.cookies[currentExperiment.name],
        }
      : null,
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
