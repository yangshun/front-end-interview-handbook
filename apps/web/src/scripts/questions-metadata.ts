import fs from 'fs';
import path from 'path';

import { readQuestionListMetadataAlgo } from '~/db/questions-bundlers/QuestionsBundlerAlgo';
import { getQuestionsListOutFilenameAlgo } from '~/db/questions-bundlers/QuestionsBundlerAlgoConfig';

import type { InterviewsQuestionItemMinimal } from '../components/interviews/questions/common/QuestionsTypes';
import { getQuestionsListOutFilenameCoding } from '../db/questions-bundlers/QuestionsBundlerCodingConfig';
import { readQuestionListMetadataJavaScript } from '../db/questions-bundlers/QuestionsBundlerJavaScript';
import { getQuestionsListOutFilenameJavaScript } from '../db/questions-bundlers/QuestionsBundlerJavaScriptConfig';
import { readQuestionListMetadataQuiz } from '../db/questions-bundlers/QuestionsBundlerQuiz';
import { getQuestionsListOutFilenameQuiz } from '../db/questions-bundlers/QuestionsBundlerQuizConfig';
import { readQuestionListMetadataSystemDesign } from '../db/questions-bundlers/QuestionsBundlerSystemDesign';
import { getQuestionsListOutFilenameSystemDesign } from '../db/questions-bundlers/QuestionsBundlerSystemDesignConfig';
import { readQuestionListMetadataUserInterface } from '../db/questions-bundlers/QuestionsBundlerUserInterface';
import { getQuestionsListOutFilenameUserInterface } from '../db/questions-bundlers/QuestionsBundlerUserInterfaceConfig';

async function generateQuestionsMetadata(
  genFn: (
    locale_: string,
  ) => Promise<ReadonlyArray<InterviewsQuestionItemMinimal>>,
  outPath: string,
  locale = 'en-US',
) {
  const metadataList = await genFn(locale);
  const dir = path.dirname(outPath);

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(metadataList, null, 2));
}

async function codingQuestionsMetadata(outPath: string, locale = 'en-US') {
  const [algoQuestions, javaScriptQuestions, userInterfaceQuestions] =
    await Promise.all([
      readQuestionListMetadataAlgo(locale),
      readQuestionListMetadataJavaScript(locale),
      readQuestionListMetadataUserInterface(locale),
    ]);

  const combinedQuestions = [
    ...algoQuestions,
    ...javaScriptQuestions,
    ...userInterfaceQuestions,
  ].sort((a, b) => a.info.title.localeCompare(b.info.title));

  const dir = path.dirname(outPath);

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    outPath,
    JSON.stringify(
      combinedQuestions.filter((file) => file.metadata.published),
      null,
      2,
    ),
  );
}

async function generateQuizMetadata() {
  return await Promise.all(
    ['en-US', 'pt-BR', 'zh-CN'].map((locale) =>
      generateQuestionsMetadata(
        readQuestionListMetadataQuiz,
        getQuestionsListOutFilenameQuiz(locale),
        locale,
      ),
    ),
  );
}

const sourceLocale = 'en-US';
const locales = [sourceLocale, 'zh-CN'];

export async function generateAllMetadata() {
  return await Promise.all([
    generateQuizMetadata(),
    ...locales.map((locale) =>
      generateQuestionsMetadata(
        readQuestionListMetadataSystemDesign,
        getQuestionsListOutFilenameSystemDesign(locale),
        locale,
      ),
    ),
    ...locales.map((locale) =>
      generateQuestionsMetadata(
        readQuestionListMetadataAlgo,
        getQuestionsListOutFilenameAlgo(locale),
        locale,
      ),
    ),
    ...locales.map((locale) =>
      generateQuestionsMetadata(
        readQuestionListMetadataJavaScript,
        getQuestionsListOutFilenameJavaScript(locale),
        locale,
      ),
    ),
    ...locales.map((locale) =>
      generateQuestionsMetadata(
        readQuestionListMetadataUserInterface,
        getQuestionsListOutFilenameUserInterface(locale),
        locale,
      ),
    ),
    ...locales.map((locale) =>
      codingQuestionsMetadata(
        path.join(getQuestionsListOutFilenameCoding(locale)),
        locale,
      ),
    ),
  ]);
}
