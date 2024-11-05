import fs from 'fs';
import grayMatter from 'gray-matter';
import path from 'path';
import readingTime from 'reading-time';

import type {
  FrontEndInterviewRouteType,
  GuideCardMetadata,
} from '~/components/guides/types';
import { basePath } from '~/components/guides/useFrontEndInterviewGuidebookNavigation';

import {
  frontendInterviewSlugs,
  frontEndInterviewsRouteToFile,
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

function requestToFrontEndInterviewGuidesPaths(
  route: FrontEndInterviewRouteType,
): Readonly<{
  directoryPath: string;
}> {
  const directoryPath = path.join(
    process.cwd(),
    '..',
    '..',
    'submodules',
    'front-end-interview-handbook',
    'packages',
    'front-end-interview-guidebook',
    'contents',
    frontEndInterviewsRouteToFile[route],
  );

  return { directoryPath };
}

export async function readAllFrontEndInterviewGuides(locale: string) {
  const guidesData: Array<GuideCardMetadata> = [];

  frontendInterviewSlugs.forEach((slug) => {
    const { directoryPath } = requestToFrontEndInterviewGuidesPaths(slug);

    const mdxSource = readGuidesContents(directoryPath, locale);

    const { data } = grayMatter(mdxSource);
    const { description, title } = data;
    const time = Math.ceil(readingTime(mdxSource ?? '').minutes);

    guidesData.push({
      category: 'front-end-interview-guide',
      description,
      href: `${basePath}/${slug}`,
      readingTime: time,
      slug,
      title,
    });
  });

  return guidesData;
}
