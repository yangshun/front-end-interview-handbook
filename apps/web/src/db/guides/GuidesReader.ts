import fs from 'fs';
import grayMatter from 'gray-matter';
import path from 'path';
import readingTime from 'reading-time';

import type {
  BehavioralSlugType,
  FrontEndInterviewSlugType,
  FrontEndSystemDesignSlugType,
  GuideCardMetadata,
} from '~/components/guides/types';
import { basePath as behavioralInterviewGuidebookBasePath } from '~/components/guides/useBehavioralInterviewGuidebookNavigation';
import { basePath as frontEndInterviewGuidebookBasePath } from '~/components/guides/useFrontEndInterviewGuidebookNavigation';
import { basePath as frontEndSystemDesignGuidebookBasePath } from '~/components/interviews/questions/content/system-design/SystemDesignNavigation';

import {
  behavioralRouteToFile,
  behavioralSlugs,
  frontendInterviewSlugs,
  frontEndInterviewsRouteToFile,
  frontendSystemDesignRouteToFile,
  frontendSystemDesignSlugs,
} from './GuidesUtils';

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

type GuidesRouteTypeMap = {
  'behavioral-interview-guidebook': BehavioralSlugType;
  'front-end-interview-guidebook': FrontEndInterviewSlugType;
  'system-design': FrontEndSystemDesignSlugType;
};

function requestToGuidePaths<T extends keyof GuidesRouteTypeMap>(
  guideType: T,
  route: GuidesRouteTypeMap[T],
): Readonly<{
  directoryPath: string;
}> {
  const fileMap: Record<keyof GuidesRouteTypeMap, Record<string, string>> = {
    'behavioral-interview-guidebook': behavioralRouteToFile,
    'front-end-interview-guidebook': frontEndInterviewsRouteToFile,
    'system-design': frontendSystemDesignRouteToFile,
  };

  const file = fileMap[guideType][route];

  const directoryPath = path.join(
    process.cwd(),
    '..',
    '..',
    'submodules',
    'front-end-interview-handbook',
    'packages',
    guideType,
    'contents',
    file,
  );

  return { directoryPath };
}

// TODO(interviews): consolidate
export async function readAllFrontEndInterviewGuides(locale: string) {
  const guidesData: Array<GuideCardMetadata> = [];

  frontendInterviewSlugs.forEach((slug) => {
    const { directoryPath } = requestToGuidePaths(
      'front-end-interview-guidebook',
      slug,
    );

    const mdxSource = readGuidesContents(directoryPath, locale);

    const { data } = grayMatter(mdxSource);
    const { description, title } = data;
    const time = Math.ceil(readingTime(mdxSource ?? '').minutes);

    guidesData.push({
      book: 'FRONT_END_INTERVIEW_PLAYBOOK',
      description,
      href: `${frontEndInterviewGuidebookBasePath}/${slug}`,
      id: slug,
      readingTime: time,
      title,
    });
  });

  return guidesData;
}

export async function readAllFrontendSystemDesignGuides(locale: string) {
  const guidesData: Array<GuideCardMetadata> = [];

  frontendSystemDesignSlugs.forEach((slug) => {
    const { directoryPath } = requestToGuidePaths('system-design', slug);

    const mdxSource = readGuidesContents(directoryPath, locale);

    const { data } = grayMatter(mdxSource);
    const { description, title } = data;
    const time = Math.ceil(readingTime(mdxSource ?? '').minutes);

    guidesData.push({
      book: 'FRONT_END_SYSTEM_DESIGN_PLAYBOOK',
      description,
      href: `${frontEndSystemDesignGuidebookBasePath}/${slug}`,
      id: slug,
      readingTime: time,
      title,
    });
  });

  return guidesData;
}

export async function readAllBehavioralGuides(locale: string) {
  const guidesData: Array<GuideCardMetadata> = [];

  behavioralSlugs.forEach((slug) => {
    const { directoryPath } = requestToGuidePaths(
      'behavioral-interview-guidebook',
      slug,
    );

    const mdxSource = readGuidesContents(directoryPath, locale);

    const { data } = grayMatter(mdxSource);
    const { description, title } = data;
    const time = Math.ceil(readingTime(mdxSource ?? '').minutes);

    guidesData.push({
      book: 'BEHAVIORAL_INTERVIEW_PLAYBOOK',
      description,
      href: `${behavioralInterviewGuidebookBasePath}/${slug}`,
      id: slug,
      readingTime: time,
      title,
    });
  });

  return guidesData;
}
