import type { Metadata } from 'next/types';

import InterviewsDashboardPage from '~/components/interviews/dashboard/InterviewsDashboardPage';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import { fetchInterviewsAllStudyLists } from '~/db/contentlayer/InterviewsStudyListReader';
import { fetchQuestionsList } from '~/db/QuestionsListReader';
import {
  categorizeQuestionsByCompany,
  categorizeQuestionsByFrameworkAndLanguage,
} from '~/db/QuestionsUtils';
import { getIntlServerOnly } from '~/i18n';
import i18nRedirect from '~/next-i18nostic/src/utils/i18nRedirect';
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
  const { locale } = params;

  if (viewer) {
    return i18nRedirect('/interviews/dashboard', { locale });
  }

  const [
    { questions: codingQuestions },
    { questions: quizQuestions },
    { questions: systemDesignQuestions },
    bottomContent,
    studyLists,
  ] = await Promise.all([
    fetchQuestionsList(
      { tab: 'coding', type: 'practice', value: 'practice' },
      locale,
    ),
    fetchQuestionsList(
      { tab: 'quiz', type: 'practice', value: 'practice' },
      locale,
    ),
    fetchQuestionsList(
      { tab: 'system-design', type: 'practice', value: 'practice' },
      locale,
    ),
    fetchInterviewListingBottomContent('dashboard'),
    fetchInterviewsAllStudyLists(),
  ]);
  const { framework, language } = categorizeQuestionsByFrameworkAndLanguage({
    codingQuestions,
    quizQuestions,
  });
  const categorizedCompanyQuestions = categorizeQuestionsByCompany({
    codingQuestions,
    quizQuestions,
    systemDesignQuestions,
  });
  const companyQuestionsCount = Object.fromEntries(
    Object.entries(categorizedCompanyQuestions).map(([key, questions]) => [
      key,
      questions.length,
    ]),
  );
  const companyGuidesSorted = studyLists.companies
    .slice()
    .sort((a, b) => a.ranking - b.ranking)
    .map((company) => ({
      ...company,
      questionCount: companyQuestionsCount[company.slug],
    }));

  return (
    <InterviewsDashboardPage
      bottomContent={bottomContent}
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
