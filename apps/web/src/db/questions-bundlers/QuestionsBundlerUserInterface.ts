import fs from 'fs';
import grayMatter from 'gray-matter';
import path from 'path';

import type {
  InterviewsQuestionInfo,
  InterviewsQuestionItemMinimal,
  InterviewsQuestionMetadata,
} from '~/components/interviews/questions/common/QuestionsTypes';

import {
  getQuestionSrcPathUserInterface,
  QUESTIONS_SRC_DIR_USER_INTERFACE,
} from './QuestionsBundlerUserInterfaceConfig';
import { normalizeQuestionFrontMatter } from '../QuestionsUtils';

export async function readQuestionMetadataUserInterface(
  slug: string,
): Promise<InterviewsQuestionMetadata> {
  const questionPath = getQuestionSrcPathUserInterface(slug);
  const metadataPath = path.join(questionPath, 'metadata.json');
  const metadataJSON = JSON.parse(String(fs.readFileSync(metadataPath)));

  return normalizeQuestionFrontMatter(metadataJSON, 'user-interface').metadata;
}

export async function readQuestionInfoUserInterface(
  slug: string,
  _locale = 'en-US',
): Promise<InterviewsQuestionInfo> {
  const questionPath = getQuestionSrcPathUserInterface(slug);

  // Read frontmatter from MDX file.
  const filePath = path.join(questionPath, _locale, `index.mdx`);
  const source = fs.readFileSync(filePath).toString().trim();
  const { data: frontMatter } = grayMatter(source);

  return normalizeQuestionFrontMatter(frontMatter, 'user-interface').info;
}

async function readQuestionItemUserInterface(
  slug: string,
  locale = 'en-US',
): Promise<InterviewsQuestionItemMinimal> {
  const [metadata, info] = await Promise.all([
    readQuestionMetadataUserInterface(slug),
    readQuestionInfoUserInterface(slug, locale),
  ]);

  return {
    info,
    metadata,
  };
}

async function readQuestionMetadataWithFallbackUserInterface(
  slug: string,
  requestedLocale = 'en-US',
): Promise<{ content: InterviewsQuestionItemMinimal; loadedLocale: string }> {
  let loadedLocale = requestedLocale;
  const content = await (async () => {
    try {
      return await readQuestionItemUserInterface(slug, requestedLocale);
    } catch {
      loadedLocale = 'en-US';

      return await readQuestionItemUserInterface(slug, loadedLocale);
    }
  })();

  return {
    content,
    loadedLocale,
  };
}

export async function readQuestionListMetadataUserInterface(
  locale = 'en-US',
): Promise<ReadonlyArray<InterviewsQuestionItemMinimal>> {
  const directories = fs
    .readdirSync(QUESTIONS_SRC_DIR_USER_INTERFACE, {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isDirectory());

  const questions = await Promise.all(
    directories.map(async (dirent) => {
      const slug = dirent.name;

      const { content } = await readQuestionMetadataWithFallbackUserInterface(
        slug,
        locale,
      );

      return content;
    }),
  );

  return questions.filter(({ metadata }) => metadata.published);
}
