import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';

import InterviewsPurchaseStudyListPaywallPage from '~/components/interviews/purchase/InterviewsPurchaseStudyListPaywallPage';
import QuestionQuizContents from '~/components/interviews/questions/content/quiz/QuestionQuizContents';

import { fetchInterviewsStudyList } from '~/db/contentlayer/InterviewsStudyListReader';
import { readQuestionQuizContents } from '~/db/QuestionsContentsReader';
import { getIntlServerOnly } from '~/i18n';
import i18nRedirect from '~/next-i18nostic/src/utils/i18nRedirect';
import defaultMetadata from '~/seo/defaultMetadata';
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

  const [intl, quizQuestionContents] = await Promise.all([
    getIntlServerOnly(locale),
    readQuestionQuizContents(slug, locale),
  ]);

  if (quizQuestionContents == null) {
    notFound();
  }

  const { question } = quizQuestionContents;

  return defaultMetadata({
    description: question.info.excerpt ?? '',
    locale,
    ogImageTitle: question.info.title,
    pathname: question.metadata.href,
    socialTitle: question.info.title,
    title: intl.formatMessage(
      {
        defaultMessage:
          '{questionTitle} | Quiz Interview Questions with Solutions',
        description: 'Title of quiz question page',
        id: 'wTdDt/',
      },
      {
        questionTitle: question.info.title,
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

  const studyList = await fetchInterviewsStudyList(studyListKey, locale);

  if (studyList == null) {
    return notFound();
  }

  const isStudyListLockedForViewer =
    studyList.access === 'premium' && !isViewerPremium;

  const quizQuestion = await readQuestionQuizContents(slug, locale);

  if (quizQuestion == null) {
    return notFound();
  }

  const { exactMatch, question } = quizQuestion;

  if (!exactMatch) {
    i18nRedirect(quizQuestion.question.metadata.slug, { locale });
  }

  return isStudyListLockedForViewer ? (
    <InterviewsPurchaseStudyListPaywallPage
      studyListCategory={studyList.category}
    />
  ) : (
    <QuestionQuizContents
      listIsShownInSidebarOnDesktop={false}
      question={question}
      studyListKey={studyListKey}
    />
  );
}
