import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';

import GuidesArticleJsonLd from '~/components/guides/GuidesArticleJsonLd';
import InterviewsQuestionsSystemDesignPage from '~/components/interviews/questions/content/system-design/InterviewsQuestionsSystemDesignPage';

import { readQuestionSystemDesignContents } from '~/db/QuestionsContentsReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';
import {
  createSupabaseAdminClientGFE_SERVER_ONLY,
  readViewerFromToken,
} from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
    slug: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug: rawSlug } = params;
  // So that we handle typos like extra characters.
  const slug = decodeURIComponent(rawSlug)
    .replaceAll(/[^\da-zA-Z-]/g, '')
    .toLowerCase();

  const intl = await getIntlServerOnly(locale);

  try {
    const { question } = readQuestionSystemDesignContents(slug, locale);

    return defaultMetadata({
      description: intl.formatMessage(
        {
          defaultMessage:
            'Learn how to solve the {questionTitle} question in front end system design interviews using the RADIO framework. Read our deep-dives on many other top front end system questions.',
          description: 'Description of system design question page',
          id: 'XI5h+Z',
        },
        {
          questionTitle: question.metadata.title,
        },
      ),
      locale,
      pathname: question.metadata.href,
      socialTitle: intl.formatMessage(
        {
          defaultMessage: '{questionTitle} | Front End System Design',
          description: 'Social title of system design question page',
          id: 'Ozg1OX',
        },
        {
          questionTitle: question.metadata.title,
        },
      ),
      title: intl.formatMessage(
        {
          defaultMessage: '{questionTitle} | Front End System Design Question',
          description: 'Title of system design question page',
          id: '9xFHNn',
        },
        {
          questionTitle: question.metadata.title,
        },
      ),
    });
  } catch {
    notFound();
  }
}

export default async function Page({ params }: Props) {
  const { locale, slug } = params;

  const { question } = readQuestionSystemDesignContents(slug, locale);

  const canViewPremiumContent: boolean = await (async () => {
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

  const isQuestionLocked = question.metadata.premium && !canViewPremiumContent;

  return (
    <>
      <GuidesArticleJsonLd
        description={question.metadata.excerpt ?? ''}
        isAccessibleForFree={!question.metadata.premium}
        pathname={question.metadata.href}
        title={`Front End System Design: ${question.metadata.title}`}
      />
      <InterviewsQuestionsSystemDesignPage
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
