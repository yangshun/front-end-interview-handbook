import type { Metadata } from 'next/types';
import { ArticleJsonLd } from 'next-seo';

import { readQuestionSystemDesignContents } from '~/db/QuestionsContentsReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';
import {
  createSupabaseAdminClientGFE,
  fetchUser,
} from '~/supabase/SupabaseServerGFE';

import QuestionsSystemDesignPage from './QuestionsSystemDesignPage';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
    slug: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = params;

  const intl = await getIntlServerOnly(locale);
  const question = readQuestionSystemDesignContents(slug, locale);

  return defaultMetadata({
    description: question.metadata.excerpt ?? '',
    pathname: question.metadata.href,
    title: intl.formatMessage(
      {
        defaultMessage:
          '{questionTitle} | Front End System Design Interview Questions with Solutions',
        description: 'Title of system design question page',
        id: 'ujL9EM',
      },
      {
        questionTitle: question.metadata.title,
      },
    ),
  });
}

export default async function Page({ params }: Props) {
  const { locale, slug } = params;

  const t0 = performance.now();
  const question = readQuestionSystemDesignContents(slug, locale);

  const canViewPremiumContent: boolean = await (async () => {
    const user = await fetchUser();

    if (user == null) {
      return false;
    }

    const supabaseClient = createSupabaseAdminClientGFE();

    const { data: profile } = await supabaseClient
      .from('Profile')
      .select('*')
      .eq('id', user.id)
      .single();

    return profile?.premium ?? false;
  })();

  const isQuestionLocked = question.metadata.premium && !canViewPremiumContent;

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
        isAccessibleForFree={!question.metadata.premium}
        title={`Front End System Design: ${question.metadata.title}`}
        url={`https://www.greatfrontend.com${question.metadata.href}`}
        useAppDir={true}
      />
      <QuestionsSystemDesignPage
        canViewPremiumContent={canViewPremiumContent}
        isQuestionLocked={isQuestionLocked}
        question={{
          description: isQuestionLocked ? null : question.description,
          format: question.format,
          metadata: question.metadata,
          solution: isQuestionLocked ? null : question.solution,
        }}
        serverDuration={performance.now() - t0}
      />
    </>
  );
}
