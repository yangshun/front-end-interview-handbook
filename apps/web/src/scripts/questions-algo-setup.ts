import fs from 'fs';
import { globby } from 'globby';
import path, { parse } from 'path';

import { readQuestionAlgo } from '../db/questions-bundlers/QuestionsBundlerAlgo';
import {
  getQuestionOutPathAlgo,
  getQuestionSrcPathAlgo,
  QUESTIONS_SRC_DIR_ALGO,
} from '../db/questions-bundlers/QuestionsBundlerAlgoConfig';

async function generateSetupForQuestion(slug: string) {
  const questionPath = getQuestionSrcPathAlgo(slug);
  // This assumes that if the locale file is present for the description
  // it's also present for the solution.

  const globPattern = path.posix.join(
    // Globby only supports forward slashes.
    questionPath.replaceAll(path.sep, path.posix.sep),
    'description',
    '*.mdx',
  );

  const locales = (await globby(globPattern))
    // Files are named after their locales.
    .map((filePath) => parse(filePath).name);

  const outDir = getQuestionOutPathAlgo(slug);

  fs.mkdirSync(outDir, { recursive: true });

  await Promise.all(
    locales.map(async (locale) => {
      const content = await readQuestionAlgo(slug);
      const outPath = path.join(outDir, `${locale}.json`);

      fs.writeFileSync(outPath, JSON.stringify(content, null, 2));
    }),
  );
}

export async function generateAlgoQuestionsSetup(): Promise<void> {
  const directories = fs
    .readdirSync(QUESTIONS_SRC_DIR_ALGO, {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isDirectory());

  await Promise.all(
    directories.map(async (dirent) => {
      await generateSetupForQuestion(dirent.name);
    }),
  );
}
