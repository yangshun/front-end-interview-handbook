import fs from 'fs';
import { globby } from 'globby';
import path, { parse } from 'path';

import {
  readQuestionAlgo,
  readQuestionAlgoLocaleAgnostic,
} from '../db/questions-bundlers/QuestionsBundlerAlgo';
import {
  getQuestionOutPathAlgo,
  getQuestionOutPathAlgoLocaleContents,
  getQuestionSrcPathAlgo,
  QUESTIONS_SRC_DIR_ALGO,
} from '../db/questions-bundlers/QuestionsBundlerAlgoConfig';

async function generateSetupForQuestion(slug: string) {
  const questionPath = getQuestionSrcPathAlgo(slug);
  const globPattern = path.posix.join(
    // Globby only supports forward slashes.
    questionPath.replaceAll(path.sep, path.posix.sep),
    // Assume that if the locale file is present for the description
    // it's also present for the solution
    'description',
    '*.mdx',
  );

  const locales = (await globby(globPattern))
    // Files are named after their locales.
    .map((filePath) => parse(filePath).name);

  const { files, metadata, skeleton, workspace } =
    await readQuestionAlgoLocaleAgnostic(slug);

  const outDir = getQuestionOutPathAlgo(slug);
  const metadataPath = path.join(outDir, 'metadata.json');
  const setupPath = path.join(outDir, 'setup.json');

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
  fs.writeFileSync(
    setupPath,
    JSON.stringify(
      {
        files,
        skeleton,
        workspace,
      },
      null,
      2,
    ),
  );

  await Promise.all(
    locales.map(async (locale) => {
      const content = await readQuestionAlgo(slug, locale);
      const contentOutPath = getQuestionOutPathAlgoLocaleContents(slug, locale);

      fs.mkdirSync(path.dirname(contentOutPath), { recursive: true });
      fs.writeFileSync(contentOutPath, JSON.stringify(content, null, 2));
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
