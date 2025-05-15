import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';

import InterviewsPurchaseQuestionPaywallPage from '~/components/interviews/purchase/InterviewsPurchaseQuestionPaywallPage';
import QuestionJsonLd from '~/components/interviews/questions/common/QuestionJsonLd';
import type { InterviewsQuestionItemUserInterface } from '~/components/interviews/questions/common/QuestionsTypes';
import { QuestionFrameworkLabels } from '~/components/interviews/questions/common/QuestionsTypes';
import type { QuestionUserInterfaceMode } from '~/components/interviews/questions/common/QuestionUserInterfacePath';
import { determineFrameworkAndMode } from '~/components/interviews/questions/common/QuestionUserInterfacePath';
import { sortQuestionsMultiple } from '~/components/interviews/questions/listings/filters/QuestionsProcessor';
import UserInterfaceCodingWorkspacePage from '~/components/workspace/user-interface/UserInterfaceCodingWorkspacePage';

import { readQuestionUserInterface } from '~/db/QuestionsContentsReader';
import { fetchQuestionsList } from '~/db/QuestionsListReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';
import { getSiteOrigin } from '~/seo/siteUrl';
import {
  createSupabaseAdminClientGFE_SERVER_ONLY,
  readViewerFromToken,
} from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
    rest: ReadonlyArray<string>;
    slug: string;
  }>;
}>;

function frameworkAgnosticLinks(
  question: InterviewsQuestionItemUserInterface,
  mode: QuestionUserInterfaceMode,
) {
  const frameworkAgnosticPathname = `${question.metadata.href}${
    mode === 'solution' ? '/solution' : ''
  }`;
  const frameworkAgnosticUrl = new URL(
    frameworkAgnosticPathname,
    getSiteOrigin(),
  ).toString();

  return {
    pathname: frameworkAgnosticPathname,
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
  const {
    codeId,
    framework: parsedFramework,
    mode,
  } = determineFrameworkAndMode(rest);

  try {
    const question = await readQuestionUserInterface({
      codeId,
      frameworkParam: parsedFramework,
      isViewerPremium: false,
      requestedLocale: locale,
      slug,
    });

    const { pathname } = frameworkAgnosticLinks(question, mode);
    const socialTitle =
      mode === 'solution'
        ? intl.formatMessage(
            {
              defaultMessage: '{questionTitle} Solution in {questionFramework}',
              description:
                'Title of Front End Interview UI Coding Questions solution page',
              id: 'rdN/ZV',
            },
            {
              questionFramework: QuestionFrameworkLabels[question.framework],
              questionTitle: question.info.title,
            },
          )
        : intl.formatMessage(
            {
              defaultMessage: '{questionTitle} in {questionFramework}',
              description:
                'Title of Front End Interview UI Coding Questions practice page',
              id: '5tLsdY',
            },
            {
              questionFramework: QuestionFrameworkLabels[question.framework],
              questionTitle: question.info.title,
            },
          );

    return defaultMetadata({
      description:
        mode === 'solution'
          ? intl.formatMessage(
              {
                defaultMessage:
                  'Read how to solve {questionTitle} using {questionFramework}',
                description:
                  'Description of Front End Interview UI Coding Questions solution page',
                id: 'cjgzTz',
              },
              {
                questionFramework: QuestionFrameworkLabels[question.framework],
                questionTitle: question.info.title,
              },
            )
          : intl.formatMessage(
              {
                defaultMessage: '{questionExcerpt} using {questionFramework}',
                description:
                  'Description of Front End Interview UI Coding Questions practice page',
                id: 'KDDzWX',
              },
              {
                questionExcerpt: question.info.excerpt,
                questionFramework: QuestionFrameworkLabels[question.framework],
              },
            ),
      locale,
      ogImageTitle: socialTitle,
      pathname,
      socialTitle,
      title:
        mode === 'solution'
          ? intl.formatMessage(
              {
                defaultMessage:
                  '{questionTitle} Solution in {questionFramework} | UI Interview Question',
                description:
                  'Title of Front End Interview UI Coding Questions solution page',
                id: 'cBUPgC',
              },
              {
                questionFramework: QuestionFrameworkLabels[question.framework],
                questionTitle: question.info.title,
              },
            )
          : intl.formatMessage(
              {
                defaultMessage:
                  '{questionTitle} in {questionFramework} | UI Interview Question',
                description:
                  'Title of Front End Interview UI Coding Questions practice page',
                id: 'X3SfGP',
              },
              {
                questionFramework: QuestionFrameworkLabels[question.framework],
                questionTitle: question.info.title,
              },
            ),
    });
  } catch {
    notFound();
  }
}

export default async function Page({ params }: Props) {
  const { locale, rest, slug: rawSlug } = params;
  // So that we handle typos like extra characters.
  const slug = decodeURIComponent(rawSlug)
    .replaceAll(/[^\da-zA-Z-]/g, '')
    .toLowerCase();
  const {
    codeId,
    framework: parsedFramework,
    mode,
  } = determineFrameworkAndMode(rest);

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

  const question = await readQuestionUserInterface({
    codeId,
    frameworkParam: parsedFramework,
    isViewerPremium,
    requestedLocale: locale,
    slug,
  });

  const isQuestionLockedForViewer = (() => {
    if (mode === 'practice') {
      return question.metadata.access === 'premium' && !isViewerPremium;
    }

    if (mode === 'solution') {
      return (
        (question.metadata.access === 'standard' ||
          question.metadata.access === 'premium') &&
        !isViewerPremium
      );
    }

    return true;
  })();

  const { questions } = await fetchQuestionsList(
    { type: 'format', value: 'user-interface' },
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
          mode={mode}
          title={question.info.title}
        />
      ) : (
        <UserInterfaceCodingWorkspacePage
          canViewPremiumContent={isViewerPremium}
          mode={mode}
          nextQuestions={nextQuestions}
          question={question}
          similarQuestions={similarQuestions}
        />
      )}
    </>
  );
}
