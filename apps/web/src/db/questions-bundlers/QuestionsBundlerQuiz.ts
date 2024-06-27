import fs from 'fs';
import grayMatter from 'gray-matter';
import path from 'path';

import type {
  QuestionMetadata,
  QuestionQuiz,
} from '~/components/interviews/questions/common/QuestionsTypes';

import { readMDXFile } from './QuestionsBundler';
import {
  getQuestionSrcPathQuizNonJavaScript,
  QUESTIONS_SRC_DIR_QUIZ_NON_JS,
} from './QuestionsBundlerQuizConfig';
import { normalizeQuestionFrontMatter } from '../QuestionsUtils';

async function readQuestionMetadataQuiz(
  slug: string,
  locale = 'en-US',
): Promise<QuestionMetadata> {
  const questionPath = getQuestionSrcPathQuizNonJavaScript(slug);

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
  slug: string,
  requestedLocale = 'en-US',
): Promise<{ loadedLocale: string; metadata: QuestionMetadata }> {
  let loadedLocale = requestedLocale;
  const metadata = await (async () => {
    try {
      return await readQuestionMetadataQuiz(slug, requestedLocale);
    } catch {
      loadedLocale = 'en-US';

      return await readQuestionMetadataQuiz(slug, loadedLocale);
    }
  })();

  return {
    loadedLocale,
    metadata,
  };
}

export async function readQuestionQuiz(
  slug: string,
  questionPath: string,
  locale = 'en-US',
): Promise<QuestionQuiz> {
  const [metadata, description] = await Promise.all([
    readQuestionMetadataQuiz(slug, locale),
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
  const directories = fs
    .readdirSync(QUESTIONS_SRC_DIR_QUIZ_NON_JS, {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isDirectory());

  const questions = await Promise.all(
    directories.map(async (dirent) => {
      const slug = dirent.name;

      const { metadata } = await readQuestionMetadataWithFallbackQuiz(
        slug,
        locale,
      );

      return metadata;
    }),
  );

  return questions.filter(({ published }) => published);
}
