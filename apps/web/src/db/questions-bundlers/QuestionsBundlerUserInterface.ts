import fs from 'fs';
import grayMatter from 'gray-matter';
import path from 'path';

import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';

import { normalizeQuestionFrontMatter } from '../QuestionsUtils';
import {
  getQuestionSrcPathUserInterface,
  QUESTIONS_SRC_DIR_USER_INTERFACE,
} from './QuestionsBundlerUserInterfaceConfig';

export async function readQuestionMetadataUserInterface(
  slug: string,
  _locale = 'en-US',
) {
  const questionPath = getQuestionSrcPathUserInterface(slug);

  // Read frontmatter from MDX file.
  const filePath = path.join(questionPath, `index.mdx`);
  const source = fs.readFileSync(filePath).toString().trim();
  const { data: frontMatter } = grayMatter(source);

  // Read locale-agnostic metadata file.
  // const metadataPath = path.join(questionPath, 'metadata.json');
  // const metadataJSON = JSON.parse(String(fs.readFileSync(metadataPath)));

  // Combine them together.
  const metadata = normalizeQuestionFrontMatter(frontMatter, 'user-interface');

  return metadata;
}

export async function readQuestionListMetadataUserInterface(
  locale = 'en-US',
): Promise<ReadonlyArray<QuestionMetadata>> {
  const directories = fs
    .readdirSync(QUESTIONS_SRC_DIR_USER_INTERFACE, {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isDirectory());

  const questions = await Promise.all(
    directories.map(async (dirent) => {
      const slug = dirent.name;

      return await readQuestionMetadataUserInterface(slug, locale);
    }),
  );

  return questions.filter(({ published }) => published);
}
