import path from 'node:path';

export const QUESTIONS_OUT_DIR_CODING = path.join(
  process.cwd(),
  'src',
  '__generated__',
  'questions',
  'coding',
);

export function getQuestionsListOutFilenameCoding(locale: string) {
  return path.join(QUESTIONS_OUT_DIR_CODING, `list.${locale}.json`);
}
