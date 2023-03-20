import Cors from 'cors';
import type { NextApiRequest, NextApiResponse } from 'next';

import countriesList from './countriesList.json';

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

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Only GET requests allowed' });
  }

  const search = req.query.search as string;

  const countries = countriesList as unknown as ReadonlyArray<{
    code: string;
    name: string;
  }>;
  const matchingCountries = countries.filter(({ name }) =>
    name.toLowerCase().includes(search.toLowerCase()),
  );

  res.status(200).json({
    countries: matchingCountries,
  });
}
