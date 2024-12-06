import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';
import { ArticleJsonLd } from 'next-seo';

import InterviewsPurchaseStudyListPaywallPage from '~/components/interviews/purchase/InterviewsPurchaseStudyListPaywallPage';
import QuestionQuizContents from '~/components/interviews/questions/content/quiz/QuestionQuizContents';
import InterviewsQuestionsListSlideOutButton from '~/components/interviews/questions/listings/slideout/InterviewsQuestionsListSlideOutButton';

import { fetchInterviewsStudyList } from '~/db/contentlayer/InterviewsStudyListReader';
import { readQuestionQuizContents } from '~/db/QuestionsContentsReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';
import { getSiteOrigin } from '~/seo/siteUrl';
import {
  createSupabaseAdminClientGFE_SERVER_ONLY,
  readViewerFromToken,
} from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
    slug: string;
    studyListKey: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = params;

  const intl = await getIntlServerOnly(locale);
  const { question } = readQuestionQuizContents(slug, locale);

  return defaultMetadata({
    description: question.metadata.excerpt ?? '',
    locale,
    ogImageTitle: question.metadata.title,
    pathname: question.metadata.href,
    socialTitle: question.metadata.title,
    title: intl.formatMessage(
      {
        defaultMessage:
          '{questionTitle} | Quiz Interview Questions with Solutions',
        description: 'Title of quiz question page',
        id: 'wTdDt/',
      },
      {
        questionTitle: question.metadata.title,
      },
    ),
  });
}

export default async function Page({ params }: Props) {
  const { locale, slug: rawSlug, studyListKey } = params;

  // So that we handle typos like extra characters.
  const slug = decodeURIComponent(rawSlug)
    .replaceAll(/[^\da-zA-Z-]/g, '')
    .toLowerCase();

  const isViewerPremium: boolean = await (async () => {
    const viewer = await readViewerFromToken();

    if (viewer == null) {
      return false;
    }

    const supabaseClient = createSupabaseAdminClientGFE_SERVER_ONLY();

    const { data: profile } = await supabaseClient
      .from('Profile')
      .select('*')
      .eq('id', viewer.id)
      .single();

    return profile?.premium ?? false;
  })();

  const studyList = await fetchInterviewsStudyList(studyListKey);

  if (studyList == null) {
    return notFound();
  }

  const isStudyListLockedForViewer =
    studyList.access === 'premium' && !isViewerPremium;

  const { question } = readQuestionQuizContents(slug, locale);

  return (
    <>
      <ArticleJsonLd
        authorName={[
          {
            name: 'GreatFrontEnd',
            url: 'https://twitter.com/greatfrontend',
          },
        ]}
        datePublished="2022-11-01T08:00:00+08:00"
        description={question.metadata.excerpt ?? ''}
        images={[]}
        isAccessibleForFree={true}
        title={question.metadata.title}
        url={new URL(question.metadata.href, getSiteOrigin()).toString()}
        useAppDir={true}
      />
      {isStudyListLockedForViewer ? (
        <InterviewsPurchaseStudyListPaywallPage
          studyListCategory={studyList.category}
        />
      ) : (
        <QuestionQuizContents
          paginationEl={
            <InterviewsQuestionsListSlideOutButton
              metadata={question.metadata}
              slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE="qns_slideout"
              studyListKey={studyListKey}
            />
          }
          question={question}
          studyListKey={studyListKey}
        />
      )}
    </>
  );
}
