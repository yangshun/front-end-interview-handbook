import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { INTERVIEWS_REVAMP_BOTTOM_CONTENT } from '~/data/FeatureFlags';

import InterviewsDashboardPage from '~/components/interviews/dashboard/InterviewsDashboardPage';

import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
import { fetchInterviewsAllStudyLists } from '~/db/contentlayer/InterviewsStudyListReader';
import { fetchQuestionsList } from '~/db/QuestionsListReader';
import {
  categorizeQuestionsByCompany,
  categorizeQuestionsByFrameworkAndLanguage,
} from '~/db/QuestionsUtils';
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
    defaultMessage: 'Dashboard - Track your interview preparation progress',
    description: 'Title of dashboard page',
    id: 'gZ3W0t',
  });

  return defaultMetadata({
    description: intl.formatMessage({
      defaultMessage:
        'Monitor your front end interview preparation progress and milestones.',
      description: 'Description of dashboard page',
      id: 'dYeq98',
    }),
    locale,
    ogImageTitle: title,
    pathname: '/interviews/dashboard',
    socialTitle: intl.formatMessage({
      defaultMessage: 'Dashboard | GreatFrontEnd Interviews',
      description: 'Social title of dashboard page',
      id: '9y48gK',
    }),
    title,
  });
}

export default async function Page({ params }: Props) {
  const viewer = await readViewerFromToken();

  if (viewer == null) {
    return redirect('/interviews/get-started');
  }

  const { locale } = params;

  const [
    { questions: codingQuestions },
    { questions: quizQuestions },
    { questions: systemDesignQuestions },
    bottomContent,
    studyLists,
  ] = await Promise.all([
    fetchQuestionsList({ type: 'format', value: 'coding' }, locale),
    fetchQuestionsList({ type: 'format', value: 'quiz' }, locale),
    fetchQuestionsList({ type: 'format', value: 'system-design' }, locale),
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
      bottomContent={
        INTERVIEWS_REVAMP_BOTTOM_CONTENT ? bottomContent : undefined
      }
      companyGuides={companyGuidesSorted}
      defaultLoggedIn={true}
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
