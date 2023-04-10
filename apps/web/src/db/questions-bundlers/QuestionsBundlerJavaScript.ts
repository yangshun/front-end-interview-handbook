import fs from 'fs';
import grayMatter from 'gray-matter';
import path from 'path';

import { readMDXFile } from './QuestionsBundler';
import {
  getQuestionSrcPathJavaScript,
  QUESTIONS_SRC_DIR_JAVASCRIPT,
} from './QuestionsBundlerJavaScriptConfig';
import { normalizeQuestionFrontMatter } from '../QuestionsUtils';
import type {
  QuestionJavaScript,
  QuestionMetadata,
} from '../../components/questions/common/QuestionsTypes';

async function readQuestionJavaScriptSkeleton(slug: string): Promise<string> {
  const questionPath = getQuestionSrcPathJavaScript(slug);
  const skeletonPath = path.join(questionPath, 'src', `${slug}.skeleton.js`);

  return fs.readFileSync(skeletonPath).toString().trim();
}

async function readQuestionJavaScriptTests(slug: string): Promise<string> {
  const questionPath = getQuestionSrcPathJavaScript(slug);

  const testPath = path.join(questionPath, 'src', `${slug}.test.js`);

  return fs.readFileSync(testPath).toString().trim();
}

async function readQuestionMetadataJavaScript(
  slug: string,
  locale = 'en-US',
): Promise<QuestionMetadata> {
  const questionPath = getQuestionSrcPathJavaScript(slug);

  // Read frontmatter from MDX file.
  const filePath = path.join(questionPath, 'description', `${locale}.mdx`);
  const source = fs.readFileSync(filePath).toString().trim();
  const { data: frontMatter } = grayMatter(source);

  // Read locale-agnostic metadata file.
  const metadataPath = path.join(questionPath, 'metadata.json');
  const metadataJSON = JSON.parse(String(fs.readFileSync(metadataPath)));

  // Combine them together.
  const metadata = normalizeQuestionFrontMatter(
    { ...frontMatter, ...metadataJSON },
    'javascript',
  );

  return metadata;
}

async function readQuestionMetadataWithFallbackJavaScript(
  slug: string,
  requestedLocale = 'en-US',
): Promise<{ loadedLocale: string; metadata: QuestionMetadata }> {
  let loadedLocale = requestedLocale;
  const metadata = await (async () => {
    try {
      return await readQuestionMetadataJavaScript(slug, requestedLocale);
    } catch {
      loadedLocale = 'en-US';

      return await readQuestionMetadataJavaScript(slug, loadedLocale);
    }
  })();

  return {
    loadedLocale,
    metadata,
  };
}

export async function readQuestionJavaScript(
  slug: string,
  locale = 'en-US',
): Promise<QuestionJavaScript> {
  const questionPath = getQuestionSrcPathJavaScript(slug);
  const [metadata, description, solution, skeleton, tests] = await Promise.all([
    readQuestionMetadataJavaScript(slug, locale),
    readMDXFile(path.join(questionPath, 'description', `${locale}.mdx`), {}),
    readMDXFile(path.join(questionPath, 'solution', `${locale}.mdx`), {}),
    readQuestionJavaScriptSkeleton(slug),
    readQuestionJavaScriptTests(slug),
  ]);

  return {
    description,
    format: 'javascript',
    metadata,
    skeleton,
    solution,
    tests,
  };
}

export async function readQuestionListMetadataJavaScript(
  locale = 'en-US',
): Promise<ReadonlyArray<QuestionMetadata>> {
  const directories = fs
    .readdirSync(QUESTIONS_SRC_DIR_JAVASCRIPT, {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isDirectory());

  const questions = await Promise.all(
    directories.map(async (dirent) => {
      const slug = dirent.name;

      const { metadata } = await readQuestionMetadataWithFallbackJavaScript(
        slug,
        locale,
      );

      return metadata;
    }),
  );

  return questions.filter(({ published }) => published);
}
