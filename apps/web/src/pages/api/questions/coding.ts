import type { NextApiRequest, NextApiResponse } from 'next/types';

import { fetchQuestionsListCoding } from '~/db/QuestionsListReader';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse,
) {
  const questions = await fetchQuestionsListCoding();

  return res.status(200).json(questions);
}
