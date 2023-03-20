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
  password?: string;
  password_confirm?: string;
  username?: string;
}>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await runMiddleware(req, res, cors);

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const {
    username,
    email,
    password,
    password_confirm: passwordConfirm,
  }: FormBody = req.body;

  // Perform field validations.
  if (!username || username.length < 4 || !/^[a-zA-Z0-9]+$/.test(username)) {
    return res.status(422).json({
      message: 'Username is invalid',
    });
  }

  if (!email || !/.+@[^@]+\.[^@]{2,}$/.test(email)) {
    return res.status(422).json({
      message: 'Email is invalid',
    });
  }

  if (!password || password.length < 6) {
    return res.status(422).json({
      message: 'Password is invalid',
    });
  }

  if (password !== passwordConfirm) {
    return res.status(422).json({
      message: 'Passwords do not match',
    });
  }

  res.status(200).json({
    message: 'Signed up successfully!',
  });
}
