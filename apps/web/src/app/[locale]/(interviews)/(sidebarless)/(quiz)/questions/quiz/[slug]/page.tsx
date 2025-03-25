import Fuse from 'fuse.js';
import { notFound, redirect } from 'next/navigation';
import type { Metadata } from 'next/types';

import QuestionJsonLd from '~/components/interviews/questions/common/QuestionJsonLd';
import QuestionQuizContents from '~/components/interviews/questions/content/quiz/QuestionQuizContents';

import { readQuestionQuizContents } from '~/db/QuestionsContentsReader';
import { fetchQuestionsList } from '~/db/QuestionsListReader';
import { getIntlServerOnly } from '~/i18n';
import { generateStaticParamsWithLocale } from '~/next-i18nostic/src';
import defaultMetadata from '~/seo/defaultMetadata';

async function findSimilarQuestion(slug: string, locale: string) {
  const { questions: quizQuestions } = await fetchQuestionsList(
    { type: 'format', value: 'quiz' },
    locale,
  );

  const quizQuestionSlugs = quizQuestions.map((qn) => ({
    searchable: qn.slug.replace(/-/g, ' '),
    slug: qn.slug,
  }));

  const fuse = new Fuse(quizQuestionSlugs, {
    keys: ['searchable'],
    threshold: 0.3,
  });

  const query = slug.replace(/-/g, ' ');
  const result = fuse.search(query);

  if (result.length > 0) {
    return result[0].item.slug;
  }

  return null;
}

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

  if (!question) {
    const bestMatchingQnSlug = await findSimilarQuestion(slug, locale);

    if (bestMatchingQnSlug) {
      redirect(`/questions/quiz/${bestMatchingQnSlug}`);
    }
    notFound();
  }

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
  const { questions: quizQuestions } = await fetchQuestionsList(
    { type: 'format', value: 'quiz' },
    locale,
  );

  return generateStaticParamsWithLocale(
    quizQuestions.map((question) => ({
      slug: question.slug,
    })),
  );
}

export default async function Page({ params }: Props) {
  const { locale, slug } = params;
  const { question } = readQuestionQuizContents(slug, locale);

  if (!question) {
    const bestMatchingQnSlug = await findSimilarQuestion(slug, locale);

    if (bestMatchingQnSlug) {
      redirect(`/questions/quiz/${bestMatchingQnSlug}`);
    }
    notFound();
  }

  return (
    <>
      <QuestionJsonLd metadata={question.metadata} />
      <QuestionQuizContents
        listIsShownInSidebarOnDesktop={true}
        question={question}
      />
    </>
  );
}
