import fs from 'fs';
import { globby } from 'globby';
import path, { parse } from 'path';

import {
  readQuestionQuiz,
  readQuestionQuizLocaleAgnostic,
} from '../db/questions-bundlers/QuestionsBundlerQuiz';
import type { QuestionsQuizSourceConfig } from '../db/questions-bundlers/QuestionsBundlerQuizConfig';
import { getQuestionOutPathQuiz } from '../db/questions-bundlers/QuestionsBundlerQuizConfig';

async function generateSetupForQuestion(
  quizSourceConfig: QuestionsQuizSourceConfig,
  slug: string,
) {
  const questionPath = quizSourceConfig.questionsItemPath(slug);

  const locales = (await globby(path.join(questionPath, '*.mdx')))
    // Files are named after their locales.
    .map((filePath) => parse(filePath).name);

  const outDir = getQuestionOutPathQuiz(slug);

  fs.mkdirSync(outDir, { recursive: true });

  const { metadata } = await readQuestionQuizLocaleAgnostic(
    quizSourceConfig,
    slug,
  );
  const metadataPath = path.join(outDir, 'metadata.json');

  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));

  await Promise.all(
    locales.map(async (locale) => {
      const content = await readQuestionQuiz(quizSourceConfig, slug, locale);
      const outPath = path.join(outDir, `${locale}.json`);

      fs.writeFileSync(outPath, JSON.stringify(content, null, 2));
    }),
  );
}

export async function generateQuizQuestionsSetup(
  quizSourceConfig: QuestionsQuizSourceConfig,
): Promise<void> {
  const directories = fs
    .readdirSync(quizSourceConfig.questionsListPath, {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isDirectory());

  await Promise.all(
    directories.map(
      async (dirent) =>
        await generateSetupForQuestion(quizSourceConfig, dirent.name),
    ),
  );
}
