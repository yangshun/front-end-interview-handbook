import path from 'path';

export const QUESTIONS_SRC_DIR_ALGO = path.join(
  process.cwd(),
  '..',
  '..',
  'packages',
  'questions',
  'algo',
);
export const QUESTIONS_OUT_DIR_ALGO = path.join(
  process.cwd(),
  'src',
  '__generated__',
  'questions',
  'algo',
);

export function getQuestionSrcPathAlgo(slug: string) {
  return path.join(QUESTIONS_SRC_DIR_ALGO, slug);
}
export function getQuestionOutPathAlgo(slug: string) {
  return path.join(QUESTIONS_OUT_DIR_ALGO, slug);
}
export function getQuestionsListOutFilenameAlgo(locale: string) {
  return path.join(QUESTIONS_OUT_DIR_ALGO, `list.${locale}.json`);
}
