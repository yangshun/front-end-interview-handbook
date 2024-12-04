import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';

import GuidesArticleJsonLd from '~/components/guides/GuidesArticleJsonLd';
import InterviewsQuestionsSystemDesignPage from '~/components/interviews/questions/content/system-design/InterviewsQuestionsSystemDesignPage';
import InterviewsQuestionsListSlideOutButton from '~/components/interviews/questions/listings/slideout/InterviewsQuestionsListSlideOutButton';
import InterviewsStudyListBottomNav from '~/components/interviews/questions/listings/study-list/InterviewsStudyListBottomNav';

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
    studyListKey: string;
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
      ogImageTitle: question.metadata.title,
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

  const isQuestionLocked =
    question.metadata.access === 'premium' && !isViewerPremium;

  return (
    <>
      <GuidesArticleJsonLd
        description={question.metadata.excerpt ?? ''}
        isAccessibleForFree={question.metadata.access !== 'premium'}
        pathname={question.metadata.href}
        title={`Front End System Design: ${question.metadata.title}`}
      />
      <InterviewsQuestionsSystemDesignPage
        bottomNav={
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
        }
        canViewPremiumContent={isViewerPremium}
        isQuestionLocked={isQuestionLocked}
        question={{
          description: question.description,
          metadata: question.metadata,
          solution: isQuestionLocked ? null : question.solution,
        }}
        studyListKey={studyListKey}
      />
    </>
  );
}
