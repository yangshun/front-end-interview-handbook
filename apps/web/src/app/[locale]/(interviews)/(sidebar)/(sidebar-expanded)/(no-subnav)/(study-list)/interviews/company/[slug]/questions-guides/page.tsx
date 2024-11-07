import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';

import { INTERVIEWS_REVAMP_BOTTOM_CONTENT } from '~/data/FeatureFlags';

import InterviewsCompanyGuidePage from '~/components/interviews/company/InterviewsCompanyGuidePage';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import {
  fetchInterviewsStudyList,
  fetchInterviewsStudyLists,
} from '~/db/contentlayer/InterviewsStudyListReader';
import { fetchQuestionsByHash } from '~/db/QuestionsListReader';
import { groupQuestionHashesByFormat } from '~/db/QuestionsUtils';
import { generateStaticParamsWithLocale } from '~/next-i18nostic/src';
import defaultMetadata from '~/seo/defaultMetadata';

type Props = Readonly<{
  params: {
    locale: string;
    slug: string;
  };
}>;

export async function generateStaticParams() {
  const companyGuides = await fetchInterviewsStudyLists('company-guide');

  return generateStaticParamsWithLocale(
    companyGuides.map((companyGuide) => ({ slug: companyGuide.slug })),
  );
}

async function getPageSEOMetadata({ slug }: Props['params']) {
  const companyGuide = await fetchInterviewsStudyList(slug);

  if (companyGuide == null) {
    return notFound();
  }

  return {
    description: companyGuide.seoDescription,
    href: companyGuide.href,
    socialTitle: companyGuide.socialTitle,
    title: companyGuide.seoTitle,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const { title, description, socialTitle, href } =
    await getPageSEOMetadata(params);

  return defaultMetadata({
    description,
    locale,
    pathname: href,
    socialTitle,
    title,
  });
}

export default async function Page({ params }: Props) {
  const { locale, slug } = params;

  const companyGuide = await fetchInterviewsStudyList(slug);

  if (companyGuide == null) {
    return notFound();
  }

  const questionsSlugs = groupQuestionHashesByFormat(
    companyGuide.questionHashes,
  );

  const [questions, bottomContent] = await Promise.all([
    fetchQuestionsByHash(companyGuide.questionHashes, locale),
    fetchInterviewListingBottomContent('company-detail'),
  ]);

  return (
    <InterviewsCompanyGuidePage
      bottomContent={
        INTERVIEWS_REVAMP_BOTTOM_CONTENT ? bottomContent : undefined
      }
      questions={questions}
      questionsSlugs={questionsSlugs}
      studyList={companyGuide}
    />
  );
}
