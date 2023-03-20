import fs from 'fs';
import grayMatter from 'gray-matter';
import path from 'path';

import type {
  QuestionMetadata,
  QuestionQuiz,
  QuestionQuizTopic,
} from '~/components/questions/common/QuestionsTypes';

import { readMDXFile } from './QuestionsBundler';
import {
  getQuestionSrcPathQuiz,
  QUESTIONS_SRC_DIR_QUIZ,
} from './QuestionsBundlerQuizConfig';
import { normalizeQuestionFrontMatter } from '../QuestionsUtils';

async function readQuestionMetadataQuiz(slug: string, locale = 'en') {
  const questionPath = getQuestionSrcPathQuiz(slug);

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

  return {
    ...metadata,
    href: `/questions/${metadata.format}/${metadata.slug}`,
    subtitle: (frontMatter.subtitle as string | null) ?? null,
    topics: metadataJSON.topics as ReadonlyArray<QuestionQuizTopic>,
  };
}

export async function readQuestionQuiz(
  slug: string,
  locale = 'en',
): Promise<QuestionQuiz> {
  const questionPath = getQuestionSrcPathQuiz(slug);

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
  locale = 'en',
): Promise<ReadonlyArray<QuestionMetadata>> {
  const directories = fs
    .readdirSync(QUESTIONS_SRC_DIR_QUIZ, {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isDirectory());

  const questions = await Promise.all(
    directories.map(async (dirent) => {
      const slug = dirent.name;

      return await readQuestionMetadataQuiz(slug, locale);
    }),
  );

  return questions.filter(({ published }) => published);
}
