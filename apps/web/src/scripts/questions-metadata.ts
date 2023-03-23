import fs from 'fs';
import path from 'path';

import type { QuestionMetadata } from '../components/questions/common/QuestionsTypes';
import { readQuestionListMetadataJavaScript } from '../db/questions-bundlers/QuestionsBundlerJavaScript';
import { getQuestionsListOutFilenameJavaScript } from '../db/questions-bundlers/QuestionsBundlerJavaScriptConfig';
import { readQuestionListMetadataQuiz } from '../db/questions-bundlers/QuestionsBundlerQuiz';
import { getQuestionsListOutFilenameQuiz } from '../db/questions-bundlers/QuestionsBundlerQuizConfig';
import { readQuestionListMetadataSystemDesign } from '../db/questions-bundlers/QuestionsBundlerSystemDesign';
import { getQuestionsListOutFilenameSystemDesign } from '../db/questions-bundlers/QuestionsBundlerSystemDesignConfig';
import { readQuestionListMetadataUserInterface } from '../db/questions-bundlers/QuestionsBundlerUserInterface';
import { QUESTIONS_LIST_OUT_DIR_USER_INTERFACE } from '../db/questions-bundlers/QuestionsBundlerUserInterfaceConfig';

async function generateQuestionsMetadata(
  genFn: (locale_: string) => Promise<ReadonlyArray<QuestionMetadata>>,
  outPath: string,
  locale = 'en',
) {
  const metadataList = await genFn(locale);
  const dir = path.dirname(outPath);

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(metadataList, null, 2));
}

async function codingQuestionsMetadata(outPath: string, locale = 'en') {
  const [javaScriptQuestions, userInterfaceQuestions] = await Promise.all([
    readQuestionListMetadataJavaScript(locale),
    readQuestionListMetadataUserInterface(locale),
  ]);

  const combinedQuestions = [
    ...javaScriptQuestions,
    ...userInterfaceQuestions,
  ].sort((a, b) => a.title.localeCompare(b.title));

  const dir = path.dirname(outPath);

  fs.mkdirSync(dir, { recursive: true });

  fs.writeFileSync(
    path.join(path.join(process.cwd(), outPath)),
    JSON.stringify(
      combinedQuestions.filter((file) => file.published),
      null,
      2,
    ),
  );
}

export async function generateAllMetadata() {
  const locale = 'en';

  return await Promise.all([
    generateQuestionsMetadata(
      readQuestionListMetadataQuiz,
      getQuestionsListOutFilenameQuiz(locale),
      locale,
    ),
    generateQuestionsMetadata(
      readQuestionListMetadataSystemDesign,
      getQuestionsListOutFilenameSystemDesign(locale),
      locale,
    ),
    generateQuestionsMetadata(
      readQuestionListMetadataJavaScript,
      getQuestionsListOutFilenameJavaScript(locale),
      locale,
    ),
    generateQuestionsMetadata(
      readQuestionListMetadataUserInterface,
      QUESTIONS_LIST_OUT_DIR_USER_INTERFACE,
      locale,
    ),
    codingQuestionsMetadata(
      path.join(
        'src',
        '__generated__',
        'questions',
        'coding',
        `list.${locale}.json`,
      ),
      locale,
    ),
  ]);
}
