import grayMatter from 'gray-matter';
import type { Metadata } from 'next/types';
import path from 'path';
import readingTime from 'reading-time';

import type {
  FrontEndSystemDesignRouteType,
  GuideCardMetadata,
} from '~/components/guides/types';
import FrontEndSystemDesignPlaybookPage from '~/components/interviews/guides/FrontEndSystemDesignPlaybookPage';
import { basePath } from '~/components/interviews/questions/content/system-design/SystemDesignNavigation';

import { fetchInterviewsStudyList } from '~/db/contentlayer/InterviewsStudyListReader';
import { readGuidesContents } from '~/db/guides/GuidesReader';
import {
  frontendSystemDesignRouteToFile,
  frontendSystemDesignSlugs,
} from '~/db/guides/GuidesUtils';
import { fetchQuestionCompletionCount } from '~/db/QuestionsCount';
import { fetchQuestionsListSystemDesign } from '~/db/QuestionsListReader';
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
        'The definitive guide to Front End System Design interviews. Learn useful techniques and how to approach the most common questions. Written by Ex-FAANG interviewers.',
      description:
        'Page description for frontend system design playbook cover page',
      id: 'O237FB',
    }),
    href: basePath,
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

// TODO(interviews): consolidate
function requestToPaths(route: FrontEndSystemDesignRouteType) {
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

  frontendSystemDesignSlugs.forEach((slug) => {
    const { directoryPath } = requestToPaths(slug);

    const mdxSource = readGuidesContents(directoryPath, locale);

    const { data } = grayMatter(mdxSource);
    const { description, title } = data;
    const time = Math.ceil(readingTime(mdxSource ?? '').minutes);

    guidesData.push({
      category: 'system-design-guide',
      description,
      href: `${basePath}/${slug}`,
      readingTime: time,
      slug,
      title,
    });
  });

  return guidesData;
}

export default async function Page({ params }: Props) {
  const { locale } = params;

  const [
    allGuides,
    { questions },
    questionCompletionCount,
    blind75,
    gfe75,
    { title, description, socialTitle, href },
  ] = await Promise.all([
    readAllGuides({ params }),
    fetchQuestionsListSystemDesign(locale),
    fetchQuestionCompletionCount(['system-design']),
    fetchInterviewsStudyList('blind75'),
    fetchInterviewsStudyList('greatfrontend75'),
    getPageSEOMetadata({ params }),
  ]);

  return (
    <FrontEndSystemDesignPlaybookPage
      allGuides={allGuides}
      metadata={{
        description,
        href,
        title: socialTitle || title,
      }}
      questionCompletionCount={questionCompletionCount}
      questions={questions}
      recommendedPrepData={{
        blind75: {
          listKey: blind75?.slug ?? '',
          questionCount: blind75?.questionHashes.length ?? 0,
        },
        gfe75: {
          listKey: gfe75?.slug ?? '',
          questionCount: gfe75?.questionHashes.length ?? 0,
        },
        systemDesignQuestionCount: questions.length,
      }}
    />
  );
}
