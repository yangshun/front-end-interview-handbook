import type { Metadata } from 'next/types';

import InterviewsQuestionsCategoryFrameworkPage from '~/components/interviews/questions/listings/category/InterviewsQuestionsCategoryFrameworkPage';

import { readAllFrontEndInterviewGuides } from '~/db/guides/GuidesReader';
import { fetchQuestionsCompletionCount } from '~/db/QuestionsCount';
import { fetchQuestionsListCodingForFramework } from '~/db/QuestionsListReader';
import { roundQuestionCountToNearestTen } from '~/db/QuestionsUtils';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

const framework = 'svelte';

export const dynamic = 'force-static';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

async function processParams(params: Props['params']) {
  const { locale } = params;
  const [intl, questionsCoding] = await Promise.all([
    getIntlServerOnly(locale),
    fetchQuestionsListCodingForFramework(framework, locale),
  ]);

  return {
    ogImagePageType: intl.formatMessage({
      defaultMessage: 'Framework / Language',
      description: 'OG image page title of framework and language page',
      id: 'JHqEBN',
    }),
    ogImageTitle: intl.formatMessage(
      {
        defaultMessage: '{category} Interview Questions',
        description: 'OG image title of framework and language page',
        id: 'uEiI+F',
      },
      {
        category: 'Svelte',
      },
    ),
    questionsCoding,
    seoDescription: intl.formatMessage(
      {
        defaultMessage:
          'Practice {questionCount}+ curated Svelte Interview Questions in-browser, with solutions and test cases from big tech ex-interviewers',
        description: 'Description of Interview Questions page',
        id: 'LkjqcQ',
      },
      {
        questionCount: roundQuestionCountToNearestTen(questionsCoding.length),
      },
    ),
    seoTitle: intl.formatMessage({
      defaultMessage:
        'Svelte Interview Questions | Solutions by Ex-FAANG interviewers',
      description: 'Title of React Interview Questions page',
      id: 'uFcyu1',
    }),
    socialTitle: intl.formatMessage({
      defaultMessage:
        'Svelte Interview Questions with Solutions | GreatFrontEnd',
      description: 'Title of React Interview Questions page',
      id: '83G2F2',
    }),
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const {
    seoTitle,
    seoDescription,
    socialTitle,
    ogImagePageType,
    ogImageTitle,
  } = await processParams(params);

  return defaultMetadata({
    description: seoDescription,
    locale,
    ogImagePageType,
    ogImageTitle,
    pathname: `/questions/${framework}`,
    socialTitle,
    title: seoTitle,
  });
}

export default async function Page({ params }: Props) {
  const { locale } = params;
  const [questionsCoding, questionCompletionCount, guides] = await Promise.all([
    fetchQuestionsListCodingForFramework(framework, locale),
    fetchQuestionsCompletionCount(['user-interface']),
    readAllFrontEndInterviewGuides(locale),
  ]);

  return (
    <InterviewsQuestionsCategoryFrameworkPage
      framework={framework}
      guides={guides}
      questionCompletionCount={questionCompletionCount}
      questionsCoding={questionsCoding}
      questionsQuiz={[]}
    />
  );
}
