import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';

import InterviewsFocusAreaPage from '~/components/interviews/questions/listings/study-list/focus-areas/InterviewsFocusAreaPage';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import {
  fetchInterviewsStudyList,
  fetchInterviewsStudyLists,
} from '~/db/contentlayer/InterviewsStudyListReader';
import { fetchQuestionsListByHash } from '~/db/QuestionsListReader';
import { groupQuestionHashesByFormat } from '~/db/QuestionsUtils';
import { getIntlServerOnly } from '~/i18n';
import { generateStaticParamsWithLocale } from '~/next-i18nostic/src';
import defaultMetadata from '~/seo/defaultMetadata';

type Props = Readonly<{
  params: {
    locale: string;
    slug: string;
  };
}>;

async function getPageSEOMetadata({ slug }: Props['params']) {
  const focusAreaDocument = await fetchInterviewsStudyList(slug);

  if (focusAreaDocument == null) {
    return notFound();
  }

  return {
    description: focusAreaDocument.seoDescription,
    href: focusAreaDocument.href,
    name: focusAreaDocument.name,
    socialTitle: focusAreaDocument.socialTitle,
    title: focusAreaDocument.seoTitle,
  };
}

export async function generateStaticParams() {
  const focusAreas = await fetchInterviewsStudyLists('focus-area');

  return generateStaticParamsWithLocale(
    focusAreas.map((focusArea) => ({ focusArea: focusArea.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const [intl, { title, description, href, socialTitle, name }] =
    await Promise.all([getIntlServerOnly(locale), getPageSEOMetadata(params)]);

  return defaultMetadata({
    description,
    locale,
    ogImagePageType: intl.formatMessage({
      defaultMessage: 'Focus areas',
      description: 'Title of focus areas page',
      id: 'Zui1cu',
    }),
    ogImageTitle: intl.formatMessage(
      {
        defaultMessage: '{focusAreaName} Interview Questions',
        description: 'OG image page type for focus areas',
        id: '+GsP/X',
      },
      {
        focusAreaName: name,
      },
    ),
    pathname: href,
    socialTitle,
    title,
  });
}

export default async function Page({ params }: Props) {
  const { locale, slug } = params;

  const focusArea = await fetchInterviewsStudyList(slug);

  if (focusArea == null) {
    return notFound();
  }

  const questionsSlugs = groupQuestionHashesByFormat(
    focusArea?.questionHashes ?? [],
  );

  const [questions, bottomContent] = await Promise.all([
    fetchQuestionsListByHash(focusArea?.questionHashes ?? [], locale),
    fetchInterviewListingBottomContent(`${slug}-focus-area`),
  ]);

  return (
    <InterviewsFocusAreaPage
      bottomContent={bottomContent}
      questions={questions}
      questionsSlugs={questionsSlugs}
      studyList={focusArea}
    />
  );
}
