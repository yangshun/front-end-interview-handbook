import type { Metadata } from 'next/types';
import { generateStaticParamsWithLocale } from 'next-i18nostic';
import { ArticleJsonLd } from 'next-seo';

import { sortQuestionsMultiple } from '~/components/questions/common/QuestionsProcessor';
import QuestionQuizContents from '~/components/questions/content/quiz/QuestionQuizContents';

import { readQuestionQuizContents } from '~/db/QuestionsContentsReader';
import { fetchQuestionsListQuiz } from '~/db/QuestionsListReader';
import defaultMetadata from '~/seo/defaultMetadata';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
    slug: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = params;
  const question = readQuestionQuizContents(slug, locale);

  return defaultMetadata({
    description: question.metadata.excerpt ?? '',
    pathname: question.metadata.href,
    title: `${question.metadata.title} | Front End Quiz Interview Questions with Solutions`,
  });
}

export async function generateStaticParams() {
  const questionList = await fetchQuestionsListQuiz();

  return generateStaticParamsWithLocale(
    questionList.map((question) => ({
      slug: question.slug,
    })),
  );
}

export default async function Page({ params }: Props) {
  const { locale, slug } = params;
  const question = readQuestionQuizContents(slug, locale);

  const questionList = await fetchQuestionsListQuiz();

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
        description={question.metadata.excerpt ?? ''}
        images={[]}
        isAccessibleForFree={true}
        title={question.metadata.title}
        url={`https://www.greatfrontend.com${question.metadata.href}`}
        useAppDir={true}
      />
      <QuestionQuizContents
        question={question}
        // Keep in sync with layout.
        questionList={sortQuestionsMultiple(questionList, [
          {
            field: 'ranking',
            isAscendingOrder: true,
          },
          {
            field: 'importance',
            isAscendingOrder: false,
          },
        ])}
      />
    </>
  );
}
