import fs from 'fs';
import grayMatter from 'gray-matter';
import path from 'path';

import type {
  QuestionMetadata,
  QuestionSystemDesign,
} from '~/components/questions/common/QuestionsTypes';

import { readMDXFile } from './QuestionsBundler';
import {
  getQuestionSrcPathSystemDesign,
  QUESTIONS_SRC_DIR_SYSTEM_DESIGN,
} from './QuestionsBundlerSystemDesignConfig';
import { normalizeQuestionFrontMatter } from '../QuestionsUtils';

async function readQuestionMetadataSystemDesign(slug: string, locale = 'en') {
  const questionPath = getQuestionSrcPathSystemDesign(slug);

  // Read frontmatter from MDX file.
  const filePath = path.join(questionPath, 'description', `${locale}.mdx`);
  const source = fs.readFileSync(filePath).toString().trim();
  const { data: frontMatter } = grayMatter(source);

  // Read locale-agnostic metadata file.
  const metadataPath = path.join(questionPath, 'metadata.json');
  const metadataJSON = JSON.parse(String(fs.readFileSync(metadataPath)));

  // Combine them together.
  return normalizeQuestionFrontMatter(
    { ...frontMatter, ...metadataJSON },
    'system-design',
  );
}

export async function readQuestionSystemDesign(
  slug: string,
  locale = 'en',
): Promise<QuestionSystemDesign> {
  const questionPath = getQuestionSrcPathSystemDesign(slug);

  const [metadata, description, solution] = await Promise.all([
    readQuestionMetadataSystemDesign(slug, locale),
    readMDXFile(path.join(questionPath, 'description', `${locale}.mdx`), {}),
    readMDXFile(path.join(questionPath, 'solution', `${locale}.mdx`), {
      extractHeadings: true,
    }),
  ]);

  return {
    description,
    format: 'system-design',
    metadata,
    solution,
  };
}

export async function readQuestionListMetadataSystemDesign(
  locale = 'en',
): Promise<ReadonlyArray<QuestionMetadata>> {
  const directories = fs
    .readdirSync(QUESTIONS_SRC_DIR_SYSTEM_DESIGN, {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isDirectory());

  const questions = await Promise.all(
    directories.map(async (dirent) => {
      const slug = dirent.name;

      return await readQuestionMetadataSystemDesign(slug, locale);
    }),
  );

  return questions.filter(({ published }) => published);
}
