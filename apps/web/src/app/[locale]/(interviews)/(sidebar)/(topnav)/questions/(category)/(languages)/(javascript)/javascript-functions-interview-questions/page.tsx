import type { Metadata } from 'next/types';

import type {
  QuestionFormat,
  QuestionLanguage,
  QuestionListTypeData,
} from '~/components/interviews/questions/common/QuestionsTypes';
import InterviewsQuestionsCategoryLanguagePage from '~/components/interviews/questions/listings/category/InterviewsQuestionsCategoryLanguagePage';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import { readAllFrontEndInterviewGuides } from '~/db/guides/GuidesReader';
import { fetchQuestionsCompletionCount } from '~/db/QuestionsCount';
import { fetchQuestionsList } from '~/db/QuestionsListReader';
import { roundQuestionCountToNearestTen } from '~/db/QuestionsUtils';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

export const dynamic = 'force-static';

const language: QuestionLanguage = 'js';
const codingFormat: QuestionFormat = 'javascript';
const listType: QuestionListTypeData = {
  tab: 'coding',
  type: 'language',
  value: language,
};

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const [intl, { questions }] = await Promise.all([
    getIntlServerOnly(locale),
    fetchQuestionsList(listType, locale),
  ]);

  const questionsCodingFormat = questions.filter((metadata) =>
    metadata.format.includes(codingFormat),
  );

  return defaultMetadata({
    description: intl.formatMessage(
      {
        defaultMessage:
          'Practice {questionCount}+ JavaScript Interview Questions on JavaScript Functions. Code in-browser, with quality solutions and test cases from Big Tech Ex-interviewers',
        description: 'Description of interviews questions page',
        id: 'EHK3Nn',
      },
      {
        questionCount: roundQuestionCountToNearestTen(
          questionsCodingFormat.length,
        ),
      },
    ),
    locale,
    ogImagePageType: intl.formatMessage({
      defaultMessage: 'Frameworks or languages',
      description: 'OG image page title of framework and language page',
      id: '+XLpUw',
    }),
    ogImageTitle: intl.formatMessage({
      defaultMessage: 'JavaScript Functions Interview Questions',
      description: 'Title for front end interview questions page',
      id: 'zAYPO0',
    }),
    pathname: `/questions/javascript-functions-interview-questions`,
    socialTitle: intl.formatMessage({
      defaultMessage:
        'JavaScript Functions Interview Questions | GreatFrontEnd',
      description: 'Social title of front end interview questions page',
      id: 'UdrD3z',
    }),
    title: intl.formatMessage({
      defaultMessage: 'JavaScript Functions Interview Questions | With Answers',
      description: 'Title of interview questions page',
      id: 'Tjuk29',
    }),
  });
}

export default async function Page({ params }: Props) {
  const { locale } = params;

  const [intl, { questions }, questionCompletionCount, guides, bottomContent] =
    await Promise.all([
      getIntlServerOnly(locale),
      fetchQuestionsList(listType, locale),
      fetchQuestionsCompletionCount([codingFormat]),
      readAllFrontEndInterviewGuides(params.locale),
      fetchInterviewListingBottomContent(
        'javascript-functions-interview-questions',
      ),
    ]);

  const questionsCodingFormat = questions.filter((metadata) =>
    metadata.format.includes(codingFormat),
  );

  return (
    <InterviewsQuestionsCategoryLanguagePage
      bottomContent={bottomContent}
      description={intl.formatMessage({
        defaultMessage:
          'Coding questions on JavaScript functions, covering concepts such as closures, event handling, async programming, and DOM manipulation.',
        description: 'Description of interview questions page',
        id: 'yDXWTO',
      })}
      guides={guides}
      language={language}
      listType={listType}
      questionCompletionCount={questionCompletionCount}
      questions={questionsCodingFormat}
      showCategoryTabs={false}
      title={intl.formatMessage({
        defaultMessage: 'JavaScript Functions Interview Questions',
        description: 'Title of interview questions page',
        id: 'mL9M8v',
      })}
      totalQuestionsCount={questionsCodingFormat.length}
    />
  );
}
