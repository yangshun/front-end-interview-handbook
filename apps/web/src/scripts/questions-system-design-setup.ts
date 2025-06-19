import fs from 'fs';
import { globby } from 'globby';
import path, { parse } from 'path';

import { readQuestionSystemDesign } from '../db/questions-bundlers/QuestionsBundlerSystemDesign';
import {
  getQuestionOutPathSystemDesign,
  getQuestionSrcPathSystemDesign,
  QUESTIONS_SRC_DIR_SYSTEM_DESIGN,
} from '../db/questions-bundlers/QuestionsBundlerSystemDesignConfig';

async function generateSetupForQuestion(slug: string) {
  const questionPath = getQuestionSrcPathSystemDesign(slug);
  // This assumes that if the locale file is present for the description
  // it's also present for the solution.
  const locales = (
    await globby(path.join(questionPath, 'description', '*.mdx'))
  )
    // Files are named after their locales.
    .map((filePath) => parse(filePath).name);

  const outDir = getQuestionOutPathSystemDesign(slug);

  fs.mkdirSync(outDir, { recursive: true });
  await Promise.all(
    locales.map(async (locale) => {
      const content = await readQuestionSystemDesign(slug, locale);
      const outPath = path.join(outDir, `${locale}.json`);

      fs.writeFileSync(outPath, JSON.stringify(content, null, 2));
    }),
  );
}

export async function generateSystemDesignQuestionsSetup(): Promise<void> {
  const directories = fs
    .readdirSync(QUESTIONS_SRC_DIR_SYSTEM_DESIGN, {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isDirectory());

  await Promise.all(
    directories.map(
      async (dirent) => await generateSetupForQuestion(dirent.name),
    ),
  );
}
