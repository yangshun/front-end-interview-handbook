import Cors from 'cors';
import type { NextApiRequest, NextApiResponse } from 'next';

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

type FormBody = Readonly<{
  action: string;
}>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await runMiddleware(req, res, cors);

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { action }: FormBody = req.body;

  if (action !== 'like' && action !== 'unlike') {
    return res.status(422).send({
      message: 'Invalid action',
    });
  }

  const willFail = Math.random() > 0.5;

  if (willFail) {
    return res.status(500).json({
      message: `Error during attempted ${action}. Please try again later.`,
    });
  }

  return res.status(200).json({ message: 'Success!' });
}
