import { allInterviewsCompanyGuides } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import type { IntlShape } from 'react-intl';

import { INTERVIEWS_REVAMP_DASHBOARD } from '~/data/FeatureFlags';

import InterviewsDashboardPage from '~/components/interviews/revamp-dashboard/InterviewsDashboardPage';

import { fetchPreparationPlans } from '~/db/PreparationPlansReader';
import {
  categorizeQuestionsByFrameworkAndLanguage,
  fetchQuestionsListCoding,
  fetchQuestionsListQuiz,
  fetchQuestionsListSystemDesign,
} from '~/db/QuestionsListReader';
import { getIntlServerOnly } from '~/i18n';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export default async function Page({ params }: Props) {
  if (!INTERVIEWS_REVAMP_DASHBOARD) {
    return notFound();
  }

  const sortedGuides = allInterviewsCompanyGuides
    .slice()
    .sort((a, b) => a.ranking - b.ranking);

  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  const [
    preparationPlans,
    { questions: quizQuestions },
    { questions: codingQuestions },
    { questions: systemDesignQuestions },
    { framework, language },
  ] = await Promise.all([
    await fetchPreparationPlans(intl as IntlShape),
    fetchQuestionsListQuiz(locale),
    fetchQuestionsListCoding(locale),
    fetchQuestionsListSystemDesign(locale),
    categorizeQuestionsByFrameworkAndLanguage(locale),
  ]);

  return (
    <InterviewsDashboardPage
      companyGuides={sortedGuides}
      preparationPlans={preparationPlans}
      questions={{
        codingQuestions,
        frameworkQuestions: framework,
        languageQuestions: language,
        quizQuestions,
        systemDesignQuestions,
      }}
    />
  );
}
