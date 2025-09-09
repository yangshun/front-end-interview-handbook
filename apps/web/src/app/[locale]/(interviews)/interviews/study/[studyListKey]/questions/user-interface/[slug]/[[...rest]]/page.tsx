import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';

import InterviewsPurchaseQuestionPaywallPage from '~/components/interviews/purchase/InterviewsPurchaseQuestionPaywallPage';
import InterviewsPurchaseStudyListPaywallPage from '~/components/interviews/purchase/InterviewsPurchaseStudyListPaywallPage';
import type { QuestionUserInterface } from '~/components/interviews/questions/common/QuestionsTypes';
import { QuestionFrameworkLabels } from '~/components/interviews/questions/common/QuestionsTypes';
import { determineFramework } from '~/components/interviews/questions/common/QuestionUserInterfacePath';
import { sortQuestionsMultiple } from '~/components/interviews/questions/listings/filters/QuestionsProcessor';
import UserInterfaceCodingWorkspacePage from '~/components/workspace/user-interface/UserInterfaceCodingWorkspacePage';

import { fetchInterviewsStudyList } from '~/db/contentlayer/InterviewsStudyListReader';
import { readQuestionUserInterface } from '~/db/QuestionsContentsReader';
import { fetchQuestionsList } from '~/db/QuestionsListReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';
import { getSiteOrigin } from '~/seo/siteUrl';
import {
  createSupabaseAdminClientGFE_SERVER_ONLY,
  readViewerFromToken,
} from '~/supabase/SupabaseServerGFE';
import getUserAgent from '~/utils/getUserAgent';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
    rest: ReadonlyArray<string>;
    slug: string;
    studyListKey: string;
  }>;
}>;

function frameworkAgnosticLinks(question: QuestionUserInterface) {
  const frameworkAgnosticUrl = new URL(
    question.metadata.href,
    getSiteOrigin(),
  ).toString();

  return {
    pathname: question.metadata.href,
    url: frameworkAgnosticUrl,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, rest, slug: rawSlug } = params;
  // So that we handle typos like extra characters.
  const slug = decodeURIComponent(rawSlug)
    .replaceAll(/[^\da-zA-Z-]/g, '')
    .toLowerCase();

  const intl = await getIntlServerOnly(locale);
  const { codeId, framework: parsedFramework } = determineFramework(rest);

  try {
    const question = await readQuestionUserInterface(
      slug,
      false,
      parsedFramework,
      codeId,
    );

    const { pathname } = frameworkAgnosticLinks(question);
    const socialTitle = intl.formatMessage(
      {
        defaultMessage: '{questionTitle} in {questionFramework}',
        description:
          'Title of Front End Interview UI Coding Questions practice page',
        id: '5tLsdY',
      },
      {
        questionFramework: QuestionFrameworkLabels[question.framework],
        questionTitle: question.metadata.title,
      },
    );

    return defaultMetadata({
      description: intl.formatMessage(
        {
          defaultMessage: '{questionExcerpt} using {questionFramework}',
          description:
            'Description of Front End Interview UI Coding Questions practice page',
          id: 'KDDzWX',
        },
        {
          questionExcerpt: question.metadata.excerpt,
          questionFramework: QuestionFrameworkLabels[question.framework],
        },
      ),
      locale,
      ogImageTitle: socialTitle,
      pathname,
      socialTitle,
      title: intl.formatMessage(
        {
          defaultMessage:
            '{questionTitle} in {questionFramework} | UI Interview Question',
          description:
            'Title of Front End Interview UI Coding Questions practice page',
          id: 'X3SfGP',
        },
        {
          questionFramework: QuestionFrameworkLabels[question.framework],
          questionTitle: question.metadata.title,
        },
      ),
    });
  } catch {
    notFound();
  }
}

export default async function Page({ params }: Props) {
  const userAgent = getUserAgent();
  const { locale, rest, slug: rawSlug, studyListKey } = params;
  // So that we handle typos like extra characters.
  const slug = decodeURIComponent(rawSlug)
    .replaceAll(/[^\da-zA-Z-]/g, '')
    .toLowerCase();
  const { codeId, framework: parsedFramework } = determineFramework(rest);

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

  const question = await readQuestionUserInterface(
    slug,
    isViewerPremium,
    parsedFramework,
    codeId,
  );

  const isQuestionLockedForViewer =
    question.metadata.access === 'premium' && !isViewerPremium;

  const [{ questions }] = await Promise.all([
    fetchQuestionsList({ type: 'format', value: 'user-interface' }, locale),
  ]);
  const nextQuestions = sortQuestionsMultiple(
    questions.filter((questionItem) =>
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
    questions.filter((questionItem) =>
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

  return isStudyListLockedForViewer ? (
    <InterviewsPurchaseStudyListPaywallPage
      studyListCategory={studyList.category}
    />
  ) : isQuestionLockedForViewer ? (
    <InterviewsPurchaseQuestionPaywallPage
      metadata={question.metadata}
      mode="practice"
      studyListKey={studyListKey}
    />
  ) : (
    <UserInterfaceCodingWorkspacePage
      canViewPremiumContent={isViewerPremium}
      nextQuestions={nextQuestions}
      question={question}
      similarQuestions={similarQuestions}
      studyListKey={studyListKey}
      userAgent={userAgent}
    />
  );
}
