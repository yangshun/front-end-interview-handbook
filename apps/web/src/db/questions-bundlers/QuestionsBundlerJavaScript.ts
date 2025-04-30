import fs from 'fs';
import { globby } from 'globby';
import grayMatter from 'gray-matter';
import path from 'path';

import { readMDXFile } from './QuestionsBundler';
import {
  getQuestionSrcPathJavaScript,
  QUESTIONS_SRC_DIR_JAVASCRIPT,
} from './QuestionsBundlerJavaScriptConfig';
import { normalizeQuestionFrontMatter } from '../QuestionsUtils';
import type {
  InterviewsQuestionInfo,
  InterviewsQuestionItemJavaScript,
  InterviewsQuestionItemMinimal,
  InterviewsQuestionMetadata,
  QuestionCodingWorkingLanguage,
} from '../../components/interviews/questions/common/QuestionsTypes';

async function readQuestionJavaScriptSkeleton(
  slug: string,
  language: QuestionCodingWorkingLanguage,
): Promise<string> {
  const questionPath = getQuestionSrcPathJavaScript(slug);
  const gfeConfig = await readQuestionJavaScriptGFEConfig(slug);
  const skeletonPath = path.join(
    questionPath,
    'setup',
    gfeConfig.skeleton[language],
  );

  return fs.readFileSync(skeletonPath).toString().trim();
}

async function readQuestionMetadataJavaScript(
  slug: string,
): Promise<InterviewsQuestionMetadata> {
  const questionPath = getQuestionSrcPathJavaScript(slug);
  const metadataPath = path.join(questionPath, 'metadata.json');
  const metadataJSON = JSON.parse(String(fs.readFileSync(metadataPath)));

  return normalizeQuestionFrontMatter(metadataJSON, 'javascript').metadata;
}

async function readQuestionInfoJavaScript(
  slug: string,
  locale = 'en-US',
): Promise<InterviewsQuestionInfo> {
  const questionPath = getQuestionSrcPathJavaScript(slug);

  // Read frontmatter from MDX file.
  const filePath = path.join(questionPath, 'description', `${locale}.mdx`);
  const source = fs.readFileSync(filePath).toString().trim();
  const { data: frontMatter } = grayMatter(source);

  return normalizeQuestionFrontMatter(frontMatter, 'javascript').info;
}

async function readQuestionItemJavaScript(
  slug: string,
  locale = 'en-US',
): Promise<InterviewsQuestionItemMinimal> {
  const [metadata, info] = await Promise.all([
    readQuestionMetadataJavaScript(slug),
    readQuestionInfoJavaScript(slug, locale),
  ]);

  return {
    info,
    metadata,
  };
}

async function readQuestionMetadataWithFallbackJavaScript(
  slug: string,
  requestedLocale = 'en-US',
): Promise<{ content: InterviewsQuestionItemMinimal; loadedLocale: string }> {
  let loadedLocale = requestedLocale;
  const content = await (async () => {
    try {
      return await readQuestionItemJavaScript(slug, requestedLocale);
    } catch {
      loadedLocale = 'en-US';

      return await readQuestionItemJavaScript(slug, loadedLocale);
    }
  })();

  return {
    content,
    loadedLocale,
  };
}

