import type { GuidebookItem } from '@prisma/client';
import fs from 'fs';
import grayMatter from 'gray-matter';
import path from 'path';
import readingTime from 'reading-time';

import {
  basePath as behavioralInterviewPlaybookBasePath,
  BehavioralInterviewPlaybookPaths,
  BehavioralInterviewPlaybookPathToFile,
} from '~/components/guides/books/behavioral-interview-playbook/BehavioralInterviewPlaybookNavigation';
import type { FrontEndInterviewPlaybookPathType } from '~/components/guides/books/front-end-interview-playbook/FrontEndInterviewPlaybookNavigation';
import {
  basePath as frontEndInterviewPlaybookBasePath,
  FrontEndInterviewPlaybookPaths,
  FrontEndInterviewPlaybookPathToFile,
} from '~/components/guides/books/front-end-interview-playbook/FrontEndInterviewPlaybookNavigation';
import {
  basePath as frontEndSystemDesignPlaybookBasePath,
  FrontEndSystemDesignPlaybookPaths,
  FrontEndSystemDesignPlaybookPathToFile,
} from '~/components/guides/books/front-end-system-design/FrontEndSystemDesignPlaybookNavigation';
import type { ReactInterviewPlaybookPathType } from '~/components/guides/books/react-interview-playbook/ReactInterviewPlaybookNavigation';
import {
  basePath as reactInterviewPlaybookBasePath,
  ReactInterviewPlaybookPaths,
  ReactInterviewPlaybookPathToFile,
} from '~/components/guides/books/react-interview-playbook/ReactInterviewPlaybookNavigation';
import type { GuideCardMetadata } from '~/components/guides/types';

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
    pathToFile: BehavioralInterviewPlaybookPathToFile,
  } as const,
  FRONT_END_INTERVIEW_PLAYBOOK: {
    guideDirectory: 'front-end-interview-guidebook',
    pathToFile: FrontEndInterviewPlaybookPathToFile,
  } as const,
  FRONT_END_SYSTEM_DESIGN_PLAYBOOK: {
    guideDirectory: 'system-design',
    pathToFile: FrontEndSystemDesignPlaybookPathToFile,
  } as const,
  REACT_INTERVIEW_PLAYBOOK: {
    guideDirectory: 'react-interview-playbook',
    pathToFile: ReactInterviewPlaybookPathToFile,
  } as const,
} as const;

export function guidesRequestToFilePath<T extends GuidebookItem>(
  guideBook: T,
  route: keyof (typeof guideDirectoryData)[T]['pathToFile'],
) {
  const { guideDirectory, pathToFile } = guideDirectoryData[guideBook];

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
export async function readFrontEndInterviewPlaybookGuides(
  options?: Readonly<{
    locale?: string;
    slugs?: ReadonlyArray<FrontEndInterviewPlaybookPathType>;
  }>,
): Promise<ReadonlyArray<GuideCardMetadata>> {
  const { locale, slugs } = options ?? {};
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

export async function readFrontEndSystemDesignGuides(
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

export async function readReactInterviewPlaybookGuides(
  options?: Readonly<{
    locale?: string;
    slugs?: ReadonlyArray<ReactInterviewPlaybookPathType>;
  }>,
): Promise<ReadonlyArray<GuideCardMetadata>> {
  const { locale, slugs } = options ?? {};
  const book = 'REACT_INTERVIEW_PLAYBOOK';

  return (slugs ?? ReactInterviewPlaybookPaths).map((slug) => {
    const directoryPath = guidesRequestToFilePath(book, slug);
    const mdxSource = readGuidesContents(directoryPath, locale);

    const { data } = grayMatter(mdxSource);
    const { description, title } = data;
    const time = Math.ceil(readingTime(mdxSource ?? '').minutes);

    return {
      book,
      description,
      href: `${reactInterviewPlaybookBasePath}/${slug}`,
      id: slug,
      readingTime: time,
      title,
    };
  });
}

export async function readBehavioralInterviewPlaybookGuides(
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
