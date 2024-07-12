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
  otp?: string;
}>;

const VALID_OTP = '123456';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await runMiddleware(req, res, cors);

  if (req.method !== 'POST') {
    return res.status(405).send('Only POST requests allowed');
  }

  const { otp }: FormBody = req.body;

  if (otp !== VALID_OTP) {
    return res
      .status(403)
      .send(`Invalid OTP. The correct OTP is ${VALID_OTP} ;)`);
  }

  res.status(200).send('Successfully verified OTP!');
}
