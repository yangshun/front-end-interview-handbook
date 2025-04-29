import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';

import InterviewsPurchaseQuestionPaywallPage from '~/components/interviews/purchase/InterviewsPurchaseQuestionPaywallPage';
import QuestionJsonLd from '~/components/interviews/questions/common/QuestionJsonLd';
import { sortQuestionsMultiple } from '~/components/interviews/questions/listings/filters/QuestionsProcessor';
import JavaScriptCodingWorkspacePage from '~/components/workspace/javascript/JavaScriptCodingWorkspacePage';

import { readQuestionJavaScriptContents } from '~/db/QuestionsContentsReader';
import { fetchQuestionsList } from '~/db/QuestionsListReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';
import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';
import { createSupabaseAdminClientGFE_SERVER_ONLY } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug: rawSlug } = params;
  // So that we handle typos like extra characters.
  const slug = decodeURIComponent(rawSlug)
    .replaceAll(/[^\da-zA-Z-]/g, '')
    .toLowerCase();

  const intl = await getIntlServerOnly(locale);

  try {
    const { question } = readQuestionJavaScriptContents(slug, false, locale);

    return defaultMetadata({
      description: question.info.excerpt!,
      locale,
      ogImageTitle: question.info.title,
      pathname: question.metadata.href,
      socialTitle: question.info.title,
      title: intl.formatMessage(
        {
          defaultMessage:
            '{questionTitle} | JavaScript Interview Questions with Solutions',
          description: 'Title of JavaScript Front End interview questions page',
          id: 'k8STTf',
        },
        { questionTitle: question.info.title },
      ),
    });
  } catch {
    notFound();
  }
}

export default async function Page({ params }: Props) {
  const { locale, slug: rawSlug } = params;
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

  const { question } = readQuestionJavaScriptContents(
    slug,
    isViewerPremium,
    locale,
  );

  const isQuestionLockedForViewer =
    question.metadata.access === 'premium' && !isViewerPremium;

  const { questions } = await fetchQuestionsList(
    { type: 'format', value: 'javascript' },
    locale,
  );
  const nextQuestions = sortQuestionsMultiple(
    questions.filter((questionItem) =>
      question.metadata.nextQuestions.includes(questionItem.metadata.slug),
    ),
    [
      {
        field: 'difficulty',
        isAscendingOrder: true,
      },
      {
        field: 'premium',
        isAscendingOrder: true,
      },
    ],
  );
  const similarQuestions = sortQuestionsMultiple(
    questions.filter((questionItem) =>
      question.metadata.similarQuestions.includes(questionItem.metadata.slug),
    ),
    [
      {
        field: 'difficulty',
        isAscendingOrder: true,
      },
      {
        field: 'premium',
        isAscendingOrder: true,
      },
    ],
  );

  return (
    <>
      <QuestionJsonLd info={question.info} metadata={question.metadata} />
      {isQuestionLockedForViewer ? (
        <InterviewsPurchaseQuestionPaywallPage
          metadata={question.metadata}
          mode="practice"
          title={question.info.title}
        />
      ) : (
        <JavaScriptCodingWorkspacePage
          canViewPremiumContent={isViewerPremium}
          nextQuestions={nextQuestions}
          question={question}
          similarQuestions={similarQuestions}
        />
      )}
    </>
  );
}
