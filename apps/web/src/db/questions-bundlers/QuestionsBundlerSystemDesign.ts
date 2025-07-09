import fs from 'fs';
import grayMatter from 'gray-matter';
import path from 'path';

import type {
  QuestionMetadata,
  QuestionSystemDesign,
} from '~/components/interviews/questions/common/QuestionsTypes';

import { normalizeQuestionFrontMatter } from '../QuestionsUtils';
import { readMDXFile } from './QuestionsBundler';
import {
  getQuestionSrcPathSystemDesign,
  QUESTIONS_SRC_DIR_SYSTEM_DESIGN,
} from './QuestionsBundlerSystemDesignConfig';

async function readQuestionMetadataSystemDesign(
  slug: string,
  locale = 'en-US',
): Promise<QuestionMetadata> {
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

async function readQuestionMetadataWithFallbackSystemDesign(
  slug: string,
  requestedLocale = 'en-US',
): Promise<{ loadedLocale: string; metadata: QuestionMetadata }> {
  let loadedLocale = requestedLocale;
  const metadata = await (async () => {
    try {
      return await readQuestionMetadataSystemDesign(slug, requestedLocale);
    } catch {
      loadedLocale = 'en-US';

      return await readQuestionMetadataSystemDesign(slug, loadedLocale);
    }
  })();

  return {
    loadedLocale,
    metadata,
  };
}

export async function readQuestionSystemDesign(
  slug: string,
  locale = 'en-US',
): Promise<QuestionSystemDesign> {
  const questionPath = getQuestionSrcPathSystemDesign(slug);

  const [metadata, { code: description }, { code: solution }] =
    await Promise.all([
      readQuestionMetadataSystemDesign(slug, locale),
      readMDXFile(path.join(questionPath, 'description', `${locale}.mdx`), {}),
      readMDXFile(path.join(questionPath, 'solution', `${locale}.mdx`), {
        extractHeadings: true,
      }),
    ]);

  return {
    description,
    metadata,
    solution,
  };
}

export async function readQuestionListMetadataSystemDesign(
  locale = 'en-US',
): Promise<ReadonlyArray<QuestionMetadata>> {
  const directories = fs
    .readdirSync(QUESTIONS_SRC_DIR_SYSTEM_DESIGN, {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isDirectory() && !dirent.name.startsWith('__'));

  const questions = await Promise.all(
    directories.map(async (dirent) => {
      const slug = dirent.name;

      const { metadata } = await readQuestionMetadataWithFallbackSystemDesign(
        slug,
        locale,
      );

      return metadata;
    }),
  );

  return questions.filter(({ published }) => published);
}
