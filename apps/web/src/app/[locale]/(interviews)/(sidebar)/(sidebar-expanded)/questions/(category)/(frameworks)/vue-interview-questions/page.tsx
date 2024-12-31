import type { Metadata } from 'next/types';

import InterviewsQuestionsCategoryFrameworkPage from '~/components/interviews/questions/listings/category/InterviewsQuestionsCategoryFrameworkPage';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import { readAllFrontEndInterviewGuides } from '~/db/guides/GuidesReader';
import { fetchQuestionsCompletionCount } from '~/db/QuestionsCount';
import { fetchQuestionsListCodingForFramework } from '~/db/QuestionsListReader';
import { roundQuestionCountToNearestTen } from '~/db/QuestionsUtils';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

const framework = 'vue';

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
        category: 'Vue',
      },
    ),
    questionsCoding,
    seoDescription: intl.formatMessage(
      {
        defaultMessage:
          'Practice {questionCount}+ curated Vue Interview Questions in-browser, with solutions and test cases from big tech ex-interviewers',
        description: 'Description of Interview Questions page',
        id: 'ih/GUI',
      },
      {
        questionCount: roundQuestionCountToNearestTen(questionsCoding.length),
      },
    ),
    seoTitle: intl.formatMessage({
      defaultMessage:
        'Vue Interview Questions | Solutions by Ex-FAANG interviewers',
      description: 'Title of React Interview Questions page',
      id: '4AAKga',
    }),
    socialTitle: intl.formatMessage({
      defaultMessage: 'Vue Interview Questions with Solutions | GreatFrontEnd',
      description: 'Title of React Interview Questions page',
      id: '0+Zgu8',
    }),
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const {
    socialTitle,
    seoDescription,
    seoTitle,
    ogImagePageType,
    ogImageTitle,
  } = await processParams(params);

  return defaultMetadata({
    description: seoDescription,
    locale,
    ogImagePageType,
    ogImageTitle,
    pathname: `/questions/vue-interview-questions`,
    socialTitle,
    title: seoTitle,
  });
}

export default async function Page({ params }: Props) {
  const { locale } = params;
  const [questionsCoding, questionCompletionCount, guides, bottomContent] =
    await Promise.all([
      fetchQuestionsListCodingForFramework(framework, locale),
      fetchQuestionsCompletionCount(['user-interface']),
      readAllFrontEndInterviewGuides(locale),
      fetchInterviewListingBottomContent('framework-vue'),
    ]);

  return (
    <InterviewsQuestionsCategoryFrameworkPage
      bottomContent={bottomContent}
      framework={framework}
      guides={guides}
      questionCompletionCount={questionCompletionCount}
      questionsCoding={questionsCoding}
      questionsQuiz={[]}
    />
  );
}
