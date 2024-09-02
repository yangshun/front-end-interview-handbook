import { allInterviewsCompanyGuides } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';

import InterviewsCompanyGuidePage from '~/components/interviews/company/InterviewsCompanyGuidePage';
import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import { sortQuestions } from '~/components/interviews/questions/listings/filters/QuestionsProcessor';

import { fetchQuestionsBySlug } from '~/db/QuestionsListReader';
import defaultMetadata from '~/seo/defaultMetadata';

export async function generateStaticParams() {
  // TODO(companies)
  return [];
}

type Props = Readonly<{
  params: {
    locale: string;
    slug: string;
  };
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = params;
  const companyGuide = allInterviewsCompanyGuides.find(
    (company) => company.slug === slug,
  );

  if (companyGuide == null) {
    return notFound();
  }

  return defaultMetadata({
    description: `Ace your ${companyGuide.name} front end interview with these curated questions`,
    locale,
    pathname: `/interviews/company/${slug}`,
    title: `${companyGuide.name} Front End Engineer Interview Questions and Guide`,
  });
}

export default async function Page({ params }: Props) {
  const { locale, slug } = params;

  const companyGuide = allInterviewsCompanyGuides.find(
    (company) => company.slug === slug,
  );

  if (companyGuide == null) {
    return notFound();
  }

  const companyQuestions = {
    algo: companyGuide.questionsAlgo ?? [],
    javascript: companyGuide.questionsJavaScript ?? [],
    quiz: companyGuide.questionsQuiz ?? [],
    'system-design': companyGuide.questionsSystemDesign ?? [],
    'user-interface': companyGuide.questionsUserInterface ?? [],
  };

  const questions = await fetchQuestionsBySlug(companyQuestions, locale);
  const codingQuestions = questions.javascript.concat(
    questions['user-interface'],
  );
  const systemDesignQuestions = questions['system-design'];
  const quizQuestions = questions.quiz;

  return (
    <InterviewsCompanyGuidePage
      codingQuestions={codingQuestions}
      companyGuide={companyGuide}
      companyQuestions={companyQuestions}
      quizQuestions={sortQuestions(
        quizQuestions as ReadonlyArray<QuestionMetadata>,
        'importance',
        false,
      )}
      systemDesignQuestions={systemDesignQuestions}
    />
  );
}
