import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';

import { INTERVIEWS_REVAMP_BOTTOM_CONTENT } from '~/data/FeatureFlags';

import InterviewsCompanyGuidePage from '~/components/interviews/company/InterviewsCompanyGuidePage';
import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import { sortQuestions } from '~/components/interviews/questions/listings/filters/QuestionsProcessor';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import { fetchInterviewsStudyList } from '~/db/contentlayer/InterviewsStudyListReader';
import { fetchQuestionsBySlug } from '~/db/QuestionsListReader';
import defaultMetadata from '~/seo/defaultMetadata';

// TODO(interviews/companies)
// export async function generateStaticParams() {
//   return [];
// }

type Props = Readonly<{
  params: {
    locale: string;
    slug: string;
  };
}>;

async function getPageSEOMetadata({ params }: Props) {
  const { slug } = params;
  const companyGuide = await fetchInterviewsStudyList(slug);

  if (companyGuide == null) {
    return notFound();
  }

  return {
    description: companyGuide.seoDescription,
    href: companyGuide.href,
    socialTitle: companyGuide.socialTitle,
    title: companyGuide.seoTitle,
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
  const { locale, slug } = params;

  const companyGuide = await fetchInterviewsStudyList(slug);

  if (companyGuide == null) {
    return notFound();
  }

  const companyGuideQuestions = {
    algo: companyGuide.questionsAlgo ?? [],
    javascript: companyGuide.questionsJavaScript ?? [],
    quiz: companyGuide.questionsQuiz ?? [],
    'system-design': companyGuide.questionsSystemDesign ?? [],
    'user-interface': companyGuide.questionsUserInterface ?? [],
  };

  const [questions, bottomContent] = await Promise.all([
    fetchQuestionsBySlug(companyGuideQuestions, locale),
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
      companyQuestions={companyGuideQuestions}
      quizQuestions={sortQuestions(
        quizQuestions as ReadonlyArray<QuestionMetadata>,
        'importance',
        false,
      )}
      systemDesignQuestions={systemDesignQuestions}
    />
  );
}
