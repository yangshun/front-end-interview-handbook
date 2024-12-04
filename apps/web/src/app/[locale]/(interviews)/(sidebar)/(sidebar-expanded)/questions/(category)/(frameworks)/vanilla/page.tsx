import type { Metadata } from 'next/types';

import type { QuestionFramework } from '~/components/interviews/questions/common/QuestionsTypes';
import InterviewsQuestionsCategoryFrameworkPage from '~/components/interviews/questions/listings/category/InterviewsQuestionsCategoryFrameworkPage';

import { readAllFrontEndInterviewGuides } from '~/db/guides/GuidesReader';
import { fetchQuestionsCompletionCount } from '~/db/QuestionsCount';
import { fetchQuestionsListCodingForFramework } from '~/db/QuestionsListReader';
import { roundQuestionCountToNearestTen } from '~/db/QuestionsUtils';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

export const dynamic = 'force-static';

const framework: QuestionFramework = 'vanilla';

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
      defaultMessage: 'Frameworks or languages',
      description: 'OG image page title of framework and language page',
      id: '+XLpUw',
    }),
    ogImageTitle: intl.formatMessage(
      {
        defaultMessage: '{category} Interview Questions',
        description: 'OG image title of framework and language page',
        id: 'uEiI+F',
      },
      {
        category: 'Vanilla JavaScript',
      },
    ),
    questionsCoding,
    seoDescription: intl.formatMessage(
      {
        defaultMessage:
          'Practice {questionCount}+ curated Vanilla JavaScript UI Interview Questions in-browser, with solutions and test cases from big tech ex-interviewers',
        description: 'Description of Interview Questions page',
        id: '+5hnxx',
      },
      {
        questionCount: roundQuestionCountToNearestTen(questionsCoding.length),
      },
    ),
    seoTitle: intl.formatMessage({
      defaultMessage:
        'Vanilla JavaScript UI Interview Questions | Solutions by Ex-FAANG interviewers',
      description: 'Title of React Interview Questions page',
      id: 'bJcVtt',
    }),
    socialTitle: intl.formatMessage({
      defaultMessage:
        'Vanilla JavaScript UI Interview Questions with Solutions | GreatFrontEnd',
      description: 'Title of React Interview Questions page',
      id: 'CbIPy4',
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
