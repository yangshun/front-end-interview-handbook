import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';
import { ArticleJsonLd } from 'next-seo';

import { sortQuestionsMultiple } from '~/components/interviews/questions/listings/filters/QuestionsProcessor';
import InterviewsQuestionsListSlideOutButton from '~/components/interviews/questions/listings/slideout/InterviewsQuestionsListSlideOutButton';
import InterviewsStudyListBottomNav from '~/components/interviews/questions/listings/study-list/InterviewsStudyListBottomNav';
import CodingWorkspacePaywallPage from '~/components/workspace/common/CodingWorkspacePaywallPage';
import JavaScriptCodingWorkspacePage from '~/components/workspace/javascript/JavaScriptCodingWorkspacePage';

import { readQuestionAlgoContents } from '~/db/QuestionsContentsReader';
import { fetchQuestionsListCoding } from '~/db/QuestionsListReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';
import { getSiteOrigin } from '~/seo/siteUrl';
import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';
import { createSupabaseAdminClientGFE_SERVER_ONLY } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string; studyListKey: string }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug: rawSlug } = params;
  // So that we handle typos like extra characters.
  const slug = decodeURIComponent(rawSlug)
    .replaceAll(/[^\da-zA-Z-]/g, '')
    .toLowerCase();

  const intl = await getIntlServerOnly(locale);

  try {
    const { question } = readQuestionAlgoContents(slug, false, locale);

    return defaultMetadata({
      description: question.metadata.excerpt!,
      locale,
      ogImageTitle: question.metadata.title,
      pathname: question.metadata.href,
      socialTitle: question.metadata.title,
      title: intl.formatMessage(
        {
          defaultMessage:
            '{questionTitle} | Algorithms Interview Questions with Solutions',
          description: 'Title of Algorithms Front End interview questions page',
          id: 'JMBOyp',
        },
        { questionTitle: question.metadata.title },
      ),
    });
  } catch {
    notFound();
  }
}

export default async function Page({ params }: Props) {
  const { locale, slug: rawSlug, studyListKey } = params;
  // So that we handle typos like extra characters.
  const slug = decodeURIComponent(rawSlug)
    .replaceAll(/[^\da-zA-Z-]/g, '')
    .toLowerCase();
  const supabaseAdmin = createSupabaseAdminClientGFE_SERVER_ONLY();

  const viewer = await readViewerFromToken();
  let isViewerPremium = false;

  if (viewer != null) {
    isViewerPremium = await Promise.resolve(
      (async () => {
        const { data: profile } = await supabaseAdmin
          .from('Profile')
          .select('*')
          .eq('id', viewer.id)
          .single();

        return profile?.premium ?? false;
      })(),
    );
  }

  const { question } = readQuestionAlgoContents(slug, isViewerPremium, locale);

  const isQuestionLockedForUser =
    question.metadata.access === 'premium' && !isViewerPremium;

  const [{ questions: codingQuestions }] = await Promise.all([
    fetchQuestionsListCoding(locale),
  ]);
  const nextQuestions = sortQuestionsMultiple(
    codingQuestions.filter((questionItem) =>
      question.metadata.nextQuestions.includes(questionItem.slug),
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
    codingQuestions.filter((questionItem) =>
      question.metadata.similarQuestions.includes(questionItem.slug),
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
      <ArticleJsonLd
        authorName={[
          {
            name: 'GreatFrontEnd',
            url: 'https://twitter.com/greatfrontend',
          },
        ]}
        datePublished="2022-11-01T08:00:00+08:00"
        description={question.metadata.excerpt!}
        images={[]}
        isAccessibleForFree={question.metadata.access !== 'premium'}
        title={`Front End Coding Interview Question: ${question.metadata.title}`}
        url={new URL(question.metadata.href, getSiteOrigin()).toString()}
        useAppDir={true}
      />
      {isQuestionLockedForUser ? (
        <>
          <CodingWorkspacePaywallPage
            metadata={question.metadata}
            mode="practice"
          />
          <InterviewsStudyListBottomNav
            paginationEl={
              <InterviewsQuestionsListSlideOutButton
                metadata={question.metadata}
                studyListKey={studyListKey}
              />
            }
            question={question}
            studyListKey={studyListKey}
          />
        </>
      ) : (
        <JavaScriptCodingWorkspacePage
          canViewPremiumContent={isViewerPremium}
          nextQuestions={nextQuestions}
          question={question}
          similarQuestions={similarQuestions}
          studyListKey={studyListKey}
        />
      )}
    </>
  );
}
