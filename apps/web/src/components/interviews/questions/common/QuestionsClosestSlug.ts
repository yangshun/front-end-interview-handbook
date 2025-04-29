import Fuse from 'fuse.js';

import type { InterviewsQuestionItemMinimal } from './QuestionsTypes';

export async function questionsFindClosestToSlug(
  questions: ReadonlyArray<InterviewsQuestionItemMinimal>,
  querySlug: string,
) {
  const questionSlugs = questions.map((qn) => ({
    ...qn,
    searchable: qn.metadata.slug.replace(/-/g, ' '),
  }));

  const fuse = new Fuse(questionSlugs, {
    keys: ['searchable'],
    threshold: 0.5,
  });

  const query = querySlug.replace(/-/g, ' ');
  const matches = fuse.search(query);

  return matches.length === 0 ? null : matches[0].item;
}
