import fs from 'fs';
import glob from 'glob';
import path, { parse } from 'path';

import { readQuestionQuiz } from '../db/questions-bundlers/QuestionsBundlerQuiz';
import {
  getQuestionOutPathQuiz,
  getQuestionSrcPathQuiz,
  QUESTIONS_SRC_DIR_QUIZ,
} from '../db/questions-bundlers/QuestionsBundlerQuizConfig';

async function generateSetupForQuestion(slug: string) {
  const questionPath = getQuestionSrcPathQuiz(slug);
  const locales = glob
    .sync(path.join(questionPath, '*.mdx'))
    // Files are named after their locales.
    .map((filePath) => parse(filePath).name);

  const outDir = getQuestionOutPathQuiz(slug);

  fs.mkdirSync(outDir, { recursive: true });
  await Promise.all(
    locales.map(async (locale) => {
      const content = await readQuestionQuiz(slug, locale);
      const outPath = path.join(outDir, `${locale}.json`);

      fs.writeFileSync(outPath, JSON.stringify(content, null, 2));
    }),
  );
}

export async function generateQuizQuestionsSetup(): Promise<void> {
  const directories = fs
    .readdirSync(QUESTIONS_SRC_DIR_QUIZ, {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isDirectory());

  await Promise.all(
    directories.map(
      async (dirent) => await generateSetupForQuestion(dirent.name),
    ),
  );
}
