import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';
import { CourseJsonLd } from 'next-seo';

import { INTERVIEWS_REVAMP_BOTTOM_CONTENT } from '~/data/FeatureFlags';

import InterviewsGFE75Page from '~/components/interviews/questions/listings/learning/study-plans/InterviewsGFE75Page';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import { fetchInterviewsStudyList } from '~/db/contentlayer/InterviewsStudyListReader';
import { fetchQuestionsByHash } from '~/db/QuestionsListReader';
import { groupQuestionHashesByFormat } from '~/db/QuestionsUtils';
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

  const { title, description, href, socialTitle } = await getPageSEOMetadata();

  return defaultMetadata({
    description,
    locale,
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
      <InterviewsGFE75Page
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
