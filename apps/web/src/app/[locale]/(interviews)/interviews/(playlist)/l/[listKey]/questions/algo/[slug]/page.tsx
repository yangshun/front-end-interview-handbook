import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';
import { ArticleJsonLd } from 'next-seo';

import { sortQuestionsMultiple } from '~/components/interviews/questions/listings/filters/QuestionsProcessor';
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
  params: Readonly<{ listKey: string; locale: string; slug: string }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug: rawSlug } = params;
  // So that we handle typos like extra characters.
  const slug = decodeURIComponent(rawSlug)
    .replaceAll(/[^\da-zA-Z-]/g, '')
    .toLowerCase();

  const intl = await getIntlServerOnly(locale);

  try {
    const { question } = readQuestionAlgoContents(slug, locale);

    return defaultMetadata({
      description: question.metadata.excerpt!,
      locale,
      pathname: question.metadata.href,
      title: intl.formatMessage(
        {
          defaultMessage:
            '{questionTitle} | Algorithms Front End Interview Questions with Solutions',
          description: 'Title of Algorithms Front End interview questions page',
          id: '+NJDpT',
        },
        { questionTitle: question.metadata.title },
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
  const supabaseAdmin = createSupabaseAdminClientGFE_SERVER_ONLY();

  const viewer = await readViewerFromToken();

  const { question } = readQuestionAlgoContents(slug, locale);

  let canViewPremiumContent = false;

  if (viewer != null) {
    canViewPremiumContent = await Promise.resolve(
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

  const isQuestionLockedForUser =
    question.metadata.premium && !canViewPremiumContent;

  // TODO(interviews/playlist): fetch playlist questions instead.
  const { questions: codingQuestions } = await fetchQuestionsListCoding(locale);
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
        isAccessibleForFree={!question.metadata.premium}
        title={`Front End Coding Interview Question: ${question.metadata.title}`}
        url={new URL(question.metadata.href, getSiteOrigin()).toString()}
        useAppDir={true}
      />
      {isQuestionLockedForUser ? (
        <CodingWorkspacePaywallPage metadata={question.metadata} />
      ) : (
        <JavaScriptCodingWorkspacePage
          canViewPremiumContent={canViewPremiumContent}
          nextQuestions={nextQuestions}
          question={question}
          similarQuestions={similarQuestions}
        />
      )}
    </>
  );
}
