import fs from 'fs';
import grayMatter from 'gray-matter';
import path from 'path';

import type {
  InterviewsQuestionInfo,
  InterviewsQuestionItemMinimal,
  InterviewsQuestionMetadata,
  QuestionSystemDesign,
} from '~/components/interviews/questions/common/QuestionsTypes';

import { readMDXFile } from './QuestionsBundler';
import {
  getQuestionSrcPathSystemDesign,
  QUESTIONS_SRC_DIR_SYSTEM_DESIGN,
} from './QuestionsBundlerSystemDesignConfig';
import { normalizeQuestionFrontMatter } from '../QuestionsUtils';

export async function readQuestionMetadataSystemDesign(
  slug: string,
): Promise<InterviewsQuestionMetadata> {
  const questionPath = getQuestionSrcPathSystemDesign(slug);
  const metadataPath = path.join(questionPath, 'metadata.json');
  const metadataJSON = JSON.parse(String(fs.readFileSync(metadataPath)));

  return normalizeQuestionFrontMatter(metadataJSON, 'system-design').metadata;
}

async function readQuestionInfoSystemDesign(
  slug: string,
  locale = 'en-US',
): Promise<InterviewsQuestionInfo> {
  const questionPath = getQuestionSrcPathSystemDesign(slug);

  // Read frontmatter from MDX file.
  const filePath = path.join(questionPath, 'description', `${locale}.mdx`);
  const source = fs.readFileSync(filePath).toString().trim();
  const { data: frontMatter } = grayMatter(source);

  return normalizeQuestionFrontMatter(frontMatter, 'system-design').info;
}

async function readQuestionItemSystemDesign(
  slug: string,
  locale = 'en-US',
): Promise<InterviewsQuestionItemMinimal> {
  const [metadata, info] = await Promise.all([
    readQuestionMetadataSystemDesign(slug),
    readQuestionInfoSystemDesign(slug, locale),
  ]);

  return {
    info,
    metadata,
  };
}

async function readQuestionMetadataWithFallbackSystemDesign(
  slug: string,
  requestedLocale = 'en-US',
): Promise<{ content: InterviewsQuestionItemMinimal; loadedLocale: string }> {
  let loadedLocale = requestedLocale;
  const content = await (async () => {
    try {
      return await readQuestionItemSystemDesign(slug, requestedLocale);
    } catch {
      loadedLocale = 'en-US';

      return await readQuestionItemSystemDesign(slug, loadedLocale);
    }
  })();

  return {
    content,
    loadedLocale,
  };
}

export async function readQuestionSystemDesign(
  slug: string,
  locale = 'en-US',
): Promise<Omit<QuestionSystemDesign, 'metadata'>> {
  const questionPath = getQuestionSrcPathSystemDesign(slug);

  const [info, description, solution] = await Promise.all([
    readQuestionInfoSystemDesign(slug, locale),
    readMDXFile(path.join(questionPath, 'description', `${locale}.mdx`), {}),
    readMDXFile(path.join(questionPath, 'solution', `${locale}.mdx`), {
      extractHeadings: true,
    }),
  ]);

  return {
    description,
    info,
    solution,
  };
}

export async function readQuestionListMetadataSystemDesign(
  locale = 'en-US',
): Promise<ReadonlyArray<InterviewsQuestionItemMinimal>> {
  const directories = fs
    .readdirSync(QUESTIONS_SRC_DIR_SYSTEM_DESIGN, {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isDirectory() && !dirent.name.startsWith('__'));

  const questions = await Promise.all(
    directories.map(async (dirent) => {
      const slug = dirent.name;

      const { content } = await readQuestionMetadataWithFallbackSystemDesign(
        slug,
        locale,
      );

      return content;
    }),
  );

  return questions.filter(({ metadata }) => metadata.published);
}
