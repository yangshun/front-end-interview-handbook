import fs from 'fs';
import { globby } from 'globby';
import grayMatter from 'gray-matter';
import path from 'path';

import { readMDXFile } from './QuestionsBundler';
import {
  getQuestionSrcPathAlgo,
  QUESTIONS_SRC_DIR_ALGO,
} from './QuestionsBundlerAlgoConfig';
import { normalizeQuestionFrontMatter } from '../QuestionsUtils';
import type {
  InterviewsQuestionInfo,
  InterviewsQuestionItemJavaScript,
  InterviewsQuestionItemMinimal,
  InterviewsQuestionMetadata,
  QuestionCodingWorkingLanguage,
} from '../../components/interviews/questions/common/QuestionsTypes';

async function readQuestionAlgoSkeleton(
  slug: string,
  language: QuestionCodingWorkingLanguage,
): Promise<string> {
  const questionPath = getQuestionSrcPathAlgo(slug);
  const gfeConfig = await readQuestionAlgoGFEConfig(slug);
  const skeletonPath = path.join(
    questionPath,
    'setup',
    gfeConfig.skeleton[language],
  );

  return fs.readFileSync(skeletonPath).toString().trim();
}

async function readQuestionMetadataAlgo(
  slug: string,
): Promise<InterviewsQuestionMetadata> {
  const questionPath = getQuestionSrcPathAlgo(slug);
  const metadataPath = path.join(questionPath, 'metadata.json');
  const metadataJSON = JSON.parse(String(fs.readFileSync(metadataPath)));

  return normalizeQuestionFrontMatter(metadataJSON, 'algo').metadata;
}

async function readQuestionInfoAlgo(
  slug: string,
  locale = 'en-US',
): Promise<InterviewsQuestionInfo> {
  const questionPath = getQuestionSrcPathAlgo(slug);

  // Read frontmatter from MDX file.
  const filePath = path.join(questionPath, 'description', `${locale}.mdx`);
  const source = fs.readFileSync(filePath).toString().trim();
  const { data: frontMatter } = grayMatter(source);

  return normalizeQuestionFrontMatter(frontMatter, 'algo').info;
}

async function readQuestionItemAlgo(
  slug: string,
  locale = 'en-US',
): Promise<InterviewsQuestionItemMinimal> {
  const [metadata, info] = await Promise.all([
    readQuestionMetadataAlgo(slug),
    readQuestionInfoAlgo(slug, locale),
  ]);

  return {
    info,
    metadata,
  };
}

async function readQuestionMetadataWithFallbackAlgo(
  slug: string,
  requestedLocale = 'en-US',
): Promise<{ content: InterviewsQuestionItemMinimal; loadedLocale: string }> {
  let loadedLocale = requestedLocale;
  const content = await (async () => {
    try {
      return await readQuestionItemAlgo(slug, requestedLocale);
    } catch {
      loadedLocale = 'en-US';

      return await readQuestionItemAlgo(slug, loadedLocale);
    }
  })();

  return {
    content,
    loadedLocale,
  };
}

async function readQuestionAlgoFiles(
  slug: string,
): Promise<Record<string, string>> {
  const questionPath = getQuestionSrcPathAlgo(slug);
  const [workspace, gfeConfig] = await Promise.all([
    readQuestionAlgoWorkspaceConfig(slug),
    readQuestionAlgoGFEConfig(slug),
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
      throw `"${filePath}" not found for algo question "${slug}"`;
    }
  });

  const filteredFiles = files.filter(
    (filePath) =>
      !filePath.includes('/src') ||
      compulsoryFiles.includes(filePath) ||
      filePath.endsWith('.tests.json'),
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

async function readQuestionAlgoGFEConfig(slug: string): Promise<
  Readonly<{
    run: string;
    skeleton: Readonly<{
      js: string;
      ts: string;
    }>;
    submit: string;
  }>
> {
  const questionPath = getQuestionSrcPathAlgo(slug);

  return JSON.parse(
    fs
      .readFileSync(path.join(questionPath, 'setup', 'greatfrontend.json'))
      .toString(),
  );
}

async function readQuestionAlgoWorkspaceConfig(slug: string): Promise<
  Readonly<{
    main: string;
    run: string;
    submit: string;
  }>
> {
  const questionPath = getQuestionSrcPathAlgo(slug);
  const questionGFEConfig = await readQuestionAlgoGFEConfig(slug);
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

export async function readQuestionAlgoLocaleAgnostic(
  slug: string,
): Promise<
  Omit<InterviewsQuestionItemJavaScript, 'description' | 'info' | 'solution'>
> {
  const [metadata, skeletonJS, skeletonTS, files, workspace] =
    await Promise.all([
      readQuestionMetadataAlgo(slug),
      readQuestionAlgoSkeleton(slug, 'js'),
      readQuestionAlgoSkeleton(slug, 'ts'),
      readQuestionAlgoFiles(slug),
      readQuestionAlgoWorkspaceConfig(slug),
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

export async function readQuestionAlgo(
  slug: string,
  locale = 'en-US',
): Promise<
  Pick<InterviewsQuestionItemJavaScript, 'description' | 'info' | 'solution'>
> {
  const questionPath = getQuestionSrcPathAlgo(slug);
  const [info, description, solution] = await Promise.all([
    readQuestionInfoAlgo(slug, locale),
    readMDXFile(path.join(questionPath, 'description', `${locale}.mdx`), {}),
    readMDXFile(path.join(questionPath, 'solution', `${locale}.mdx`), {}),
  ]);

  return {
    description,
    info,
    solution,
  };
}

export async function readQuestionListMetadataAlgo(
  locale = 'en-US',
): Promise<ReadonlyArray<InterviewsQuestionItemMinimal>> {
  const directories = fs
    .readdirSync(QUESTIONS_SRC_DIR_ALGO, {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isDirectory());

  const questions = await Promise.all(
    directories.map(async (dirent) => {
      const slug = dirent.name;

      const { content } = await readQuestionMetadataWithFallbackAlgo(
        slug,
        locale,
      );

      return content;
    }),
  );

  return questions.filter(({ metadata }) => metadata.published);
}
