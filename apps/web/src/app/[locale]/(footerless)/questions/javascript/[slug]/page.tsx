import type { Metadata } from 'next/types';
import { ArticleJsonLd } from 'next-seo';

import { sortQuestionsMultiple } from '~/components/questions/common/QuestionsProcessor';
import type { QuestionMetadata } from '~/components/questions/common/QuestionsTypes';

import { readQuestionJavaScriptContents } from '~/db/QuestionsContentsReader';
import { fetchQuestionsListCoding } from '~/db/QuestionsListReader';
import { genQuestionProgress } from '~/db/QuestionsProgressUniversal';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';
import { fetchUser } from '~/supabase/SupabaseServerGFE';
import { createSupabaseAdminClientGFE } from '~/supabase/SupabaseServerGFE';

import QuestionJavaScriptCodingWorkspacePage from './QuestionJavaScriptCodingWorkspacePage';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = params;
  
  const intl = await getIntlServerOnly(locale);
  const question = readQuestionJavaScriptContents(slug, locale);

  return defaultMetadata({
    description: question.metadata.excerpt!,
    pathname: question.metadata.href,
    title: intl.formatMessage(
      {
        defaultMessage:
          '{questionTitle} | JavaScript Front End Interview Questions with Solutions',
        description: 'Title of Javascript Front End interview questions page',
        id: 'wqIwvv',
      },
      { questionTitle: question.metadata.title },
    ),
  });
}

export default async function Page({ params }: Props) {
  const t0 = performance.now();

  const supabaseAdmin = createSupabaseAdminClientGFE();
  const { slug, locale } = params;

  const user = await fetchUser();
  const question = readQuestionJavaScriptContents(slug, locale);

  let questionProgress = null;
  let canViewPremiumContent = false;

  if (user != null) {
    [questionProgress, canViewPremiumContent] = await Promise.all([
      genQuestionProgress(
        supabaseAdmin,
        user,
        question.metadata as QuestionMetadata,
      ),
      (async () => {
        const { data: profile } = await supabaseAdmin
          .from('Profile')
          .select('*')
          .eq('id', user.id)
          .single();

        return profile?.premium ?? false;
      })(),
    ]);
  }

  const isQuestionLocked = question.metadata.premium && !canViewPremiumContent;

  const codingQuestions = await fetchQuestionsListCoding();
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
        url={`https://www.greatfrontend.com${question.metadata.href}`}
        useAppDir={true}
      />
      <QuestionJavaScriptCodingWorkspacePage
        canViewPremiumContent={canViewPremiumContent}
        isQuestionLocked={isQuestionLocked}
        nextQuestions={nextQuestions}
        question={{
          description: isQuestionLocked ? null : question.description,
          format: question.format,
          metadata: question.metadata,
          skeleton: isQuestionLocked ? null : question.skeleton,
          solution: isQuestionLocked ? null : question.solution,
          tests: isQuestionLocked ? null : question.tests,
        }}
        questionProgress={questionProgress}
        serverDuration={performance.now() - t0}
        similarQuestions={similarQuestions}
      />
    </>
  );
}
