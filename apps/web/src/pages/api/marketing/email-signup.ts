import Cors from 'cors';
import type { NextApiRequest, NextApiResponse } from 'next';

import { createSupabaseAdminClientGFE } from '~/supabase/SupabaseServerGFE';

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

  const { email } = req.body;

  if (!email || !/.+@[^@]+\.[^@]{2,}$/.test(email)) {
    return res.status(422).json({
      message: 'Email is invalid',
    });
  }

  const supabaseAdmin = createSupabaseAdminClientGFE();

  const { data, error } = await supabaseAdmin
    .from('EmailSubscriber')
    .upsert({
      email,
    })
    .select();

  // Ignore duplicate key value constraints on email.
  if (
    error?.code !== '23505' &&
    (error != null || data == null || data.length === 0)
  ) {
    // TODO: Add logging.
    return res.status(500).json({ message: 'An error occurred' });
  }

  return res.status(200).json({ message: 'Subscribed successfully!' });
}
