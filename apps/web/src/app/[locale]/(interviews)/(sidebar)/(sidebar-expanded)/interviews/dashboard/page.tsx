import { notFound } from 'next/navigation';
import type { IntlShape } from 'react-intl';

import {
  INTERVIEWS_REVAMP_2024,
  INTERVIEWS_REVAMP_BOTTOM_CONTENT,
} from '~/data/FeatureFlags';
import { getFocusAreas } from '~/data/focus-areas/FocusAreas';

import InterviewsDashboardPage from '~/components/interviews/revamp-dashboard/InterviewsDashboardPage';

import { fetchInterviewsCompanyGuides } from '~/db/contentlayer/InterviewsCompanyGuideReader';
import { fetchInterviewListingBottomContent } from '~/db/contentlayer/InterviewsListingBottomContentReader';
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
  if (!INTERVIEWS_REVAMP_2024) {
    return notFound();
  }

  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  const [
    preparationPlans,
    { questions: quizQuestions },
    { questions: codingQuestions },
    { questions: systemDesignQuestions },
    { framework, language },
    bottomContent,
    companyGuides,
  ] = await Promise.all([
    await fetchPreparationPlans(intl as IntlShape),
    fetchQuestionsListQuiz(locale),
    fetchQuestionsListCoding(locale),
    fetchQuestionsListSystemDesign(locale),
    categorizeQuestionsByFrameworkAndLanguage(locale),
    fetchInterviewListingBottomContent('dashboard'),
    fetchInterviewsCompanyGuides(),
  ]);

  const sortedGuides = companyGuides
    .slice()
    .sort((a, b) => a.ranking - b.ranking);
  const focusAreas = getFocusAreas(intl as IntlShape);

  return (
    <InterviewsDashboardPage
      bottomContent={
        INTERVIEWS_REVAMP_BOTTOM_CONTENT ? bottomContent : undefined
      }
      companyGuides={sortedGuides}
      focusAreas={focusAreas}
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
