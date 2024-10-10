import fs from 'fs';
import grayMatter from 'gray-matter';
import path from 'path';
import readingTime from 'reading-time';

import type {
  FrontEndInterviewRouteType,
  GuideCardMetadata,
} from '~/components/guides/types';

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

function requestToFrontEndInterviewGuidesPaths({
  route,
}: {
  route: FrontEndInterviewRouteType;
}): Readonly<{
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
  const basePath = '/front-end-interview-guidebook';

  frontendInterviewSlugs.forEach((slug) => {
    // For the introduction article, the slug is introduction, but the content href is the basePath itself
    const route = slug === 'introduction' ? '' : slug;
    const { directoryPath } = requestToFrontEndInterviewGuidesPaths({
      route,
    });

    const mdxSource = readGuidesContents(directoryPath, locale);

    const { data } = grayMatter(mdxSource);
    const { description, title } = data;
    const time = Math.ceil(readingTime(mdxSource ?? '').minutes);

    guidesData.push({
      category: 'front-end-interview-guide',
      description,
      href: `${basePath}/${route}`,
      readingTime: time,
      slug,
      title,
    });
  });

  return guidesData;
}
