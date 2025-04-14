import path from 'path';

export const CHALLENGES_SOLUTIONS_SRC_DIR = path.join(
  process.cwd(),
  '..',
  '..',
  'contents',
  'projects',
  'challenges',
);
export const CHALLENGES_SOLUTIONS_OUT_DIR = path.join(
  process.cwd(),
  'src',
  '__generated__',
  'projects',
  'challenges',
);
export function getChallengeSolutionsSrcPath(slug: string) {
  return path.join(CHALLENGES_SOLUTIONS_SRC_DIR, slug);
}
export function getChallengeSolutionsOutPath(slug: string) {
  return path.join(CHALLENGES_SOLUTIONS_OUT_DIR, slug, 'solutions');
}
