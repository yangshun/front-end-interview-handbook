import path from 'path';

export const QUESTIONS_SRC_DIR_JAVASCRIPT = path.join(
  process.cwd(),
  '..',
  '..',
  'packages',
  'questions',
  'javascript',
);
export const QUESTIONS_OUT_DIR_JAVASCRIPT = path.join(
  process.cwd(),
  'src',
  '__generated__',
  'questions',
  'javascript',
);

export function getQuestionSrcPathJavaScript(slug: string) {
  return path.join(QUESTIONS_SRC_DIR_JAVASCRIPT, slug);
}
export function getQuestionOutPathJavaScript(slug: string) {
  return path.join(QUESTIONS_OUT_DIR_JAVASCRIPT, slug);
}
export function getQuestionsListOutFilenameJavaScript(locale: string) {
  return path.join(QUESTIONS_OUT_DIR_JAVASCRIPT, `list.${locale}.json`);
}
