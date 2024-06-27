import fs from 'fs';
import grayMatter from 'gray-matter';
import path from 'path';

import type {
  QuestionMetadata,
  QuestionQuiz,
} from '~/components/interviews/questions/common/QuestionsTypes';

import { readMDXFile } from './QuestionsBundler';
import {
  getQuestionSrcPathQuizJavaScript,
  getQuestionSrcPathQuizNonJavaScript,
  QUESTIONS_SRC_DIR_QUIZ_JS,
  QUESTIONS_SRC_DIR_QUIZ_NON_JS,
} from './QuestionsBundlerQuizConfig';
import { normalizeQuestionFrontMatter } from '../QuestionsUtils';

async function readQuestionMetadataQuiz(
  questionPath: string,
  locale = 'en-US',
): Promise<QuestionMetadata> {
  // Read frontmatter from MDX file.
  const filePath = path.join(questionPath, `${locale}.mdx`);

  const source = fs.readFileSync(filePath).toString().trim();
  const { data: frontMatter } = grayMatter(source);

  // Read locale-agnostic metadata file.
  const metadataPath = path.join(questionPath, 'metadata.json');
  const metadataJSON = JSON.parse(String(fs.readFileSync(metadataPath)));
  // Combine them together.
  const metadata = normalizeQuestionFrontMatter(
    { ...frontMatter, ...metadataJSON },
    'quiz',
  );

  return metadata;
}

async function readQuestionMetadataWithFallbackQuiz(
  questionPath: string,
  requestedLocale = 'en-US',
): Promise<{ loadedLocale: string; metadata: QuestionMetadata }> {
  let loadedLocale = requestedLocale;
  const metadata = await (async () => {
    try {
      return await readQuestionMetadataQuiz(questionPath, requestedLocale);
    } catch {
      loadedLocale = 'en-US';

      return await readQuestionMetadataQuiz(questionPath, loadedLocale);
    }
  })();

  return {
    loadedLocale,
    metadata,
  };
}

export async function readQuestionQuiz(
  questionPath: string,
  locale = 'en-US',
): Promise<QuestionQuiz> {
  const [metadata, description] = await Promise.all([
    readQuestionMetadataQuiz(questionPath, locale),
    readMDXFile(path.join(questionPath, `${locale}.mdx`), {}),
  ]);

  return {
    description: null,
    format: 'quiz',
    metadata,
    solution: description,
  };
}

export async function readQuestionListMetadataQuiz(
  locale = 'en-US',
): Promise<ReadonlyArray<QuestionMetadata>> {
  // Non-JavaScript.
  const nonJavaScriptQuestionsDirectories = fs
    .readdirSync(QUESTIONS_SRC_DIR_QUIZ_NON_JS, {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isDirectory());

  const nonJavaScriptQuestions = await Promise.all(
    nonJavaScriptQuestionsDirectories.map(async (dirent) => {
      const slug = dirent.name;
      const questionPath = getQuestionSrcPathQuizNonJavaScript(slug);

      const { metadata } = await readQuestionMetadataWithFallbackQuiz(
        questionPath,
        locale,
      );

      return metadata;
    }),
  );

  // JavaScript.
  const javaScriptQuestionsDirectories = fs
    .readdirSync(QUESTIONS_SRC_DIR_QUIZ_JS, {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isDirectory());

  const javaScriptQuestions = await Promise.all(
    javaScriptQuestionsDirectories.map(async (dirent) => {
      const slug = dirent.name;
      const questionPath = getQuestionSrcPathQuizJavaScript(slug);

      const { metadata } = await readQuestionMetadataWithFallbackQuiz(
        questionPath,
        locale,
      );

      return metadata;
    }),
  );

  const questions = [...nonJavaScriptQuestions, ...javaScriptQuestions];

  return questions.filter(({ published }) => published);
}
