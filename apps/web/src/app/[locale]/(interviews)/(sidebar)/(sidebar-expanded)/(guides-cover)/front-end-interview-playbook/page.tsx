import grayMatter from 'gray-matter';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';
import path from 'path';
import readingTime from 'reading-time';

import { INTERVIEWS_REVAMP_2024 } from '~/data/FeatureFlags';

import type {
  FrontEndInterviewRouteType,
  GuideCardMetadata,
} from '~/components/guides/types';

import { readGuidesContents } from '~/db/guides/GuidesReader';
import {
  frontendInterviewSlugs,
  frontEndInterviewsRouteToFile,
} from '~/db/guides/GuidesUtils';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

import FrontEndInterviewPlaybookPage from './FrontEndInterviewPlaybookPage';

export const dynamic = 'force-static';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

async function getPageSEOMetadata({ params }: Props) {
  const { locale } = params;
  const intl = await getIntlServerOnly(locale);

  return {
    description: intl.formatMessage({
      defaultMessage:
        'The definitive guide to front end interviews written by Ex-FAANG interviewers. Find out what to expect, the different types of questions and how to prepare.',
      description:
        'Page description for frontend interview playbook cover page',
      id: 'qI3Dry',
    }),
    href: '/front-end-interview-playbook',
    socialTitle: intl.formatMessage({
      defaultMessage: 'Front End Interview Playbook | GreatFrontEnd',
      description: 'Social title for frontend interview playbook cover page',
      id: '4De8x6',
    }),
    title: intl.formatMessage({
      defaultMessage:
        'Front End Interview Playbook: Everything you need to excel',
      description: 'Page title for frontend interview playbook cover page',
      id: 'hALSD8',
    }),
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const { title, description, socialTitle, href } = await getPageSEOMetadata({
    params,
  });

  return defaultMetadata({
    description,
    locale,
    pathname: href,
    socialTitle,
    title,
  });
}

function requestToPaths({
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

async function readAllGuides({ params }: Props) {
  const { locale } = params;

  const guidesData: Array<GuideCardMetadata> = [];
  const basePath = '/front-end-interview-guidebook';

  frontendInterviewSlugs.forEach((slug) => {
    // For the introduction article, the slug is introduction, but the content href is the basePath itself
    const route = slug === 'introduction' ? '' : slug;
    const { directoryPath } = requestToPaths({
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

export default async function Page({ params }: Props) {
  if (!INTERVIEWS_REVAMP_2024) {
    return notFound();
  }

  const allGuides = await readAllGuides({ params });

  return (
    <FrontEndInterviewPlaybookPage
      allGuides={allGuides}
    />
  );
}
