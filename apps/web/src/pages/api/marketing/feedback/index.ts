import cookie from 'cookie';
import Cors from 'cors';
import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '~/server/prisma';
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await runMiddleware(req, res, cors);

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { message } = req.body;

  if (message.length < 10) {
    return res.status(422).json({
      message: 'Message must contain at least 10 characters.',
    });
  }

  const supabase = createServerSupabaseClientGFE({ req, res });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const cookies = cookie.parse(req.headers.cookie ?? '');

  const messageItem = await prisma.feedbackMessage.create({
    data: {
      message,
      metadata: {
        country: cookies.country,
        referer: req.headers.referer ?? null,
      },
      userEmail: user?.email,
    },
  });

  return res.status(200).json({
    feedbackId: messageItem.id,
  });
}
