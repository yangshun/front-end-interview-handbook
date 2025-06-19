import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';

import InterviewsStudyPlanBlind75Page from '~/components/interviews/questions/listings/study-list/study-plans/InterviewsStudyPlanBlind75Page';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import { fetchInterviewsStudyList } from '~/db/contentlayer/InterviewsStudyListReader';
import { fetchQuestionsListByHash } from '~/db/QuestionsListReader';
import { groupQuestionHashesByFormat } from '~/db/QuestionsUtils';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

async function getPageSEOMetadata() {
  const studyPlanDocument = await fetchInterviewsStudyList('blind75');

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const [intl, { description, href, socialTitle, title }] = await Promise.all([
    getIntlServerOnly(locale),
    getPageSEOMetadata(),
  ]);

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

type Props = Readonly<{
  params: {
    locale: string;
  };
}>;

export default async function Page({ params }: Props) {
  const { locale } = params;
  const blind75 = await fetchInterviewsStudyList('blind75');

  if (blind75 == null) {
    return notFound();
  }

  const questionsSlugs = groupQuestionHashesByFormat(
    blind75?.questionHashes ?? [],
  );

  const [questions, bottomContent] = await Promise.all([
    fetchQuestionsListByHash(blind75?.questionHashes ?? [], locale),
    fetchInterviewListingBottomContent('blind75'),
  ]);

  return (
    <InterviewsStudyPlanBlind75Page
      bottomContent={bottomContent}
      questions={questions}
      questionsSlugs={questionsSlugs}
      studyList={blind75}
    />
  );
}
