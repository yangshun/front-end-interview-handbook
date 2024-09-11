import type { NextApiRequest, NextApiResponse } from 'next';
import { UAParser } from 'ua-parser-js';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const ua = req.headers['user-agent'];
  const parser = new UAParser(ua);

  return res.status(200).send(parser.getResult());
}
