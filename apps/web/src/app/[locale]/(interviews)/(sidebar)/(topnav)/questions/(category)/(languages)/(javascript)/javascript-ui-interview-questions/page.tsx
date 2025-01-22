import type { Metadata } from 'next/types';

import { QuestionLanguageLabels } from '~/data/QuestionCategories';

import type {
  QuestionFormat,
  QuestionLanguage,
  QuestionListTypeData,
} from '~/components/interviews/questions/common/QuestionsTypes';
import { InterviewsQuestionsLanguageJavaScriptGuideSlugs } from '~/components/interviews/questions/listings/category/InterviewsQuestionsCategoryGuideSlugs';
import InterviewsQuestionsCategoryLanguagePage from '~/components/interviews/questions/listings/category/InterviewsQuestionsCategoryLanguagePage';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import { readFrontEndInterviewGuides } from '~/db/guides/GuidesReader';
import { fetchQuestionsCompletionCount } from '~/db/QuestionsCount';
import { fetchQuestionsList } from '~/db/QuestionsListReader';
import { roundQuestionCountToNearestTen } from '~/db/QuestionsUtils';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

export const dynamic = 'force-static';

const language: QuestionLanguage = 'js';
const codingFormat: QuestionFormat = 'user-interface';
const listType: QuestionListTypeData = {
  filters: {
    formats: [codingFormat],
  },
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

  const category = QuestionLanguageLabels[language];

  return defaultMetadata({
    description: intl.formatMessage(
      {
        defaultMessage:
          'Practice {questionCount}+ JavaScript Interview Questions on User Interfaces (UI). Code in-browser, with quality solutions and test cases from Big Tech Ex-interviewers',
        description: 'Description of interviews questions page',
        id: 'XKRfBZ',
      },
      {
        questionCount: roundQuestionCountToNearestTen(questions.length),
      },
    ),
    locale,
    ogImagePageType: intl.formatMessage({
      defaultMessage: 'Frameworks or languages',
      description: 'OG image page title of framework and language page',
      id: '+XLpUw',
    }),
    ogImageTitle: intl.formatMessage(
      {
        defaultMessage: '{category} User Interface Interview Questions',
        description: 'Title for front end interview questions page',
        id: 'ucUZT7',
      },
      {
        category,
      },
    ),
    pathname: `/questions/javascript-ui-interview-questions`,
    socialTitle: intl.formatMessage(
      {
        defaultMessage:
          '{category} User Interface Interview Questions | GreatFrontEnd',
        description: 'Social title of front end interview questions page',
        id: 'X6bc93',
      },
      {
        category,
      },
    ),
    title: intl.formatMessage(
      {
        defaultMessage: '{category} UI Interview Questions | With Answers',
        description: 'Title of interview questions page',
        id: 'kmXWNc',
      },
      {
        category,
      },
    ),
  });
}

export default async function Page({ params }: Props) {
  const { locale } = params;

  const [intl, { questions }, questionCompletionCount, guides, bottomContent] =
    await Promise.all([
      getIntlServerOnly(locale),
      fetchQuestionsList(listType, locale),
      fetchQuestionsCompletionCount([codingFormat]),
      readFrontEndInterviewGuides({
        locale,
        slugs: InterviewsQuestionsLanguageJavaScriptGuideSlugs,
      }),
      fetchInterviewListingBottomContent('javascript-ui-interview-questions'),
    ]);

  const listTypeWithTitle = {
    ...listType,
    title: intl.formatMessage({
      defaultMessage: 'JavaScript UI',
      description: 'Question list',
      id: '0UEoo1',
    }),
  };

  return (
    <InterviewsQuestionsCategoryLanguagePage
      bottomContent={bottomContent}
      description={intl.formatMessage({
        defaultMessage:
          'Coding questions that use JavaScript to build user interfaces, including components, applications, and games.',
        description: 'Description of interview questions page',
        id: 'uWgMQQ',
      })}
      guides={guides}
      language={language}
      listType={listTypeWithTitle}
      questionCompletionCount={questionCompletionCount}
      questions={questions}
      title={intl.formatMessage({
        defaultMessage: 'JavaScript User Interface Interview Questions',
        description: 'Title of interview questions page',
        id: 'mOd6tW',
      })}
      totalQuestionsCount={questions.length}
    />
  );
}
