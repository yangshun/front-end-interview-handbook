import { redirect } from 'next/navigation';
import type { Metadata } from 'next/types';

import { INTERVIEWS_REVAMP_BOTTOM_CONTENT } from '~/data/FeatureFlags';

import InterviewsDashboardPage_TEMPORARY from '~/components/interviews/dashboard/InterviewsDashboardPage_TEMPORARY';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import { fetchInterviewsAllStudyLists } from '~/db/contentlayer/InterviewsStudyListReader';
import {
  fetchQuestionsListCoding,
  fetchQuestionsListQuiz,
  fetchQuestionsListSystemDesign,
} from '~/db/QuestionsListReader';
import { categorizeQuestionsByFrameworkAndLanguage } from '~/db/QuestionsUtils';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';
import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);
  const title = intl.formatMessage({
    defaultMessage:
      'Get Started - One-stop to prepare for your Front End Interviews',
    description: 'Title of Get Started page',
    id: 'xR9d8+',
  });

  return defaultMetadata({
    description: intl.formatMessage({
      defaultMessage:
        'Kickstart your front end interview prep by exploring top resources—recommended prep plans, company guides, and a vast bank of practice questions with solutions.',
      description: 'Description of Get Started page',
      id: 'hOA7E4',
    }),
    locale,
    ogImageTitle: title,
    pathname: '/interviews/get-started',
    socialTitle: intl.formatMessage({
      defaultMessage: 'Get Started | Prepare for Your Front End Interviews',
      description: 'Social title of Get Started page',
      id: 'QqooKN',
    }),
    title,
  });
}

export default async function Page({ params }: Props) {
  const viewer = await readViewerFromToken();

  if (viewer) {
    return redirect('/interviews/dashboard');
  }

  const { locale } = params;

  const [
    { questions: quizQuestions },
    { questions: codingQuestions },
    { questions: systemDesignQuestions },
    bottomContent,
    studyLists,
  ] = await Promise.all([
    fetchQuestionsListQuiz(locale),
    fetchQuestionsListCoding(locale),
    fetchQuestionsListSystemDesign(locale),
    fetchInterviewListingBottomContent('dashboard'),
    fetchInterviewsAllStudyLists(),
  ]);
  const { framework, language } = categorizeQuestionsByFrameworkAndLanguage({
    codingQuestions,
    quizQuestions,
  });
  const companyGuidesSorted = studyLists.companies
    .slice()
    .sort((a, b) => a.ranking - b.ranking);

  return (
    <InterviewsDashboardPage_TEMPORARY
      bottomContent={
        INTERVIEWS_REVAMP_BOTTOM_CONTENT ? bottomContent : undefined
      }
      companyGuides={companyGuidesSorted}
      defaultLoggedIn={false}
      focusAreas={studyLists.focusAreas}
      questions={{
        codingQuestions,
        frameworkQuestions: framework,
        languageQuestions: language,
        quizQuestions,
        systemDesignQuestions,
      }}
      studyPlans={studyLists.studyPlans}
    />
  );
}
