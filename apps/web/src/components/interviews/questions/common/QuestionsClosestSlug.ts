import Fuse from 'fuse.js';

import type { QuestionMetadata } from './QuestionsTypes';

export async function questionsFindClosestToSlug(
  questions: ReadonlyArray<QuestionMetadata>,
  querySlug: string,
) {
  const questionSlugs = questions.map((qn) => ({
    ...qn,
    searchable: qn.slug.replace(/-/g, ' '),
  }));

  const fuse = new Fuse(questionSlugs, {
    keys: ['searchable'],
    threshold: 0.5,
  });

  const query = querySlug.replace(/-/g, ' ');
  const matches = fuse.search(query);

  return matches.length === 0 ? null : matches[0].item;
}
