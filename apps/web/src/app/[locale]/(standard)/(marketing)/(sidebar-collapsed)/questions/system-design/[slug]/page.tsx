import type { Metadata } from 'next/types';

import GuidesArticleJsonLd from '~/components/guides/GuidesArticleJsonLd';

import { readQuestionSystemDesignContents } from '~/db/QuestionsContentsReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';
import {
  createSupabaseAdminClientGFE,
  readUserFromToken,
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
  const { question } = readQuestionSystemDesignContents(slug, locale);

  return defaultMetadata({
    description: question.metadata.excerpt ?? '',
    locale,
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

  const { question } = readQuestionSystemDesignContents(slug, locale);

  const canViewPremiumContent: boolean = await (async () => {
    const user = readUserFromToken();

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
      <GuidesArticleJsonLd
        description={question.metadata.excerpt ?? ''}
        isAccessibleForFree={!question.metadata.premium}
        pathname={question.metadata.href}
        title={`Front End System Design: ${question.metadata.title}`}
      />
      <QuestionsSystemDesignPage
        canViewPremiumContent={canViewPremiumContent}
        isQuestionLocked={isQuestionLocked}
        question={{
          description: question.description,
          format: question.format,
          metadata: question.metadata,
          solution: isQuestionLocked ? null : question.solution,
        }}
      />
    </>
  );
}
