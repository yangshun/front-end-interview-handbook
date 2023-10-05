import Cors from 'cors';
import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '~/server/prisma';

const cors = Cors({
  methods: ['PUT'],
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
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Only PUT requests allowed' });
  }

  const { email } = req.body;

  if (!email || !/.+@[^@]+\.[^@]{2,}$/.test(email)) {
    return res.status(422).json({
      message: 'Email is invalid',
    });
  }

  await prisma.feedbackMessage.update({
    data: {
      email,
    },
    where: {
      id: req.query.feedbackId as string,
    },
  });

  return res.status(200).json({
    message: 'Message updated with email!',
  });
}
