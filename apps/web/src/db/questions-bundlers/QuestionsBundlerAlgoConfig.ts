import path from 'path';

const format = 'algo';

export const QUESTIONS_SRC_DIR_ALGO = path.join(
  process.cwd(),
  '..',
  '..',
  'contents',
  'questions',
  format,
);

export const QUESTIONS_OUT_DIR_ALGO = path.join(
  process.cwd(),
  'src',
  '__generated__',
  'questions',
  format,
);

export function getQuestionSrcPathAlgo(slug: string) {
  return path.join(QUESTIONS_SRC_DIR_ALGO, slug);
}

export function getQuestionOutPathAlgo(slug: string) {
  return path.join(QUESTIONS_OUT_DIR_ALGO, slug);
}

export function getQuestionOutPathAlgoLocaleContents(
  slug: string,
  locale: string,
) {
  return path.join(getQuestionOutPathAlgo(slug), 'locales', `${locale}.json`);
}

export function getQuestionsListOutFilenameAlgo(locale: string) {
  return path.join(QUESTIONS_OUT_DIR_ALGO, `list.${locale}.json`);
}
