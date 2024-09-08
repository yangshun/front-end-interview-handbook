import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';

import { INTERVIEWS_REVAMP_BOTTOM_CONTENT } from '~/data/FeatureFlags';

import InterviewsCompanyGuidePage from '~/components/interviews/company/InterviewsCompanyGuidePage';
import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import { sortQuestions } from '~/components/interviews/questions/listings/filters/QuestionsProcessor';

import { fetchInterviewsCompanyGuide } from '~/db/contentlayer/InterviewsCompanyGuideReader';
import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import { fetchQuestionsBySlug } from '~/db/QuestionsListReader';
import defaultMetadata from '~/seo/defaultMetadata';

// TODO(interviews): disable to do A/B test.
// export async function generateStaticParams() {
//   // TODO(companies)
//   return [];
// }

type Props = Readonly<{
  params: {
    locale: string;
    slug: string;
  };
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = params;
  const companyGuide = await fetchInterviewsCompanyGuide(slug);

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

  const companyGuide = await fetchInterviewsCompanyGuide(slug);

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

  const [questions, bottomContent] = await Promise.all([
    fetchQuestionsBySlug(companyQuestions, locale),
    fetchInterviewListingBottomContent('company-detail'),
  ]);
  const codingQuestions = [
    ...questions.javascript,
    ...questions['user-interface'],
    ...questions.algo,
  ];
  const systemDesignQuestions = questions['system-design'];
  const quizQuestions = questions.quiz;

  return (
    <InterviewsCompanyGuidePage
      bottomContent={
        INTERVIEWS_REVAMP_BOTTOM_CONTENT ? bottomContent : undefined
      }
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