async function readQuestionJavaScriptFiles(
  slug: string,
): Promise<Record<string, string>> {
  const questionPath = getQuestionSrcPathJavaScript(slug);
  const [workspace, gfeConfig] = await Promise.all([
    readQuestionJavaScriptWorkspaceConfig(slug),
    readQuestionJavaScriptGFEConfig(slug),
  ]);
  const setupPath = path.join(questionPath, 'setup');

  const files = // Globby only supports forward slashes.
    (
      await globby(path.posix.join('**', '*'), {
        cwd: setupPath,
        ignore: [
          'README.md',
          'node_modules',
          'greatfrontend.json',
          gfeConfig.skeleton.js.replace(/^\//, ''),
          gfeConfig.skeleton.ts.replace(/^\//, ''),
        ],
      })
    ).map((filePath) => path.posix.sep + filePath);

  const compulsoryFiles = [workspace.main, workspace.run, workspace.submit];

  compulsoryFiles.forEach((filePath) => {
    if (!files.includes(filePath)) {
      throw `"${filePath}" not found for JavaScript question "${slug}"`;
    }
  });

  const filteredFiles = files.filter(
    (filePath) =>
      !filePath.includes('/src') || compulsoryFiles.includes(filePath),
  );

  return filteredFiles
    .map((filePath) => ({
      contents: fs.readFileSync(path.join(setupPath, filePath)).toString(),
      filePath,
    }))
    .reduce(
      (prev, { filePath, contents }) => ({
        ...prev,
        [filePath]: contents,
      }),
      {},
    );
}

async function readQuestionJavaScriptGFEConfig(slug: string): Promise<
  Readonly<{
    run: string;
    skeleton: Readonly<{
      js: string;
      ts: string;
    }>;
    submit: string;
  }>
> {
  const questionPath = getQuestionSrcPathJavaScript(slug);

  return JSON.parse(
    fs
      .readFileSync(path.join(questionPath, 'setup', 'greatfrontend.json'))
      .toString(),
  );
}

async function readQuestionJavaScriptWorkspaceConfig(slug: string): Promise<
  Readonly<{
    main: string;
    run: string;
    submit: string;
  }>
> {
  const questionPath = getQuestionSrcPathJavaScript(slug);
  const questionGFEConfig = await readQuestionJavaScriptGFEConfig(slug);
  const pkgJSON = JSON.parse(
    fs
      .readFileSync(path.join(questionPath, 'setup', 'package.json'))
      .toString(),
  );

  return {
    main: pkgJSON.main,
    run: questionGFEConfig.run,
    submit: questionGFEConfig.submit,
  };
}

export async function readQuestionJavaScriptLocaleAgnostic(
  slug: string,
): Promise<
  Omit<InterviewsQuestionItemJavaScript, 'description' | 'info' | 'solution'>
> {
  const [metadata, skeletonJS, skeletonTS, files, workspace] =
    await Promise.all([
      readQuestionMetadataJavaScript(slug),
      readQuestionJavaScriptSkeleton(slug, 'js'),
      readQuestionJavaScriptSkeleton(slug, 'ts'),
      readQuestionJavaScriptFiles(slug),
      readQuestionJavaScriptWorkspaceConfig(slug),
    ]);

  return {
    files,
    metadata,
    skeleton: {
      js: skeletonJS,
      ts: skeletonTS,
    },
    workspace,
  };
}

export async function readQuestionJavaScript(
  slug: string,
  locale = 'en-US',
): Promise<
  Pick<InterviewsQuestionItemJavaScript, 'description' | 'info' | 'solution'>
> {
  const questionPath = getQuestionSrcPathJavaScript(slug);
  const [info, description, solution] = await Promise.all([
    readQuestionInfoJavaScript(slug, locale),
    readMDXFile(path.join(questionPath, 'description', `${locale}.mdx`), {}),
    readMDXFile(path.join(questionPath, 'solution', `${locale}.mdx`), {}),
  ]);

  return {
    description,
    info,
    solution,
  };
}

export async function readQuestionListMetadataJavaScript(
  locale = 'en-US',
): Promise<ReadonlyArray<InterviewsQuestionItemMinimal>> {
  const directories = fs
    .readdirSync(QUESTIONS_SRC_DIR_JAVASCRIPT, {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isDirectory());

  const questions = await Promise.all(
    directories.map(async (dirent) => {
      const slug = dirent.name;

      const { content } = await readQuestionMetadataWithFallbackJavaScript(
        slug,
        locale,
      );

      return content;
    }),
  );

  return questions.filter(({ metadata }) => metadata.published);
}
