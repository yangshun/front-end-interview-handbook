import grayMatter from 'gray-matter';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';
import path from 'path';
import readingTime from 'reading-time';

import { INTERVIEWS_REVAMP_2024 } from '~/data/FeatureFlags';

import type {
  FrontEndSystemDesignRouteType,
  GuideCardMetadata,
} from '~/components/guides/types';

import { readGuidesContents } from '~/db/guides/GuidesReader';
import {
  frontendSystemDesignRouteToFile,
  frontendSystemDesignSlugs,
} from '~/db/guides/GuidesUtils';
import { fetchQuestionsListSystemDesign } from '~/db/QuestionsListReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

import FrontEndSystemDesignPlaybookPage from './FrontEndSystemDesignPlaybookPage';

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
        'The definitive guide to Front End System Design interviews. Learn useful techniques and how to approach the most common questions. Written by Ex-FAANG interviewers.',
      description:
        'Page description for frontend system design playbook cover page',
      id: 'O237FB',
    }),
    href: '/front-end-system-design-playbook',
    socialTitle: intl.formatMessage({
      defaultMessage: 'Front End System Design Playbook | GreatFrontEnd',
      description:
        'Social title for frontend system design playbook cover page',
      id: 'E9XW96',
    }),
    title: intl.formatMessage({
      defaultMessage: 'Front End System Design Playbook: All-in-one Deep Dive',
      description: 'Page title for frontend system design playbook cover page',
      id: '6hhGip',
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
  route: FrontEndSystemDesignRouteType;
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
    'system-design',
    'contents',
    frontendSystemDesignRouteToFile[route],
  );

  return { directoryPath };
}

async function readAllGuides({ params }: Props) {
  const { locale } = params;
  const guidesData: Array<GuideCardMetadata> = [];
  const basePath = '/system-design';

  frontendSystemDesignSlugs.forEach((slug) => {
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
      category: 'system-design-guide',
      description,
      // For the introduction article, the slug is introduction, but the content href is the basePath itself
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

  const { locale } = params;

  const [seoMetadata, allGuides, { questions }] = await Promise.all([
    getPageSEOMetadata({ params }),
    readAllGuides({ params }),
    fetchQuestionsListSystemDesign(locale),
  ]);

  return (
    <FrontEndSystemDesignPlaybookPage
      allGuides={allGuides}
      metadata={{
        ...seoMetadata,
        title: seoMetadata.socialTitle,
      }}
      questionCount={questions.length}
    />
  );
}
