import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';
import { CourseJsonLd } from 'next-seo';

import { INTERVIEWS_REVAMP_BOTTOM_CONTENT } from '~/data/FeatureFlags';

import InterviewsStudyPlanGFE75Page from '~/components/interviews/questions/listings/study-list/study-plans/InterviewsStudyPlanGFE75Page';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import { fetchInterviewsStudyList } from '~/db/contentlayer/InterviewsStudyListReader';
import { fetchQuestionsByHash } from '~/db/QuestionsListReader';
import { groupQuestionHashesByFormat } from '~/db/QuestionsUtils';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';
import { getSiteOrigin } from '~/seo/siteUrl';

async function getPageSEOMetadata() {
  const studyPlanDocument = await fetchInterviewsStudyList('gfe75');

  if (studyPlanDocument == null) {
    return notFound();
  }

  return {
    description: studyPlanDocument.seoDescription,
    href: studyPlanDocument.href,
    socialTitle: studyPlanDocument.socialTitle,
    title: studyPlanDocument.seoTitle,
  };
}

type Props = Readonly<{
  params: {
    locale: string;
  };
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const intl = await getIntlServerOnly(locale);

  const { title, description, href, socialTitle } = await getPageSEOMetadata();

  return defaultMetadata({
    description,
    locale,
    ogImagePageType: intl.formatMessage({
      defaultMessage: 'Recommended preparation',
      description: 'OG category for Recommended preparation',
      id: 'kpV4fu',
    }),
    ogImageTitle: title,
    pathname: href,
    socialTitle,
    title,
  });
}

export default async function Page({ params }: Props) {
  const { locale } = params;
  const gfe75 = await fetchInterviewsStudyList('gfe75');

  if (gfe75 == null) {
    return notFound();
  }

  const questionsSlugs = groupQuestionHashesByFormat(gfe75.questionHashes);

  const [questions, bottomContent] = await Promise.all([
    fetchQuestionsByHash(gfe75.questionHashes, locale),
    fetchInterviewListingBottomContent('gfe75'),
  ]);

  return (
    <>
      <CourseJsonLd
        courseName={gfe75.seoTitle}
        description={gfe75.description}
        provider={{
          name: 'GreatFrontEnd',
          url: getSiteOrigin(),
        }}
        useAppDir={true}
      />
      <InterviewsStudyPlanGFE75Page
        bottomContent={
          INTERVIEWS_REVAMP_BOTTOM_CONTENT ? bottomContent : undefined
        }
        questions={questions}
        questionsSlugs={questionsSlugs}
        studyList={gfe75}
      />
    </>
  );
}
