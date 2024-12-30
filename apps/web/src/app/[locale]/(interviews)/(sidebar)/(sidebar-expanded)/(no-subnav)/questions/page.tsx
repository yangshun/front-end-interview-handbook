import type { Metadata } from 'next';

import InterviewsQuestionsCategoryPage from '~/components/interviews/questions/listings/category/InterviewsQuestionsCategoryPage';
import InterviewsPracticeQuestionsPage from '~/components/interviews/questions/listings/practice/InterviewsPracticeQuestionsPage';
import { QuestionCount } from '~/components/interviews/questions/listings/stats/QuestionCount';
import MDXContent from '~/components/mdx/MDXContent';
import Divider from '~/components/ui/Divider';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import {
  fetchQuestionsListCoding,
  fetchQuestionsListQuiz,
  fetchQuestionsListSystemDesign,
} from '~/db/QuestionsListReader';
import { categorizeQuestionsByFrameworkAndLanguage } from '~/db/QuestionsUtils';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

async function getPageSEOMetadata({ params }: Props) {
  const { locale } = params;
  const intl = await getIntlServerOnly(locale);

  return {
    description: intl.formatMessage({
      defaultMessage:
        'Prepare for front end interviews with a vast question bank covering every format and popular frameworks/languages. Includes solutions and tests from ex-interviewers.',
      description: 'Page description for focus areas listing',
      id: 'cNg7I1',
    }),
    href: '/questions',
    socialTitle: intl.formatMessage({
      defaultMessage: 'Front End Interview Practice Questions | GreatFrontEnd',
      description: 'Social title for focus areas listing',
      id: '17Ty2c',
    }),
    title: intl.formatMessage(
      {
        defaultMessage:
          '{questionCount}+ Front End Interview Practice Questions',
        description: 'Page title for all practice questions page',
        id: 'tV+VAr',
      },
      {
        questionCount: QuestionCount,
      },
    ),
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const { title, description, socialTitle, href } = await getPageSEOMetadata({
    params,
  });

  return defaultMetadata({
    description,
    locale,
    pathname: href,
    socialTitle,
    title,
  });
}

export default async function Page({ params }: Props) {
  const { locale } = params;

  const [
    intl,
    { questions: quizQuestions },
    { questions: codingQuestions },
    { questions: systemDesignQuestions },
    bottomContent,
  ] = await Promise.all([
    getIntlServerOnly(locale),
    fetchQuestionsListQuiz(locale),
    fetchQuestionsListCoding(locale),
    fetchQuestionsListSystemDesign(locale),
    fetchInterviewListingBottomContent('all-questions'),
  ]);

  const questions = [
    ...codingQuestions,
    ...systemDesignQuestions,
    ...quizQuestions,
  ];

  return (
    <div className="flex flex-col gap-20">
      <InterviewsQuestionsCategoryPage
        category="all"
        description="Save the trouble of searching the web for front end interview questions. We have 500+ practice questions in every framework, format, and topic, each with high quality answers and tests from big tech senior / staff engineers."
        guides={[]}
        questionList={questions}
        searchPlaceholder="Search within this list of questions"
        title={intl.formatMessage({
          defaultMessage: 'All Practice Questions',
          description: 'Page title for all practice questions page',
          id: 'ua8BRe',
        })}
      />
      {bottomContent && (
        <>
          <Divider />
          <MDXContent
            components={{
              QuestionsCount: () => <span>{questions.length}</span>,
            }}
            mdxCode={bottomContent.body.code}
          />
        </>
      )}
    </div>
  );
}
