import fs from 'fs';
import grayMatter from 'gray-matter';
import path from 'path';
import readingTime from 'reading-time';

import {
  basePath as behavioralInterviewPlaybookBasePath,
  BehavioralInterviewPlaybookPaths,
  behavioralInterviewPlaybookPathToFile,
} from '~/components/guides/books/BehavioralInterviewPlaybookNavigation';
import type { FrontEndInterviewPlaybookPathType } from '~/components/guides/books/FrontEndInterviewPlaybookNavigation';
import {
  basePath as frontEndInterviewPlaybookBasePath,
  FrontEndInterviewPlaybookPaths,
  frontEndInterviewPlaybookPathToFile,
} from '~/components/guides/books/FrontEndInterviewPlaybookNavigation';
import {
  basePath as frontEndSystemDesignPlaybookBasePath,
  FrontEndSystemDesignPlaybookPaths,
  frontEndSystemDesignPlaybookPathToFile,
} from '~/components/guides/books/FrontEndSystemDesignPlaybookNavigation';
import type { GuideCardMetadata } from '~/components/guides/types';

import type { GuidebookItem } from '@prisma/client';

export function readGuidesContents(
  directoryPath: string,
  locale = 'en-US',
): string {
  const fileContents = (() => {
    try {
      return fs.readFileSync(path.join(directoryPath, `${locale}.mdx`));
    } catch {
      // Fallback to English.
      return fs.readFileSync(path.join(directoryPath, `en-US.mdx`));
    }
  })();

  return fileContents.toString();
}

const guideDirectoryData = {
  BEHAVIORAL_INTERVIEW_PLAYBOOK: {
    guideDirectory: 'behavioral-interview-guidebook',
    pathToFile: behavioralInterviewPlaybookPathToFile,
  } as const,
  FRONT_END_INTERVIEW_PLAYBOOK: {
    guideDirectory: 'front-end-interview-guidebook',
    pathToFile: frontEndInterviewPlaybookPathToFile,
  } as const,
  FRONT_END_SYSTEM_DESIGN_PLAYBOOK: {
    guideDirectory: 'system-design',
    pathToFile: frontEndSystemDesignPlaybookPathToFile,
  } as const,
} as const;

export function guidesRequestToFilePath<T extends GuidebookItem>(
  guideBook: T,
  route: keyof (typeof guideDirectoryData)[T]['pathToFile'],
) {
  const { pathToFile, guideDirectory } = guideDirectoryData[guideBook];

  return path.join(
    process.cwd(),
    '..',
    '..',
    'submodules',
    'front-end-interview-handbook',
    'packages',
    guideDirectory,
    'contents',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore TODO: fix this
    pathToFile[route],
  );
}

// TODO(interviews): consolidate
export async function readFrontEndInterviewGuides(
  options?: Readonly<{
    locale?: string;
    slugs?: ReadonlyArray<FrontEndInterviewPlaybookPathType>;
  }>,
): Promise<ReadonlyArray<GuideCardMetadata>> {
  const { slugs, locale } = options ?? {};
  const book = 'FRONT_END_INTERVIEW_PLAYBOOK';

  return (slugs ?? FrontEndInterviewPlaybookPaths).map((slug) => {
    const directoryPath = guidesRequestToFilePath(book, slug);

    const mdxSource = readGuidesContents(directoryPath, locale);

    const { data } = grayMatter(mdxSource);
    const { description, title } = data;
    const time = Math.ceil(readingTime(mdxSource ?? '').minutes);

    return {
      book,
      description,
      href: `${frontEndInterviewPlaybookBasePath}/${slug}`,
      id: slug,
      readingTime: time,
      title,
    };
  });
}

export async function readAllFrontendSystemDesignGuides(
  locale: string,
): Promise<ReadonlyArray<GuideCardMetadata>> {
  const book = 'FRONT_END_SYSTEM_DESIGN_PLAYBOOK';

  return FrontEndSystemDesignPlaybookPaths.map((slug) => {
    const directoryPath = guidesRequestToFilePath(book, slug);
    const mdxSource = readGuidesContents(directoryPath, locale);

    const { data } = grayMatter(mdxSource);
    const { description, title } = data;
    const time = Math.ceil(readingTime(mdxSource ?? '').minutes);

    return {
      book,
      description,
      href: `${frontEndSystemDesignPlaybookBasePath}/${slug}`,
      id: slug,
      readingTime: time,
      title,
    };
  });
}

export async function readAllBehavioralGuides(
  locale: string,
): Promise<ReadonlyArray<GuideCardMetadata>> {
  const book = 'BEHAVIORAL_INTERVIEW_PLAYBOOK';

  return BehavioralInterviewPlaybookPaths.map((slug) => {
    const directoryPath = guidesRequestToFilePath(book, slug);
    const mdxSource = readGuidesContents(directoryPath, locale);

    const { data } = grayMatter(mdxSource);
    const { description, title } = data;
    const time = Math.ceil(readingTime(mdxSource ?? '').minutes);

    return {
      book,
      description,
      href: `${behavioralInterviewPlaybookBasePath}/${slug}`,
      id: slug,
      readingTime: time,
      title,
    };
  });
}
