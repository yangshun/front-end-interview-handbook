import type { Metadata } from 'next/types';
import { ArticleJsonLd } from 'next-seo';

import { sortQuestionsMultiple } from '~/components/questions/listings/filters/QuestionsProcessor';
import type { QuestionUserInterface } from '~/components/questions/common/QuestionsTypes';
import { QuestionFrameworkLabels } from '~/components/questions/common/QuestionsTypes';
import type { QuestionUserInterfaceMode } from '~/components/questions/common/QuestionUserInterfacePath';
import { determineFrameworkAndMode } from '~/components/questions/common/QuestionUserInterfacePath';

import { readQuestionUserInterface } from '~/db/QuestionsContentsReader';
import { fetchQuestionsListCoding } from '~/db/QuestionsListReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';
import {
  createSupabaseAdminClientGFE,
  fetchUser,
} from '~/supabase/SupabaseServerGFE';

import QuestionUserInterfaceCodingWorkspacePage from './QuestionUserInterfaceCodingWorkspacePage';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
    rest: ReadonlyArray<string>;
    slug: string;
  }>;
}>;

function frameworkAgnosticLinks(
  question: QuestionUserInterface,
  mode: QuestionUserInterfaceMode,
) {
  const frameworkAgnosticPathname = `${question.metadata.href}${
    mode === 'solution' ? '/solution' : ''
  }`;
  const frameworkAgnosticUrl = `https://www.greatfrontend.com${frameworkAgnosticPathname}`;

  return {
    pathname: frameworkAgnosticPathname,
    url: frameworkAgnosticUrl,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug, rest } = params;

  const intl = await getIntlServerOnly(locale);
  const {
    framework: parsedFramework,
    mode,
    codeId,
  } = determineFrameworkAndMode(rest);
  const question = await readQuestionUserInterface(
    slug,
    parsedFramework,
    codeId,
  );

  const { pathname } = frameworkAgnosticLinks(question, mode);

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
              questionTitle: question.metadata.title,
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
              questionExcerpt: question.metadata.excerpt,
              questionFramework: QuestionFrameworkLabels[question.framework],
            },
          ),
    locale,
    pathname,
    title:
      mode === 'solution'
        ? intl.formatMessage(
            {
              defaultMessage:
                'Solution for {questionTitle} in {questionFramework} | Front End Interview UI Coding Questions with Solutions',
              description:
                'Title of Front End Interview UI Coding Questions solution page',
              id: 'I5iXtu',
            },
            {
              questionFramework: QuestionFrameworkLabels[question.framework],
              questionTitle: question.metadata.title,
            },
          )
        : intl.formatMessage(
            {
              defaultMessage:
                '{questionTitle} in {questionFramework} | Front End Interview UI Coding Questions with Solutions',
              description:
                'Title of Front End Interview UI Coding Questions practice page',
              id: 'huof8A',
            },
            {
              questionFramework: QuestionFrameworkLabels[question.framework],
              questionTitle: question.metadata.title,
            },
          ),
  });
}

export default async function Page({ params }: Props) {
  const t0 = performance.now();

  const { slug, rest, locale } = params;
  const {
    mode,
    framework: parsedFramework,
    codeId,
  } = determineFrameworkAndMode(rest);

  const [user, question] = await Promise.all([
    fetchUser(),
    readQuestionUserInterface(slug, parsedFramework, codeId),
  ]);

  let canViewPremiumContent = false;
  const supabaseAdmin = createSupabaseAdminClientGFE();

  if (user != null) {
    canViewPremiumContent = await Promise.resolve(
      (async () => {
        const { data: profile } = await supabaseAdmin
          .from('Profile')
          .select('*')
          .eq('id', user.id)
          .single();

        return profile?.premium ?? false;
      })(),
    );
  }

  const isQuestionLocked = question.metadata.premium && !canViewPremiumContent;
  const { url } = frameworkAgnosticLinks(question, mode);

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
        title={`Front End Coding Interview Question: ${
          mode === 'solution' ? 'Solution ' : ''
        }${question.metadata.title}`}
        url={url}
        useAppDir={true}
      />
      <QuestionUserInterfaceCodingWorkspacePage
        canViewPremiumContent={canViewPremiumContent}
        isQuestionLocked={isQuestionLocked}
        mode={mode}
        nextQuestions={nextQuestions}
        question={{
          description: isQuestionLocked ? null : question.description,
          format: question.format,
          framework: question.framework,
          metadata: question.metadata,
          skeletonSetup: isQuestionLocked ? null : question.skeletonSetup,
          solution: isQuestionLocked ? null : question.solution,
          solutionSetup: isQuestionLocked ? null : question.solutionSetup,
        }}
        serverDuration={performance.now() - t0}
        similarQuestions={similarQuestions}
      />
    </>
  );
}
