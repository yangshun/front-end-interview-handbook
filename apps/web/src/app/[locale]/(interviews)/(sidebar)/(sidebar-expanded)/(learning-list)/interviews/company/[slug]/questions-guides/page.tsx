import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';

import { INTERVIEWS_REVAMP_BOTTOM_CONTENT } from '~/data/FeatureFlags';

import InterviewsCompanyGuidePage from '~/components/interviews/company/InterviewsCompanyGuidePage';
import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import { sortQuestions } from '~/components/interviews/questions/listings/filters/QuestionsProcessor';

import { fetchInterviewsLearningList } from '~/db/contentlayer/InterviewsLearningListReader';
import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import { fetchQuestionsBySlug } from '~/db/QuestionsListReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

// TODO(companies)
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
  const { locale, slug } = params;
  const [intl, companyGuide] = await Promise.all([
    getIntlServerOnly(locale),
    fetchInterviewsLearningList(slug),
  ]);

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

  const companyGuide = await fetchInterviewsLearningList(slug);

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
