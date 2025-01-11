import type { Metadata } from 'next/types';

import QuestionJsonLd from '~/components/interviews/questions/common/QuestionJsonLd';
import QuestionQuizContents from '~/components/interviews/questions/content/quiz/QuestionQuizContents';

import { readQuestionQuizContents } from '~/db/QuestionsContentsReader';
import { fetchQuestionsListQuiz } from '~/db/QuestionsListReader';
import { getIntlServerOnly } from '~/i18n';
import { generateStaticParamsWithLocale } from '~/next-i18nostic/src';
import defaultMetadata from '~/seo/defaultMetadata';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
    slug: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = params;

  const intl = await getIntlServerOnly(locale);
  const { question } = readQuestionQuizContents(slug, locale);

  return defaultMetadata({
    description: question.metadata.excerpt ?? '',
    locale,
    ogImageTitle: question.metadata.title,
    pathname: question.metadata.href,
    socialTitle: question.metadata.title,
    title: intl.formatMessage(
      {
        defaultMessage:
          '{questionTitle} | Quiz Interview Questions with Solutions',
        description: 'Title of quiz question page',
        id: 'wTdDt/',
      },
      {
        questionTitle: question.metadata.title,
      },
    ),
  });
}

export async function generateStaticParams({ params }: Props) {
  const { locale } = params;
  const { questions: quizQuestions } = await fetchQuestionsListQuiz(locale);

  return generateStaticParamsWithLocale(
    quizQuestions.map((question) => ({
      slug: question.slug,
    })),
  );
}

export default async function Page({ params }: Props) {
  const { locale, slug } = params;
  const { question } = readQuestionQuizContents(slug, locale);

  return (
    <>
      <QuestionJsonLd metadata={question.metadata} />
      <QuestionQuizContents question={question} questionList={[]} />
    </>
  );
}
