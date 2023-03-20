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
  email?: string;
  message?: string;
  name?: string;
}>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await runMiddleware(req, res, cors);

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { name, email, message }: FormBody = req.body;

  // Perform simple field validations, as long as they are not empty.
  if (!name) {
    return res.status(422).send('Name cannot be empty');
  }

  if (!email) {
    return res.status(422).send('Email cannot be empty');
  }

  if (!message) {
    return res.status(422).send('Message cannot be empty');
  }

  res
    .status(200)
    .send(`Thank you ${name}, your message was received successfully!`);
}
