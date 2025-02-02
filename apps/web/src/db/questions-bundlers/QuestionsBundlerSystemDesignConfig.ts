import path from 'path';

const format = 'system-design';

export const QUESTIONS_SRC_DIR_SYSTEM_DESIGN = path.join(
  process.cwd(),
  '..',
  '..',
  'packages',
  'questions',
  format,
);
export const QUESTIONS_OUT_DIR_SYSTEM_DESIGN = path.join(
  process.cwd(),
  'src',
  '__generated__',
  'questions',
  format,
);

export function getQuestionSrcPathSystemDesign(slug: string) {
  return path.join(QUESTIONS_SRC_DIR_SYSTEM_DESIGN, slug);
}
export function getQuestionOutPathSystemDesign(slug: string) {
  return path.join(QUESTIONS_OUT_DIR_SYSTEM_DESIGN, slug);
}
export function getQuestionsListOutFilenameSystemDesign(locale: string) {
  return path.join(QUESTIONS_OUT_DIR_SYSTEM_DESIGN, `list.${locale}.json`);
}
