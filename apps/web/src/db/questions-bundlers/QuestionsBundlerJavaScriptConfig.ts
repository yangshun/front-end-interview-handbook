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
export const QUESTIONS_OUT_DIR_JAVASCRIPT_V2 = path.join(
  process.cwd(),
  'src',
  '__generated__',
  'questions',
  'javascript-v2',
);

export function getQuestionSrcPathJavaScript(slug: string) {
  return path.join(QUESTIONS_SRC_DIR_JAVASCRIPT, slug);
}
export function getQuestionOutPathJavaScript(slug: string) {
  return path.join(QUESTIONS_OUT_DIR_JAVASCRIPT, slug);
}
export function getQuestionOutPathJavaScriptV2(slug: string) {
  return path.join(QUESTIONS_OUT_DIR_JAVASCRIPT_V2, slug);
}
export function getQuestionsListOutFilenameJavaScript(locale: string) {
  return path.join(QUESTIONS_OUT_DIR_JAVASCRIPT, `list.${locale}.json`);
}
