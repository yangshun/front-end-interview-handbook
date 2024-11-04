import grayMatter from 'gray-matter';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';
import path from 'path';
import readingTime from 'reading-time';

import { INTERVIEWS_REVAMP_2024 } from '~/data/FeatureFlags';

import type {
  BehavioralRouteType,
  GuideCardMetadata,
} from '~/components/guides/types';
import BehavioralInterviewPlaybookPage from '~/components/interviews/guides/BehavioralInterviewPlaybookPage';

import { readGuidesContents } from '~/db/guides/GuidesReader';
import {
  behavioralRouteToFile,
  behavioralSlugs,
} from '~/db/guides/GuidesUtils';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

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
        'The definitive guide to behavioral interviews for front end engineers. Written by Ex-FAANG interviewers. Find out what to expect and how to prepare.',
      description:
        'Page description for behavioral interview playbook cover page',
      id: 'zqIbYm',
    }),
    href: '/front-end-interview-playbook',
    socialTitle: intl.formatMessage({
      defaultMessage: 'Behavioral Interview Playbook | GreatFrontEnd',
      description: 'Social title for behavioral interview playbook cover page',
      id: 'Pv/QiZ',
    }),
    title: intl.formatMessage({
      defaultMessage:
        'Behavioral Interview Playbook | Made For Front End Engineers',
      description: 'Page title for behavioral interview playbook cover page',
      id: 'K2TQiz',
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

function requestToPaths({ route }: { route: BehavioralRouteType }): Readonly<{
  directoryPath: string;
}> {
  const directoryPath = path.join(
    process.cwd(),
    '..',
    '..',
    'submodules',
    'front-end-interview-handbook',
    'packages',
    'behavioral-interview-guidebook',
    'contents',
    behavioralRouteToFile[route],
  );

  return { directoryPath };
}

async function readAllGuides({ params }: Props) {
  const { locale } = params;

  const guidesData: Array<GuideCardMetadata> = [];
  const basePath = '/behavioral-interview-guidebook';

  behavioralSlugs.forEach((slug) => {
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
      category: 'behavioral-interview-guide',
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

  return <BehavioralInterviewPlaybookPage allGuides={allGuides} />;
}
